"use client";

import Image from "next/image";
import { useState } from "react";

const TABS = [
  {
    src: "/images/tabs/bordeaux_tab.png",
    row: 1,
    col: 0,
    title: "Grotere en complexere projecten",
    leerdoel: {
      text: "Ik wil grotere en complexere front-end projecten ontwikkelen waarbij ik het hele proces meeneem, van probleemdefinitie, onderzoek en conceptontwikkeling tot technische realisatie.",
      top: 124,
      left: 417,
      width: 323,
    },
    omschrijving: {
      text: "Het is zeker gelukt om grotere en complexere projecten aan te gaan, zelfs meer dan verwacht. In plaats van alleen front-end projecten te beginnen ben ik zelfs de back-end ingedoken. Het onderzoek en conceptontwikkeling-deel heb ik hiervoor ingeruild, en dat vond ik geen enkel probleem. Ik ben vooral gaan richten op de technische ontwikkeling. Door deze focus heb ik ook meer richting gevonden in wat ik echt wil en leuk vind, waardoor ik niet per se alles hoef te doen.",
      x: 991,
      y: 152,
      width: 357,
      backgroundColor: "rgba(255,255,255,0.3)",
    },
  },
  {
    src: "/images/tabs/gray_tab.png",
    row: 1,
    col: 1,
    title: "Werken in een development team",
    leerdoel: {
      text: "Ik wil leren om samen te werken binnen een development team, door beter inzicht te krijgen in de workflow, tools en overlegstructuren die gebruikt worden in een professionele omgeving.",
      top: 147,
      left: 160,
      width: 330,
    },
    omschrijving: {
      text: "Toen ik de eerste dag hier was, heb ik wel 10 nieuwe apps moeten downloaden. Dat was op het begin erg overweldigend, maar het wende gelukkig erg snel. Apps zoals Slack, Linear, Notion, Github en onePassword vormen een soort app-ecosysteem binnen 35®. Qua development workflow heb ik heel veel geleerd over Github: hoe branch structuren werken, waarom je bijvoorbeeld niet altijd in main wil werken, en hoe je in de terminal branches kunt managen.\n\nElke maandagmorgen plannen we samen de week in tijdens de monday morning meeting, en op vrijdag blikken we terug tijdens de friday morning meeting en demo day. Voor overleggen gebruikt 35 Notion, waar bijna alles wordt gedocumenteerd. Maar we communiceren niet alleen via de computer: we lunchen allemaal samen en wandelen elke dag, wat zorgt voor een relaxte sfeer.",
      x: 705,
      y: 232,
      width: 525,
    },
  },
  {
    src: "/images/tabs/green_tab.png",
    row: 2,
    col: 0,
    title: "Meer durven uitspreken",
    leerdoel: {
      text: "Ik wil leren om me durven uit te spreken.",
      top: 90,
      left: 360,
      width: 253,
    },
    omschrijving: {
      text: "In een bedrijf met alleen maar mannen moést ik me wel uitspreken! De eerste paar weken was het iets lastiger, omdat er veel nieuwe dingen op me af kwamen en ik mijn draai nog moest vinden. Gelukkig kan ik wel wat tegengas geven. Hier zijn ze na twee weken ook al achter gekomen.\n\nAls ik nu ook terugkijk weet ik niet waarom ik dit als leerdoel heb opgeschreven. Ik denk omdat ik mezelf (buiten een bijbaantje) nog nooit écht in een professionele setting mee heb gemaakt. Nu is 35® niet een super-serieus kantoor waar iedereen in pak aankomt, is het wel belangrijk om je als professional te gedragen. Ik denk dat ik de balans tussen werk en plezier hier heel goed heb kunnen vinden.",
      x: 777,
      y: 190,
      width: 393,
    },
  },
  {
    src: "/images/tabs/blue_tab.png",
    row: 2,
    col: 1,
    title: "Omgaan met feedback",
    leerdoel: {
      text: "Ik wil leren om feedback minder persoonlijk op te vatten.",
      top: 210,
      left: 495,
      width: 283,
    },
    omschrijving: {
      text: 'Tijdens een development stage krijg je niet dezelfde soort feedback als op school. Een code review is heel objectief, zoals "haal hier de console log weg" of "deze functie moet eerder dan die functie worden aangeroepen". Als mijn code dus ook feitelijk nog niet klopt boeit het me eigenlijk geen reet en vat ik het helemaal niet persoonlijk op. Ik pas het meteen aan en ik heb ook nog eens het gevoel dat ik ook echt leer van mijn fouten.',
      x: 966,
      y: 198,
      width: 393,
    },
  },
  {
    src: "/images/tabs/orange_tab.png",
    row: 2,
    col: 2,
    title: "Minder perfectionisme",
    leerdoel: {
      text: "Ik wil leren om perfectionisme te temmen.",
      top: 100,
      left: 800,
      width: 273,
    },
    omschrijving: {
      text: 'Ik moet zeggen dat ik niet veel last van perfectionisme heb gehad. Na een dag stage kan ik de drukte achter me laten, en het de volgende dag weer oppakken. Om eerlijk te zijn wil ik niet eens meer aan code denken als ik thuis ben. Die rust zorgt er voor dat ik veel minder zit te prakkiseren. Tijdens het werk valt het ook reuze mee omdat ik heel veel slimme collega\'s in de buurt heb aan wie ik alles kan vragen.\n\nIk denk uiteindelijk dat perfectionisme altijd bij me zal blijven. Het leerdoel is gaandeweg ook bijgesteld, nadat ik het hierover heb gehad met Pascal: hij vindt het juist fijn om een stagiaire te hebben die de code pixel-perfect na kan maken. Dat vond ik verrassend om te horen, omdat ik perfectionisme vooral als een struikelblok zag. Als ik het leerdoel opnieuw zou kunnen formuleren zou ik dus zeggen: "Ik wil leren mijn perfectionisme zo goed mogelijk in te zetten."',
      x: 101,
      y: 89,
      width: 450,
    },
  },
  {
    src: "/images/tabs/yellow_tab.png",
    row: 3,
    col: 0,
    title: "Responsive, pixel perfect code",
    leerdoel: {
      text: "Ik wil beter worden in het vertalen van visuele ontwerpen naar pixel-perfect, responsive front-end code, met oog voor performance en toegankelijkheid.",
      top: 160,
      left: 200,
      width: 353,
    },
    omschrijving: {
      text: "Ik ben door vooral herhaling een stuk sneller geworden in coderen. In plaats van CSS gebruik ik nu tailwind, die door middel van class names supersnel styling kan toepassen. Hierdoor heb ik meer tijd om op de back-end te focussen! Tijdens mijn stage heb ik hier ook veel positieve feedback over gekregen. Ik kreeg vaak te horen dat ik goed let op de behoeften van de gebruiker en dat ik graag het eindproduct test voordat het wordt opgeleverd. Hierdoor heb ik vaker QA's uitgevoerd, wat ervoor zorgt dat de applicaties die ik maak niet alleen technisch goed in elkaar zitten, maar ook fijn werken voor de eindgebruiker.",
      x: 663,
      y: 232,
      width: 436,
    },
  },
  {
    src: "/images/tabs/dark bordeaux tab.png",
    row: 3,
    col: 1,
  },
] as const;

