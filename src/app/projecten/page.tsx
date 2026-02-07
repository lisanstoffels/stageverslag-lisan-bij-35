"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PROJECTS, type ProjectId } from "../../data/projecten";
import {
  TextWindow,
  MediaWindow,
} from "../../components/windows/PreviewWindow";

type ProjectWindow = {
  projectId: ProjectId;
  type: "text" | "media" | "video";
  /** Bij projecten met descriptionBlocks: index van het tekstblok (0, 1, 2, …) */
  blockIndex?: number;
  /** Bij type "video": index in project.videos */
  videoIndex?: number;
  x?: number;
  y?: number;
  width?: number;
};

export default function ProjectsPage() {
  const [openWindows, setOpenWindows] = useState<ProjectWindow[]>([]);

  const project = (id: ProjectId) => PROJECTS.find((p) => p.id === id);
  const hasWindowsForProject = (id: ProjectId) =>
    openWindows.some((w) => w.projectId === id);

  const toggleProject = (id: ProjectId) => {
    if (hasWindowsForProject(id)) {
      setOpenWindows((prev) => prev.filter((w) => w.projectId !== id));
    } else {
      const p = project(id);
      if (!p) return;
      const newWindows: ProjectWindow[] = [];
      if (p.descriptionBlocks?.length) {
        const cols = p.descriptionBlocks.length;
        const textWidth = 520;
        const containerWidth = 1100;
        const containerHeight = 650;
        p.descriptionBlocks.forEach((_, i) => {
          const isFirst = i === 0;
          newWindows.push({
            projectId: id,
            type: "text",
            blockIndex: i,
            x: isFirst
              ? Math.max(20, (containerWidth - textWidth / 2) / 2)
              : (i % cols) * 70,
            y: isFirst
              ? Math.max(30, (containerHeight - 400) / 2)
              : 110 - i * 20,
            width: textWidth,
          });
        });
        if (p.mediaWindow && (p.images?.length ?? 0) > 0) {
          newWindows.push({
            projectId: id,
            type: "media",
            x: 1140,
            y: 40,
            width: 420,
          });
        }
        p.videos?.forEach((v, i) => {
          newWindows.push({
            projectId: id,
            type: "video",
            videoIndex: i,
            x: 920 + (i % 2) * 100,
            y: 60 + Math.floor(i * 3) * 90,
            width: v.width ?? 420,
          });
        });
        setLastFocusedWindowKey(`${id}-text-0`);
      } else {
        newWindows.push({
          projectId: id,
          type: "text",
          x: 60,
          y: 60,
          width: 400,
        });
        if ((p.images?.length ?? 0) > 0 || (p.videos?.length ?? 0) > 0) {
          newWindows.push({
            projectId: id,
            type: "media",
            x: 780,
            y: 200,
            width: 420,
          });
        }
      }
      setOpenWindows((prev) => [...prev, ...newWindows]);
    }
  };

  const closeWindow = (
    projectId: ProjectId,
    type: "text" | "media" | "video",
    index?: number,
  ) => {
    setOpenWindows((prev) =>
      prev.filter((w) => {
        if (w.projectId !== projectId || w.type !== type) return true;
        if (type === "text") return w.blockIndex !== index;
        if (type === "video") return w.videoIndex !== index;
        return false;
      }),
    );
  };

  const getWindowKey = (w: ProjectWindow) => {
    if (w.type === "video" && w.videoIndex !== undefined)
      return `${w.projectId}-video-${w.videoIndex}`;
    if (w.blockIndex !== undefined)
      return `${w.projectId}-${w.type}-${w.blockIndex}`;
    return `${w.projectId}-${w.type}`;
  };

  const [lastFocusedWindowKey, setLastFocusedWindowKey] = useState<
    string | null
  >(null);

  const sortedWindows = useMemo(() => {
    if (!lastFocusedWindowKey) return openWindows;
    const focused = openWindows.find(
      (w) => getWindowKey(w) === lastFocusedWindowKey,
    );
    const rest = openWindows.filter(
      (w) => getWindowKey(w) !== lastFocusedWindowKey,
    );
    return focused ? [...rest, focused] : openWindows;
  }, [openWindows, lastFocusedWindowKey]);

  return (
    <>
      <div
        className="relative m-5.5 flex h-[650px] flex-row items-center justify-center overflow-hidden rounded-xl bg-light-green bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/bg-images/windows-bg.png)" }}
      >
        {PROJECTS.filter((p) => p.id !== null).map((project) => (
          <button
            key={project.id}
            type="button"
            className="cursor-pointer transition-transform hover:scale-105 focus:outline-none"
            onClick={() => toggleProject(project.id)}
          >
            <Image
              src={project.folderSrc}
              alt={project.folderAlt}
              width={150}
              height={150}
            />
          </button>
        ))}

        {sortedWindows.map((w) => {
          const proj = PROJECTS.find((p) => p.id === w.projectId);
          if (!proj) return null;
          const key = getWindowKey(w);
          if (w.type === "text") {
            const block =
              proj.descriptionBlocks && w.blockIndex !== undefined
                ? proj.descriptionBlocks[w.blockIndex]
                : null;
            const title = block ? `${proj.title} – ${block.title}` : proj.title;
            const content = block ? block.content : proj.description;
            if (!content) return null;
            return (
              <TextWindow
                key={key}
                title={title}
                onClose={() => closeWindow(w.projectId, "text", w.blockIndex)}
                onRequestFocus={() => setLastFocusedWindowKey(key)}
                initialX={w.x}
                initialY={w.y}
                width={w.width}
              >
                {content}
              </TextWindow>
            );
          }
          if (
            w.type === "video" &&
            w.videoIndex !== undefined &&
            proj.videos?.[w.videoIndex]
          ) {
            const video = proj.videos[w.videoIndex];
            const videoTitle =
              video.title ??
              video.src
                .split("/")
                .pop()
                ?.replace(/\.[^.]+$/, "") ??
              `Video ${w.videoIndex + 1}`;
            return (
              <MediaWindow
                key={key}
                title={`${proj.title} – ${videoTitle}`}
                onClose={() => closeWindow(w.projectId, "video", w.videoIndex)}
                onRequestFocus={() => setLastFocusedWindowKey(key)}
                images={[]}
                videos={[video]}
                initialX={w.x}
                initialY={w.y}
                width={w.width}
              />
            );
          }
          if (w.type === "media") {
            return (
              <MediaWindow
                key={key}
                title={`${proj.title} – Media`}
                onClose={() => closeWindow(w.projectId, "media")}
                onRequestFocus={() => setLastFocusedWindowKey(key)}
                images={proj.images ?? []}
                videos={
                  proj.descriptionBlocks?.length &&
                  (proj.videos?.length ?? 0) > 0
                    ? []
                    : (proj.videos ?? [])
                }
                initialX={w.x}
                initialY={w.y}
                width={w.width}
              />
            );
          }
          return null;
        })}

        {openWindows.length > 0 && (
          <button
            type="button"
            onClick={() => setOpenWindows([])}
            className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-black/80 shadow-md backdrop-blur-sm transition hover:bg-white focus:outline-none"
            aria-label="Alle vensters sluiten"
          >
            Alles sluiten
          </button>
        )}
      </div>

      <div className="mx-auto w-6/10 max-w-250 pb-11 pt-15 text-4xl">
        <h2>
          *Deze drie projecten zijn <strong>niet de enige</strong> waar ik aan
          heb gewerkt, maar wel degene waar ik het meeste van heb geleerd. Van
          <i> alle projecten</i> heb ik waardevolle dingen meegenomen die me nog
          steeds van pas komen.
        </h2>
      </div>
    </>
  );
}
