"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

export type Person = {
  polaroid: { src: string; alt: string };
  beschrijving: React.ReactNode;
  bullets: string[];
  dog?: { src: string; alt: string };
};

const PEOPLE: Person[] = [
  {
    polaroid: {
      src: "/images/polaroids/polaroid_pascal.png",
      alt: "Polaroid Pascal",
    },
    beschrijving: (
      <>
        <p className="pb-4">
          <b>Pascal van der Steen</b> regelt alles wat niemand anders wil doen:
          contracten, financiën, facturen, boekhouding... en hij vindt het ook
          nog eens leuk, ofja, prima. Maar dat betekent niet dat hij niets
          anders kan: als CMD alumni heeft Pascal gevoel voor zowel development
          als design. Pascal is razendsnel in het maken van dingen en een echte
          ondernemer in hart en nieren.
        </p>
        <p>
          Buiten werk om heeft hij daardoor ook veel ervaring opgedaan: hij
          heeft in de bouw- en hovenierssector bijverdiend, wat enorm handig te
          pas komt in zijn nieuwe huis. Ook heeft hij gewerkt in de horeca, al
          komt die skill iets minder van pas omdat we een vaatwasser hebben. Oh,
          en hij heeft ook nog eens in een punk-band gezeten.
        </p>
      </>
    ),
    bullets: ["founder", "longboard pro", "hoofd feestcommissie"],
    dog: { src: "/images/polaroids/polaroid_niels.png", alt: "Hond van Pascal" },
  },
  {
    polaroid: { src: "/images/polaroids/polaroid_juul.png", alt: "Polaroid Juul" },
    beschrijving: (
      <>
        <p className="pb-4">
          <b>Juul Crooymans</b> is onze Tech Lead. Met ruim 8 jaar
          programmeerervaring op zak runt Juul de codebases van 35 alsof het de
          marine is. Vrijwel alle pullrequests komen bij hem terecht, en ik
          vraag me elke dag af hoe hij nog tijd heeft voor andere dingen. Met al
          die jaren programmeerervaring heeft hij ook een heus UX/UI talent
          ontwikkeld, alles netjes en duidelijk vormgeven is voor hem nooit een
          probleem.
        </p>
        <p>
          Soms zal je hem zien dansen op zijn house muziek (dat denk ik tenmiste
          dat het is, ik ben niet zo’n echte kenner), die hij vrijwel altijd op
          de achtergrond op heeft staan. Hij houdt zo van DJ sets dat hij zelfs
          ooit zijn eigen draaitafel mee naar kantoor heeft genomen. Die ligt nu
          wel te verstoffen, maar goed, het idee was er.
        </p>
      </>
    ),
    bullets: ["founder", "piano maestro", "stroopsupplier"],
  },
  {
    polaroid: { src: "/images/polaroids/polaroid_bob.png", alt: "Polaroid Bob" },
    beschrijving: (
      <>
        <p className="pb-4">
          <b>Bob Wasserman</b> is de CEO en founder, en het kloppend hart van 35
          op het gebied van klantrelaties. Bob zit sommige dagen non-stop in
          meetings. Hij is het aanspreekpunt voor álle klanten en moet ze
          natuurlijk ook tevreden houden. Dat klinkt misschien vermoeiend, maar
          het betekent ook dat Bob altijd van alles op de hoogte is en bij
          vrijwel elk project kan inspringen om te helpen. Vraag het hem, en de
          kans is groot dat hij precies weet waar je mee bezig bent.
        </p>
        <p>
          Naast zijn talent voor klantbeheer is Bob ook verantwoordelijk voor de
          beste investering op kantoor: onze koffie. Bob is namelijk een enorme
          koffieliefhebber, en dat merk je. De gekste smaken kun je hier op
          kantoor allemaal proberen.
        </p>
      </>
    ),
    bullets: ["founder", "heeft gekke streamer setup", "buurman is pastior"],
    dog: { src: "/images/polaroids/polaroid_cheddar.png", alt: "Hond van Bob" },
  },
  {
    polaroid: {
      src: "/images/polaroids/polaroid_frank.png",
      alt: "Polaroid Frank",
    },
    beschrijving: (
      <>
        <p className="pb-4">
          <b>Frank Slangen</b> is onze Creative Lead, en als je hem aan het werk
          ziet is het meteen duidelijk: Frank ademt design. Uitstraling,
          positionering, uren zoeken naar het perfecte font… daar draait het bij
          hem om. Zijn digitale speeltuin is Figma, voor drukwerk duikt hij in
          InDesign, en tegenwoordig laat hij zich graag bijstaan door AI-tools
          zoals Leonardo en ChatGPT.
        </p>
        <p>
          Voor zijn werk bij 35 heeft Frank SAUS gerund samen met Will Muijrers.
          Buiten de kantooruren is Frank ook creatief bezig, maar dan op een
          totaal andere manier: hij zit in een carnavalsharmonie. Daarvoor heeft
          hij samba getrommeld en zelfs een band opgericht. Blijkbaar is ritme
          net zo belangrijk als een strak grid.
        </p>
      </>
    ),
    bullets: [
      "founder",
      "plantenverzorger",
      "zit als enige niet op een bureaustoel",
    ],
  },
  {
    polaroid: {
      src: "/images/polaroids/polaroid_tristan.png",
      alt: "Polaroid Tristan",
    },
    beschrijving: (
      <>
        <p className="pb-4">
          <b>Tristan Vranken</b> brengt ideeën tot leven. Of het nu concepting,
          3D rendering, motion design of frontend development is, Tristan
          beweegt zich moeiteloos tussen disciplines en heeft overal een visie
          op. Strategy is zijn expertise, maar hij schuwt het technische werk
          niet.
        </p>
        <p>
          Tristans werkritme is... anders. Terwijl de rest van het kantoor om
          negen uur achter hun laptop zit, heeft Tristan zijn eigen tijdzone.
          Soms komt hij pas om vijf uur binnen wandelen, altijd met zijn
          zonnebril op. Maar als hij er is, is hij er helemaal.
        </p>
      </>
    ),
    bullets: ["founder", "style icon"],
  },
  {
    polaroid: { src: "/images/polaroids/polaroid_sem.png", alt: "Polaroid Sem" },
    beschrijving: (
      <>
        <p className="pb-4">
          <b>Sem Stassen</b> is een echte software engineer en ziet programmeren
          als een grote puzzel: er is altijd één vraagstuk, met honderden
          manieren om het op te lossen. Sem heeft een zwak voor UX, systemen en
          hoe mensen door interfaces navigeren. Clean code en toekomstbestendig
          bouwen is zijn ding.
        </p>
        <p>
          Sem was de allereerste stagiair bij 35, nog voordat het officieel 35
          was. De rest is geschiedenis! Zelfs een trip naar Amerika kon hem niet
          weghouden. In zijn vrije tijd dart, bouldert en hardloopt Sem, speelt
          hij games en bordspellen, en ja… programmeert hij ook nog eens.
        </p>
      </>
    ),
    bullets: ["geweldige collectie 2e hands truien", "nep-vegetariër"],
  },
  {
    polaroid: { src: "/images/polaroids/polaroid_mats.png", alt: "Polaroid Mats" },
    beschrijving: (
      <>
        <p className="pb-4">
          <b>Mats Erdkamp</b> is design engineer, de schakel tussen front-end
          development en design. Hij heeft industrial design gestudeerd, maar
          besloot een andere kant op te gaan en zich te specialiseren in waar
          code en pixels samenkomen.
        </p>
        <p>
          Mats was de allereerste externe medewerker die bij 35 is
          binnengekomen, en hij past hier perfect. Hij heeft meestal de aux in
          handen (figuratief, want we hebben bluetooth of course) en zijn
          muzieksmaak is zo breed dat hij voor élke situatie wel iets heeft: van
          geconcentreerd werken tot vrijdagmiddagvibes. Altijd chill en relaxed,
          Mats brengt niet alleen goede code en design, maar ook de juiste vibes
          mee.
        </p>
      </>
    ),
    bullets: ["mario kart champion", "de allereerste die mij heeft gevlaaid"],
  },
  {
    polaroid: {
      src: "/images/polaroids/polaroid_driek.png",
      alt: "Polaroid Driek",
    },
    beschrijving: (
      <>
        <p className="pb-4">
          <b>Driek van der Meulen</b> is maar twee dagen per week op kantoor,
          dus we zien elkaar niet superveel. Toch is hij altijd mijn
          aanspreekpunt als het om stage gaat. Vastgelopen? Driek heeft het
          antwoord. Paniek? Driek heeft het ook meegemaakt. En meestal helpt hij
          me niet eens met een oplossing, maar met de geruststelling dat het
          allemaal wél goed komt.
        </p>
        <p>
          Buiten zijn back-end skills is Driek ook de wandelende nieuwsupdate
          van kantoor: of het nu gaat om wereldpolitiek, tech-drama of de meest
          obscure memes van het internet, hij is altijd op de hoogte. En terwijl
          de rest van het kantoor op automatische piloot koffie drinkt,
          herinnert Driek ons er aan dat thee ook gewoon bestaat.
        </p>
      </>
    ),
    bullets: ["niest vaak", "de enige die ooit aan het statiegeld denkt"],
  },
];

