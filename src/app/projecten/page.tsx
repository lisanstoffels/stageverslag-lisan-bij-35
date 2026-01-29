"use client";

import Image from "next/image";
import { useState } from "react";
import {
  PreviewModal,
  PreviewText,
  PreviewImages,
} from "../../components/windows/PreviewModal";

type ProjectId = "twitter" | "sev" | "bose" | "lumi" | null;

const PROJECTS: {
  id: ProjectId;
  folderSrc: string;
  folderAlt: string;
  title: string;
  content: React.ReactNode;
}[] = [
  {
    id: "twitter",
    folderSrc: "/images/folders/twitter-clone.png",
    folderAlt: "projectfolder: twitter clone",
    title: "Twitter Clone",
    content: (
      <>
        <PreviewText>
          <p>
            Een eigen versie van Twitter gebouwd tijdens de stage. Hier heb ik
            gewerkt aan timeline, tweets posten en likes. De focus lag op
            componenten, state en API-integratie.
          </p>
        </PreviewText>
        <PreviewImages
          srcs={["/images/folders/twitter-clone.png"]}
          alts={["Twitter Clone project"]}
          widths={500}
          heights={300}
        />
      </>
    ),
  },
  {
    id: "sev",
    folderSrc: "/images/folders/sev-app.png",
    folderAlt: "projectfolder: sevagram app",
    title: "Sevagram App",
    content: (
      <>
        <PreviewText>
          <p>
            App-project voor Sevagram: inloggen, profiel en feed. Hier kwam
            authenticatie, formulieren en responsive layout aan bod.
          </p>
        </PreviewText>
        <PreviewImages
          srcs={["/images/folders/sev-app.png"]}
          alts={["Sevagram app"]}
          widths={500}
          heights={300}
        />
      </>
    ),
  },
  {
    id: "bose",
    folderSrc: "/images/folders/bose.png",
    folderAlt: "projectfolder: bose",
    title: "Bose",
    content: (
      <>
        <PreviewText>
          <p>
            Project in opdracht van Bose: o.a. productpagina’s en
            configuratie-UI. Veel aandacht voor design-nabootsing en
            gebruiksvriendelijkheid.
          </p>
        </PreviewText>
        <PreviewImages
          srcs={["/images/folders/bose.png"]}
          alts={["Bose project"]}
          widths={500}
          heights={300}
        />
      </>
    ),
  },
  {
    id: "lumi",
    folderSrc: "/images/folders/lumi.png",
    folderAlt: "projectfolder: greenchoice lumi",
    title: "Greenchoice Lumi",
    content: (
      <>
        <PreviewText>
          <p>
            Lumi-project voor Greenchoice: dashboard en overzichten voor
            energieverbruik. Hier heb ik gewerkt aan data-visualisatie en
            toegankelijke tabellen.
          </p>
        </PreviewText>
        <PreviewImages
          srcs={["/images/folders/lumi.png"]}
          alts={["Greenchoice Lumi"]}
          widths={500}
          heights={300}
        />
      </>
    ),
  },
];

export default function ProjectsPage() {
  const [openProject, setOpenProject] = useState<ProjectId>(null);

  const current = PROJECTS.find((p) => p.id === openProject);

  return (
    <div className="m-5.5 flex h-[600px] flex-row items-center justify-center overflow-hidden rounded-xl bg-light-green">
      {PROJECTS.filter((p) => p.id !== null).map((project) => (
        <button
          key={project.id}
          type="button"
          className="cursor-pointer transition-transform hover:scale-105 focus:outline-none"
          onClick={() => setOpenProject(project.id)}
        >
          <Image
            src={project.folderSrc}
            alt={project.folderAlt}
            width={150}
            height={150}
          />
        </button>
      ))}

      {current && (
        <PreviewModal
          title={current.title}
          onClose={() => setOpenProject(null)}
        >
          {current.content}
        </PreviewModal>
      )}
    </div>
  );
}
