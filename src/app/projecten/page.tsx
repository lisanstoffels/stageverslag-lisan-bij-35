"use client";

import Image from "next/image";
import { useState } from "react";
import type { MediaItemImage } from "../../components/windows/PreviewWindow";
import {
  TextWindow,
  MediaWindow,
} from "../../components/windows/PreviewWindow";

type ProjectId = "twitter" | "sev" | "bose" | "lumi" | null;

type ProjectWindow = {
  projectId: ProjectId;
  type: "text" | "media";
  x?: number;
  y?: number;
  width?: number;
};

const PROJECTS: {
  id: ProjectId;
  folderSrc: string;
  folderAlt: string;
  title: string;
  description: React.ReactNode;
  images: MediaItemImage[];
}[] = [
  {
    id: "twitter",
    folderSrc: "/images/folders/twitter-clone.png",
    folderAlt: "projectfolder: twitter clone",
    title: "Twitter Clone",
    description: (
      <p>
        Een eigen versie van Twitter gebouwd tijdens de stage. Hier heb ik
        gewerkt aan timeline, tweets posten en likes. De focus lag op
        componenten, state en API-integratie.
      </p>
    ),
    images: [
      {
        src: "/images/folders/twitter-clone.png",
        alt: "Twitter Clone project",
        width: 500,
        height: 300,
      },
    ],
  },
  {
    id: "sev",
    folderSrc: "/images/folders/sev-app.png",
    folderAlt: "projectfolder: sevagram app",
    title: "Sevagram App",
    description: (
      <p>
        App-project voor Sevagram: inloggen, profiel en feed. Hier kwam
        authenticatie, formulieren en responsive layout aan bod.
      </p>
    ),
    images: [
      {
        src: "/images/folders/sev-app.png",
        alt: "Sevagram app",
        width: 500,
        height: 300,
      },
    ],
  },
  {
    id: "bose",
    folderSrc: "/images/folders/bose.png",
    folderAlt: "projectfolder: bose",
    title: "Bose",
    description: (
      <p>
        Project in opdracht van Bose: o.a. productpagina's en configuratie-UI.
        Veel aandacht voor design-nabootsing en gebruiksvriendelijkheid.
      </p>
    ),
    images: [
      {
        src: "/images/folders/bose.png",
        alt: "Bose project",
        width: 500,
        height: 300,
      },
    ],
  },
  {
    id: "lumi",
    folderSrc: "/images/folders/lumi.png",
    folderAlt: "projectfolder: greenchoice lumi",
    title: "Greenchoice Lumi",
    description: (
      <p>
        Lumi-project voor Greenchoice: dashboard en overzichten voor
        energieverbruik. Hier heb ik gewerkt aan data-visualisatie en
        toegankelijke tabellen.
      </p>
    ),
    images: [
      {
        src: "/images/folders/lumi.png",
        alt: "Greenchoice Lumi",
        width: 500,
        height: 300,
      },
    ],
  },
];

export default function ProjectsPage() {
  const [openWindows, setOpenWindows] = useState<ProjectWindow[]>([]);

  const hasWindowsForProject = (id: ProjectId) =>
    openWindows.some((w) => w.projectId === id);

  const toggleProject = (id: ProjectId) => {
    if (hasWindowsForProject(id)) {
      setOpenWindows((prev) => prev.filter((w) => w.projectId !== id));
    } else {
      setOpenWindows((prev) => [
        ...prev,
        { projectId: id, type: "text", x: 40, y: 60, width: 400 },
        { projectId: id, type: "media", x: 460, y: 80, width: 420 },
      ]);
    }
  };

  const closeWindow = (projectId: ProjectId, type: "text" | "media") => {
    setOpenWindows((prev) =>
      prev.filter((w) => !(w.projectId === projectId && w.type === type))
    );
  };

  return (
    <div className="relative m-5.5 flex h-[600px] flex-row items-center justify-center overflow-hidden rounded-xl bg-light-green">
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

      {openWindows.map((w) => {
        const project = PROJECTS.find((p) => p.id === w.projectId);
        if (!project) return null;
        const key = `${w.projectId}-${w.type}`;
        if (w.type === "text") {
          return (
            <TextWindow
              key={key}
              title={project.title}
              onClose={() => closeWindow(w.projectId, "text")}
              initialX={w.x}
              initialY={w.y}
              width={w.width}
            >
              {project.description}
            </TextWindow>
          );
        }
        return (
          <MediaWindow
            key={key}
            title={`${project.title} – Afbeelding`}
            onClose={() => closeWindow(w.projectId, "media")}
            images={project.images}
            initialX={w.x}
            initialY={w.y}
            width={w.width}
          />
        );
      })}
    </div>
  );
}