const ROW_TOP = [0, 67, 134] as const;
const ROW_HEIGHT = 630;
const COLS_PER_ROW = [2, 3, 2] as const;
const LIFT_OFFSET = [458, 520, 590] as const; // row 1, 2, 3 (px omhoog)
const PUSH_DOWN = [128, 81, 38] as const; // row 1, 2, 3

function getTop(row: 1 | 2 | 3) {
  return ROW_TOP[row - 1];
}
function getLiftOffset(row: 1 | 2 | 3) {
  return LIFT_OFFSET[row - 1];
}
function getPushDown(row: 1 | 2 | 3) {
  return PUSH_DOWN[row - 1];
}
function getZIndex(row: 1 | 2 | 3, col: number) {
  const base = row === 1 ? 0 : row === 2 ? 10 : 20;
  return base + col;
}
function getZoneStyle(row: 1 | 2 | 3, col: number) {
  const cols = COLS_PER_ROW[row - 1];
  const widthPercent = 100 / cols;
  const leftPercent = col * widthPercent;
  return { left: `${leftPercent}%`, width: `${widthPercent}%` };
}

export default function LeerdoelenPage() {
  const [liftedIndex, setLiftedIndex] = useState<number | null>(null);

  const handleTabClick = (i: number) => {
    setLiftedIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="min-h-0 flex-1" />

      <div className="relative h-[225px] w-[1512px] mx-auto">
        {TABS.map((tab, i) => {
          const baseTop = getTop(tab.row);
          const top =
            liftedIndex === i
              ? baseTop - getLiftOffset(tab.row)
              : liftedIndex != null
                ? baseTop + getPushDown(tab.row)
                : baseTop;
          return (
            <div
              key={`img-${tab.row}-${tab.col}-${i}`}
              className="pointer-events-none absolute left-0 w-full transition-[top] duration-200 ease-out"
              style={{
                top: `${top}px`,
                zIndex: getZIndex(tab.row, tab.col),
              }}
            >
              <Image
                src={tab.src}
                alt=""
                width={1620}
                height={630}
                className="h-full w-full object-cover object-top-left"
              />
            </div>
          );
        })}
        {TABS.map((tab, i) => {
          const zone = getZoneStyle(tab.row, tab.col);
          const baseTop = getTop(tab.row);
          const top =
            liftedIndex === i
              ? baseTop - getLiftOffset(tab.row)
              : liftedIndex != null
                ? baseTop + getPushDown(tab.row)
                : baseTop;
          const title = "title" in tab ? tab.title : undefined;
          const isClickable = tab.src !== "/images/tabs/dark bordeaux tab.png";
          if (!isClickable) {
            return (
              <div
                key={`zone-${tab.row}-${tab.col}-${i}`}
                className="pointer-events-none absolute transition-[top] duration-200 ease-out"
                style={{
                  top: `${top}px`,
                  left: zone.left,
                  width: zone.width,
                  height: `${ROW_HEIGHT}px`,
                  zIndex: getZIndex(tab.row, tab.col),
                }}
                aria-hidden
              />
            );
          }
          return (
            <button
              key={`zone-${tab.row}-${tab.col}-${i}`}
              type="button"
              className="absolute flex cursor-pointer justify-center px-4 py-5 text-center text-2xl font-medium uppercase text-black transition-[top] duration-200 ease-out"
              style={{
                top: `${top}px`,
                left: zone.left,
                width: zone.width,
                height: `${ROW_HEIGHT}px`,
                zIndex: getZIndex(tab.row, tab.col),
              }}
              onClick={() => handleTabClick(i)}
              aria-label={title ?? `Leerdoel ${i + 1}`}
            >
              {title}
            </button>
          );
        })}
        {/* Tekstlaag: leerdoel + omschrijving op vaste x,y op de tab-image; wrapper beweegt mee met de tab */}
        {TABS.map((tab, i) => {
          if (!("leerdoel" in tab) || !("omschrijving" in tab)) return null;
          const baseTop = getTop(tab.row);
          const top =
            liftedIndex === i
              ? baseTop - getLiftOffset(tab.row)
              : liftedIndex != null
                ? baseTop + getPushDown(tab.row)
                : baseTop;
          const { leerdoel, omschrijving } = tab;
          return (
            <div
              key={`text-${tab.row}-${tab.col}-${i}`}
              className="pointer-events-none absolute left-0 w-full transition-[top] duration-200 ease-out"
              style={{
                top: `${top}px`,
                height: `${ROW_HEIGHT}px`,
                zIndex: getZIndex(tab.row, tab.col),
              }}
            >
              <div
                className="absolute text-sm font-medium text-black/90 aspect-square flex items-center justify-center"
                style={{
                  top: `${leerdoel.top}px`,
                  left: `${leerdoel.left}px`,
                  width:
                    "width" in leerdoel && typeof leerdoel.width === "number"
                      ? `${leerdoel.width}px`
                      : undefined,
                  padding: "70px 56px",
                  backgroundImage:
                    "url(/images/paper/blauw_papier_plakband.png)",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundColor:
                    "backgroundColor" in leerdoel &&
                    typeof leerdoel.backgroundColor === "string"
                      ? leerdoel.backgroundColor
                      : undefined,
                }}
              >
                <div>
                  <p className="pt-8 pb-2">Leerdoel:</p>
                  <p>"{leerdoel.text}"</p>
                </div>
              </div>
              <div
                className="absolute text-sm leading-relaxed text-black/80"
                style={{
                  top: `${omschrijving.y}px`,
                  left: `${omschrijving.x}px`,
                  width:
                    "width" in omschrijving &&
                    typeof omschrijving.width === "number"
                      ? `${omschrijving.width}px`
                      : undefined,
                  maxWidth:
                    "width" in omschrijving &&
                    typeof omschrijving.width === "number"
                      ? undefined
                      : "85%",
                  backgroundColor:
                    "backgroundColor" in omschrijving &&
                    typeof omschrijving.backgroundColor === "string"
                      ? omschrijving.backgroundColor
                      : undefined,
                  padding:
                    "backgroundColor" in omschrijving &&
                    omschrijving.backgroundColor
                      ? "8px 10px"
                      : undefined,
                }}
              >
                {omschrijving.text.split("\n\n").map((p, j) => (
                  <p key={j} className="mb-3 last:mb-0 text-base">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
