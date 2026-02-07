"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

export type Schilderij = {
  src: string;
  alt: string;
  beschrijving: React.ReactNode;
  /** Optioneel: afmetingen van de afbeelding (voor betere weergave) */
  width?: number;
  height?: number;
};

const DEFAULT_WIDTH = 480;
const DEFAULT_HEIGHT = 320;

const SCHILDERIJEN: Schilderij[] = [
  {
    src: "/images/schilderijen/schilderij_multidisciplinair.png",
    alt: "Multidisciplinair",
    width: 337,
    height: 408,
    beschrijving: (
      <>
        <p className="pb-4">
          Bij een digitaal agency zoals 35 komen development, design, strategy
          en operations samen.
        </p>
        <p>
          Dit vraagt om goede communicatie en begrip voor elkaars vakgebied. In
          de praktijk doorloop je het hele proces, van probleemdefinitie tot
          technische realisatie. Het gaat niet alleen om code schrijven, maar om
          het begrijpen van de volledige workflow.
        </p>
      </>
    ),
  },
  {
    src: "/images/schilderijen/schilderij_communicatie.png",
    alt: "Communicatie",
    width: 398,
    height: 303,
    beschrijving: (
      <>
        <p className="pb-4">
          Omdat iedereen met zo veel verschillende dingen bezig kan zijn, was
          het dus ook fijn dat er vaste communicatiemomenten waren, waar
          iedereen van elkaar op de hoogte werd gebracht.
        </p>
        <p>
          Monday morning meetings voor planning, Demo Days op vrijdag voor
          retrospective en weekendplannen. Deze ritmes geven niet alleen
          houvast, ze zorgen ook voor transparantie naar elkaar toe.
        </p>
      </>
    ),
  },

  {
    src: "/images/schilderijen/schilderij_elkaar-begrijpen.png",
    alt: "Elkaar begrijpen",
    width: 406,
    height: 406,
    beschrijving: (
      <>
        <p className="pb-4">
          Binnen een multidisciplinair team is het belangrijk om verder te
          kijken dan je eigen specialisme. Het werken met designtools zoals
          Figma en After Effects naast development vaardigheden vergroot niet
          alleen je inzetbaarheid, maar ook je begrip voor andere disciplines.
        </p>
        <p>
          En omdat iedereen hier breed inzetbaar is, werkt dat heel prettig
          samen. Ik voelde me op school al de schakel tussen design en dev, en
          dat heb ik hier kunnen versterken door ook back-end mee te pakken. Nu
          snap ik pas echt hoe waardevol het is om inzicht te hebben in zowel de
          gebruikersinterface als in onderliggende structuren zoals databases,
          API's en authenticatie.
        </p>
      </>
    ),
  },
  {
    src: "/images/schilderijen/schilderij_continue-ontwikkeling.png",
    alt: "Continue ontwikkeling",
    width: 410,
    height: 299,
    beschrijving: (
      <>
        <p className="pb-4">
          De tech-industrie staat nooit stil. Wat je vandaag leert, kan morgen
          alweer verouderd zijn. Mijn collega’s zitten er allemaal bovenop, maar
          ik juist helemaal niet. Dat was eerst best intimiderend, maar als je
          de paar “core” frameworks en tools kent, lijkt alles uiteindelijk best
          wel veel op elkaar.
        </p>
        <p>
          Ik merkte snel genoeg dat je niet alleen leert van documentatie en
          tutorials, maar ook van je collega's, en vragen stellen werd zelfs
          aangemoedigd. Deze cultuur van kennisdeling is onmisbaar in een
          omgeving waar frameworks en best practices voortdurend evolueren, en
          daar ben ik ook super dankbaar voor.
        </p>
      </>
    ),
  },
  {
    src: "/images/schilderijen/schilderij_alles-fout.png",
    alt: "Alles fout",
    width: 406,
    height: 406,
    beschrijving: (
      <>
        <p className="pb-4">
          Ik had niet gedacht dat het internet bestaat uit zó veel formulieren.
          Dat betekent dus ook veel validatie. Ik ga er nu dus ook altijd van
          uit dat gebruikers verkeerde dingen gaan invullen. Je wilt niet dat
          gebruikers "3416076" in een naamveld invoeren, of dat ze alleen een
          06-nummer als telefoonnummer kunnen opgeven.
        </p>
        <p>
          Je kunt ook overdrijven, en de kunst is natuurlijk om niet te veel te
          doen als het niet allemaal hoeft. Goede error handling met try-catch
          blocks, het checken van response status codes en het implementeren van
          fallback waardes zal altijd nodig zijn.
        </p>
      </>
    ),
  },
];

export function SchilderijCarousel() {
  const [selectedSchilderij, setSelectedSchilderij] =
    useState<Schilderij | null>(null);
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    axis: "x",
    align: "start",
    containScroll: "trimSnaps",
  });

  return (
    <>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4 items-center">
          {SCHILDERIJEN.map((schilderij) => (
            <button
              key={schilderij.src}
              type="button"
              onClick={() => setSelectedSchilderij(schilderij)}
              className="relative flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg text-left transition-scale hover:scale-[1.05] focus:outline-none"
              style={{ width: schilderij.width, height: schilderij.height }}
            >
              <Image
                src={schilderij.src}
                alt={schilderij.alt}
                width={schilderij.width ?? DEFAULT_WIDTH}
                height={schilderij.height ?? DEFAULT_HEIGHT}
                className="block h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      {selectedSchilderij &&
        (() => {
          const currentIndex = SCHILDERIJEN.findIndex(
            (s) => s === selectedSchilderij
          );
          const prevIndex =
            currentIndex <= 0 ? SCHILDERIJEN.length - 1 : currentIndex - 1;
          const nextIndex =
            currentIndex >= SCHILDERIJEN.length - 1 ? 0 : currentIndex + 1;
          return (
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedSchilderij(null)}
              onKeyDown={(e) => {
                if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedSchilderij(null);
                }
              }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm focus:outline-none cursor-default"
              aria-label="Sluiten"
            >
              <div
                className="relative flex max-h-[90vh] max-w-[95vw] flex-row items-center justify-center "
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-[40vw] h-auto shrink-0">
                  <Image
                    src={selectedSchilderij.src}
                    alt={selectedSchilderij.alt}
                    width={selectedSchilderij.width ?? DEFAULT_WIDTH}
                    height={selectedSchilderij.height ?? DEFAULT_HEIGHT}
                    className="block h-full w-full object-contain"
                  />
                </div>
                <div className="relative h-[84vh] w-[45vw] -ml-8 shrink-0 overflow-hidden">
                  <Image
                    src="/images/paper/papier_met_kant.png"
                    alt=""
                    fill
                    className="object-fill"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center px-[19%] py-[22%] text-left">
                    <div className="text-[15px] leading-relaxed text-black/85">
                      {selectedSchilderij.beschrijving}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-15 left-1/4 flex -translate-x-1/2 translate-y-full items-center gap-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSchilderij(SCHILDERIJEN[prevIndex]);
                    }}
                    className="rounded-full bg-white/70 p-2 shadow-md hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                    aria-label="Vorige schilderij"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSchilderij(SCHILDERIJEN[nextIndex]);
                    }}
                    className="rounded-full bg-white/70 p-2 shadow-md hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                    aria-label="Volgende schilderij"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
}
