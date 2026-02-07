"use client";

import React from "react";
import type {
  MediaItemImage,
  MediaItemVideo,
} from "../components/windows/PreviewWindow";

export type ProjectId = "twitter" | "sev" | "bose" | null;

export type DescriptionBlock = { title: string; content: React.ReactNode };

export const PROJECTS: {
  id: ProjectId;
  folderSrc: string;
  folderAlt: string;
  title: string;
  description?: React.ReactNode;
  descriptionBlocks?: DescriptionBlock[];
  images?: MediaItemImage[];
  videos?: MediaItemVideo[];
  /** Toon een apart media-venster voor images (bijv. GIFs). Alleen bij projecten met descriptionBlocks. */
  mediaWindow?: boolean;
}[] = [
  {
    id: "twitter",
    folderSrc: "/images/folders/twitter-clone.png",
    folderAlt: "projectfolder: twitter clone",
    title: "Twitter Clone",
    descriptionBlocks: [
      {
        title: "Het eerste project",
        content: (
          <div className="space-y-4 text-left">
            <p>
              Ik ben inmiddels al de 3e stagiaire hier bij 35, en dit zal dus
              geen verrassing zijn: ik heb net als de vorige twee stagiaires,
              Driek en Sem, een twitter clone mogen nabouwen. Hier heb ik de
              eerste twee weken van mijn stagetijd de ruimte voor gekregen. Het
              doel was kennismaking met de workflow van de devs en de frameworks
              die ze hier gebruiken.
            </p>
            <p>
              Tijdens dit project heb ik geleerd hoe je met een database werkt,
              hoe je schema&apos;s voor tables aanmaakt en deze aan elkaar
              linkt. Ook heb ik ervaring opgedaan met het vullen van de database
              via HTTP put requests en het ophalen van data naar de frontend via
              fetch en get requests. Daarnaast kwam ik in aanraking met het
              maken van cookies en het bijhouden van sessies.
            </p>
          </div>
        ),
      },
      {
        title: "HTTP, requests & Fetch",
        content: (
          <div className="space-y-4 text-left">
            <p>
              <strong>HTTP</strong> (HyperText Transfer Protocol) is het
              protocol, ofwel de taal, die computers gebruiken om met elkaar te
              praten op het internet. Als jij een website bezoekt, stuurt jouw
              browser een verzoek (request) naar een server, en die stuurt iets
              terug.
            </p>
            <p>
              <strong>GET en PUT</strong> zijn twee verschillende soorten
              verzoeken:
            </p>
            <ul className="list-inside list-disc space-y-1 pl-2">
              <li>
                <strong>GET</strong>: &quot;Hey server, geef me wat
                informatie.&quot; Bijvoorbeeld: als je op Twitter scrollt,
                stuurt je browser GET-verzoeken om tweets op te halen.
              </li>
              <li>
                <strong>PUT</strong>: &quot;Hey server, hier is nieuwe
                informatie die je moet opslaan of vervangen.&quot; Bijvoorbeeld:
                als je een tweet post, stuur je een PUT-verzoek om die tweet in
                de database te zetten.
              </li>
            </ul>
            <p>
              <strong>Fetch</strong> is de JavaScript-functie die je gebruikt om
              deze verzoeken te versturen vanuit je code. Het is eigenlijk het
              telefoontje dat je pleegt naar de server. Ik heb geleerd om dit
              altijd met een <em>try-catch functie</em> te doen. Het doet
              letterlijk wat het zegt: de functie probeert met de database te
              communiceren, en als dit niet lukt, vangt hij de error op.
            </p>
            <pre className="overflow-x-auto rounded bg-black/8 px-3 py-2 font-mono text-[13px] leading-relaxed">
              <code>{`// Ophalen van data (GET)
try {
  const response = await fetch('/api/tweets');
  const data = await response.json();
} catch (error) {
  console.error('Er ging iets mis bij het ophalen van tweets:', error);
}

// Versturen van data (PUT)
try {
  const response = await fetch('/api/tweets', { 
    method: 'PUT', 
    body: JSON.stringify(mijnTweet) 
  });
  const data = await response.json();
} catch (error) {
  console.error('Er ging iets mis bij het versturen van de tweet:', error);
}`}</code>
            </pre>
          </div>
        ),
      },
      {
        title: "Database & SQL",
        content: (
          <div className="space-y-3 text-left">
            <p>
              Een <strong>database</strong> is eigenlijk een georganiseerde
              verzameling van data: je kunt het zien als een digitale
              archiefkast met laden en mapjes. <strong>Lokaal</strong> betekent
              dat deze database op je eigen computer draait (niet in de cloud).
              Tijdens development is dat handig: je kunt testen zonder dat het
              echte data beïnvloedt.
            </p>
            <p>Bij het opzetten maak je:</p>
            <ol className="list-inside list-decimal space-y-1 pl-2">
              <li>
                <strong>Schema's</strong>: code die je zelf moet schrijven om je
                data-structuur te definiëren. Je bepaalt bijvoorbeeld: &quot;Een
                gebruiker heeft een naam (tekst), een email (tekst) en een
                geboortedatum (datum).&quot;
              </li>
              <li>
                <strong>Tabellen</strong>: dit zijn de daadwerkelijke tabellen
                waar je data in stopt. Bijvoorbeeld een Users-tabel en een
                Tweets-tabel.
              </li>
              <li>
                <strong>Relaties</strong>: hoe dingen met elkaar verbonden zijn.
                Bijvoorbeeld: &quot;Elke tweet hoort bij één gebruiker.&quot;
              </li>
            </ol>
            <p>
              Databases gebruiken <strong>SQL</strong> (Structured Query
              Language) om data op te slaan en op te halen. Je kunt direct
              SQL-queries schrijven, maar dat is complex en foutgevoelig. Daarom
              heb ik gewerkt met <strong>ORM&apos;s</strong> zoals Drizzle en
              Prisma. Deze tools vertalen gewone JavaScript-code automatisch
              naar SQL, waardoor je niet hoeft te worstelen met ingewikkelde
              database-queries.
            </p>
          </div>
        ),
      },
      {
        title: "Authenticatie",
        content: (
          <div className="space-y-3 text-left">
            <p>
              <strong>Authenticatie</strong> betekent controleren wie iemand is
              — het digitale equivalent van je ID-kaart laten zien. Hoe het
              werkt:
            </p>
            <ol className="list-inside list-decimal space-y-1 pl-2">
              <li>
                <strong>Inloggen</strong>: Je typt je email en wachtwoord in.
              </li>
              <li>
                <strong>Verificatie</strong>: De server controleert of die
                combinatie klopt met wat er in de database staat.
              </li>
              <li>
                <strong>Cookie/sessie aanmaken</strong>: Als het klopt, krijg je
                een digitaal pasje (een <strong>cookie</strong>) dat in je
                browser wordt opgeslagen. Een <strong>sessie</strong> is de
                periode waarin dat pasje geldig is.
              </li>
              <li>
                <strong>Bij elk verzoek</strong>: Als je nu naar een andere
                pagina gaat of iets wilt doen, stuurt je browser dat pasje
                automatisch mee. De server checkt: &quot;Oké, dit pasje is
                geldig, dus deze persoon mag hier zijn.&quot;
              </li>
            </ol>
            <pre className="overflow-x-auto rounded bg-black/8 px-3 py-2 font-mono text-[12px] leading-relaxed">
              <code>{`import { cookies as getCookies } from "next/headers";
import { redirect } from "next/navigation";
import { seeIfSessionValid } from "@/lib/server/session";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookies = await getCookies();
  const sessionToken = cookies.get("session_token");

  if (sessionToken) {
    const session = await seeIfSessionValid(sessionToken.value);
    if (session) redirect("/");
  }

  return (
    <div className="mx-auto flex h-auto w-9/10 max-w-none lg:max-w-[1500px]">
      <main className="mx-auto w-1/2">{children}</main>
    </div>
  );
}`}</code>
            </pre>
          </div>
        ),
      },
    ],
    videos: [
      { src: "/videos/twt-cl_inlog.mov", title: "Inloggen" },
      { src: "/videos/twt-cl_tour.mov", title: "Rondleiding" },
    ],
  },
  {
    id: "sev",
    folderSrc: "/images/folders/sev-app.png",
    folderAlt: "projectfolder: sevagram app",
    title: "Sevagram App",
    descriptionBlocks: [
      {
        title: "Intro & React Native",
        content: (
          <div className="space-y-4 text-left">
            <p>
              <a
                href="https://www.sevagram.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Sevagram
              </a>{" "}
              liep tegen een nieuwsoverload-probleem aan: SharePoint, website,{" "}
              <em>sevaflits</em>, locatie-specifieke updates… Niemand wist meer
              waar ze moesten zoeken. De oplossing? Een app die alles bundelt.
            </p>
            <p>
              De app is met <strong>React Native</strong> gemaakt, een vorm van
              React die React code omzet in een apptaal. De syntax was ietsjes
              anders dan ik gewend was, maar de logica was hetzelfde. En het
              mooiste: je schrijft de code één keer, en hij runt on Android én
              iOS.
            </p>
            <div>
              <p>Ik heb mogen werken aan:</p>
              <ul className="list-inside list-disc space-y-2 pt-2 pl-2">
                <li>
                  <strong>Front-end</strong>: Het &quot;final&quot; design
                  pixel-perfect nabouwen.
                </li>
                <li>
                  <strong>Back-end</strong>: Artikelen gefetcht en gesorteerd,
                  locaties beheerd.
                </li>
                <li>
                  <strong>Design</strong>: Onboarding- en inlogschermen in Figma
                  gemaakt, compleet met animaties, components en auto-layouts.
                </li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        title: "Styling per Platform",
        content: (
          <div className="space-y-4 text-left">
            <p>
              Met <code>Platform.OS</code> kun je checken op welk platform de
              app draait en zo platform-specifieke styling toepassen (bijv.
              verschillende gradients of kleuren voor iOS vs Android).
            </p>
            <pre className="overflow-x-auto rounded bg-black/8 px-3 py-2 font-mono text-[11px] leading-relaxed">
              <code>{`import { Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

{Platform.OS === "android" && (
  <LinearGradient
    colors={headerGradientColors}
    locations={[0.4, 0.85, 1]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={{ position: "absolute", inset: 0 }}
  />
)}
{Platform.OS === "ios" && (
  <LinearGradient ... />
)}`}</code>
            </pre>
          </div>
        ),
      },
      {
        title: "Markdown rendering",
        content: (
          <div className="space-y-4 text-left">
            <p>
              Voor de artikelpagina&apos;s is er een custom markdown renderer
              gebouwd. Ik heb op elk via een api binnenkomend markdown element
              (heading, strong, paragraph) styling toegepast.
            </p>
            <pre className="overflow-x-auto rounded bg-black/8 px-3 py-2 font-mono text-[11px] leading-relaxed">
              <code>{`function Markdown({ markdown }: { markdown: string }) {
  const { colorScheme } = useColorScheme();
  return (
    <MarkdownPrimitive
      rules={{
        heading3: (node, children, ...) => (
          <ThemedText variant="xl" ...>{children}</ThemedText>
        ),
        strong: (node, children, parent, styles) => (
          <ThemedText variant={...} style={...}>{children}</ThemedText>
        ),
        paragraph: (node, children, ...) => (
          <ThemedText variant="lg" ...>{children}</ThemedText>
        ),
      }}
    >
      {markdown}
    </MarkdownPrimitive>
  );
}`}</code>
            </pre>
          </div>
        ),
      },
    ],
    videos: [
      { src: "/videos/sev-app_tour.mp4", title: "App tour", width: 350 },
      { src: "/videos/sev-app_zoeken.mp4", title: "Zoeken", width: 350 },
    ],
  },
  {
    id: "bose",
    folderSrc: "/images/folders/bose.png",
    folderAlt: "projectfolder: bose",
    title: "Bose",
    descriptionBlocks: [
      {
        title: "Emails, emails, en nog meer emails",
        content: (
          <div className="space-y-4 text-left">
            <p>
              Ik heb voor de{" "}
              <a
                href="https://www.bose.com/home?srsltid=AfmBOoqBvDgLsu8QEkw-1LkH80BVgzQM7703v9HIyUNE9E7g0i_s3Q1q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Bose corporation
              </a>{" "}
              mogen meewerken in het email-team. Alles liep asynchroon vanwege
              het tijdsverschil met Amerika, dus het was veel zelfstandig
              werken. Het betrof zowel email design (binnen de kaders van het
              CRM) in Figma als het &quot;coderen&quot; van de mails in de
              salesforce content builder.
            </p>
            <p>
              Ik vond het verrassend hoe gestructureerd zo&apos;n groot merk te
              werk gaat. Elke mail doorloopt vaste stappen en moet aan strikte
              huisstijl en toegankelijkheidseisen voldoen.
            </p>
          </div>
        ),
      },
      {
        title: "Email design",
        content: (
          <div className="space-y-4 text-left">
            <p>
              Als ik een design moest maken ging dat via een word bestand die de
              copywriters hadden geschreven. Afhankelijk van het type bericht
              wist je ook welke stijl de email moest hebben: refurbished is
              groen, sale is grijs. Europa heeft weer andere afbeeldingen en
              fontstijl. Heel cookie cutter.
            </p>
            <p>
              Wat wel heel tof was was dat ik net voor het holiday season ben
              begonnen. Tijdens de holiday was het tijd voor speciale marketing,
              en daar kwamen nieuwe designs bij kijken. De uitingen waren
              gericht op drie verschillende typen luisteraars, met het thema
              metal, dance en country. Compleet met eigen beeldmateriaal en
              kleurenpaletten, was er wat meer ruimte om te spelen vergeleken
              met &quot;normaal&quot;.
            </p>
            <p>
              Ze hadden nog holiday GIFs nodig, en ik dacht: yesss, dat kan ik
              wel doen. Ik heb twee hele dagen heel veel plezier gehad in After
              Effects: ik heb zo&apos;n tien gifje gemaakt waarin teksten en
              afbeeldingen verschijnen, draaien en vervormen. Ik had niet
              gedacht dat de skill After Effects van school zó snel van pas zou
              komen!
            </p>
          </div>
        ),
      },
      {
        title: "Authoring",
        content: (
          <div className="space-y-4 text-left">
            <p>
              Ik heb het meeste aan de authoring gewerkt. Aan de hand van het
              email design in Figma moest ik de email opzetten in Salesforce.{" "}
              <a
                href="https://www.salesforce.com/eu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Salesforce
              </a>{" "}
              is een CRM systeem waar Bose alle emails met HTML opzet. Maar niet
              de HTML die ik ken, de HTML die Will kent. Er bestaat in
              Salesforce geen flexbox. Alles is met tables{" "}
              <code className="rounded bg-black/10 px-1">tr</code>,{" "}
              <code className="rounded bg-black/10 px-1">td</code>, etc. naast
              elkaar gezet. Ik wist dus niet dat mensen dit vroeger zo moesten
              doen. What the helly.
            </p>
            <p>
              Email authoring gaat snel omdat je vooraf gemaakte blokken
              gebruikt. Salesforce heeft templates met variabelen die je
              aanpast:
            </p>
            <pre className="overflow-x-auto rounded bg-black/8 px-3 py-2 font-mono text-[12px] leading-relaxed">
              <code>{`<!-- Variabelen instellen -->
set @backgroundColor = '#012F52'
set @textColor = '#9EEDFF'
set @productID = 'c/holiday-sale'

<!-- Table met dynamische kleuren -->
<table bgcolor="%%=v(@backgroundColor)=%%" width="100%">
  <tr>
    <td style="color: %%=v(@textColor)=%%">
      Get up to 45% off during our New Year's Sale!
    </td>
  </tr>
</table>`}</code>
            </pre>
            <p>
              De workflow: Design in Figma → Blok kiezen in Salesforce →
              Variabelen aanpassen (kleuren, tekst, URLs) → Testen. Geen
              flexbox, alles met nested tables. Old school, maar het werkt.
            </p>
          </div>
        ),
      },
    ],
    mediaWindow: true,
    images: [
      {
        src: "/videos/country-theme_horses.gif",
        alt: "Country theme – horses",
        width: 300,
        height: 200,
      },
      {
        src: "/videos/dance-theme_flickering.gif",
        alt: "Dance theme – flickering",
        width: 300,
        height: 200,
      },
      {
        src: "/videos/metal-theme_text_melt.gif",
        alt: "Metal theme – text melt",
        width: 300,
        height: 200,
      },
    ],
    videos: [
      {
        src: "/videos/bose-content_blocks.mov",
        title: "Content blocks",
      },
    ],
  },
];