const SLIDE_WIDTH_PX = 240;

export function PolaroidCarousel() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
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
        <div className="flex touch-pan-y">
          {PEOPLE.map((person) => (
            <button
              key={person.polaroid.src}
              type="button"
              onClick={() => setSelectedPerson(person)}
              className="relative shrink-0 cursor-pointer text-left transition-scale hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              style={{
                width: SLIDE_WIDTH_PX,
              }}
            >
              <div>
                <Image
                  src={person.polaroid.src}
                  alt={person.polaroid.alt}
                  width={240}
                  height={280}
                  className="block object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPerson &&
        (() => {
          const currentIndex = PEOPLE.findIndex((p) => p === selectedPerson);
          const prevIndex =
            currentIndex <= 0 ? PEOPLE.length - 1 : currentIndex - 1;
          const nextIndex =
            currentIndex >= PEOPLE.length - 1 ? 0 : currentIndex + 1;
          return (
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelectedPerson(null)}
              onKeyDown={(e) => {
                if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedPerson(null);
                }
              }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm focus:outline-none cursor-default"
              aria-label="Sluiten"
            >
              <span
                className="relative block max-h-[90vh] max-w-[95vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src="/images/paper/groot_papier.png"
                  alt=""
                  width={1100}
                  height={900}
                  className="block h-auto w-full max-h-[85vh] object-contain pointer-events-none"
                />
                <div className="text-black pt-10 text-left absolute w-[70%] pl-10 left-1/2 top-1/2 -translate-1/2">
                  {selectedPerson.beschrijving}
                </div>

                <Image
                  src={selectedPerson.polaroid.src}
                  alt={selectedPerson.polaroid.alt}
                  width={290}
                  height={245}
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 block object-contain"
                />

                {selectedPerson.dog && (
                  <span className=" absolute left-full top-10 -translate-y-[30%] block w-[266px] shrink-0">
                    <Image
                      src="/images/paper/roze_papier_plakband.png"
                      alt=""
                      width={266}
                      height={266}
                      className="block w-full h-auto"
                    />
                    <Image
                      src={selectedPerson.dog.src}
                      alt={selectedPerson.dog.alt}
                      width={120}
                      height={140}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-[120px] object-cover shadow-sm"
                    />
                  </span>
                )}

                <div className="absolute left-full top-1/2 -translate-x-[5%] -translate-y-[25%] block h-[199px] w-[199px] object-contain">
                  <Image
                    src="/images/paper/blauw_papier_plakband.png"
                    alt=""
                    width={290}
                    height={245}
                    className="h-full w-full object-contain"
                  />
                  <div className="text-left px-9 pt-6 absolute inset-0 flex flex-col justify-center overflow-hidden p-3 text-[11px] text-black/90">
                    <ul className="list-inside list-disc space-y-0.5">
                      {selectedPerson.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Links/rechts knoppen om van persoon te wisselen */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 translate-y-full flex items-center gap-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPerson(PEOPLE[prevIndex]);
                    }}
                    className="rounded-full bg-white/70 p-2 shadow-md hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                    aria-label="Vorige persoon"
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
                      setSelectedPerson(PEOPLE[nextIndex]);
                    }}
                    className="rounded-full bg-white/70 p-2 shadow-md hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                    aria-label="Volgende persoon"
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
              </span>
            </div>
          );
        })()}
    </>
  );
}
