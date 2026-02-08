import Image from "next/image";
import { PolaroidCarousel } from "../../components/PolaroidCarousel";

export default function AboutPage() {
  return (
    <div className="relative min-h-full">
      <div className="mx-auto w-6/10 max-w-250 pb-11 pt-15 text-4xl">
        <h2>
          We are an <b>AI-driven digital agency</b> that helps organizations
          innovate through AI, design and engineering. From rapid prototypes
          that validate ideas to long-term collaborations with embedded teams we
          turn research into direction, direction into product, and product into
          progress.
        </h2>
      </div>
      <PolaroidCarousel />
      <div className="mx-auto max-w-4xl px-4 pb-18 pt-20 relative">
        <div className="relative">
          <div className="relative mx-auto w-full max-w-3xl overflow-hidden aspect-11/9">
            <Image
              src="/images/paper/groot_papier.png"
              alt=""
              fill
              className="object-contain "
            />
            <div className="absolute flex flex-col justify-center px-[12%] py-[14%] text-left">
              <h2 className="my-6 pt-6 text-xl font-semibold tracking-tight text-black/90 ">
                Hoe ben ik beland bij 35®?
              </h2>
              <div className="space-y-2 text-[15px] leading-relaxed text-black/85">
                <p>
                  Ik twijfel veel, vooral over mijn stagekeuze. Design of
                  development? Ik zag mezelf beide rollen vervullen, maar
                  bedrijven zoeken stagiaires met één focus. Gelukkig heb ik af
                  en toe nog wel eens een helder moment, en realiseerde ik dat
                  ik te veel twijfelde. Ik besloot gewoon te gaan zoeken, en
                  merkte al snel dat ik vooral naar development vacatures keek.
                  De keuze was onbewust al gemaakt.
                </p>
                <p>
                  De CMD stagemarkt was erg fijn, omdat er allemaal bedrijven
                  uit de regio aanwezig waren, die ook nog eens bekend waren met
                  de opleiding die ik nu doe. Mijn portfolio website maakte
                  indruk (gelukkig maar, ik had er ook veel werk in gestoken!),
                  en een week later had ik al een gesprek bij 35.
                </p>
                <p>
                  Ik was één van de vijf kandidaten. Het proces was rigoureus:
                  naast het tonen van projecten moest ik ook probleemcode
                  oplossen. Het leek boven mijn niveau, maar ik durfde de
                  uitdaging wel aan!
                </p>
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-1/2 w-[290px] -translate-y-1/2 -translate-x-[55%]">
            <Image
              src="/images/polaroids/polaroid_lisan.png"
              alt="Ik"
              width={290}
              height={330}
              className="block w-full object-cover"
            />
          </div>
        </div>
      </div>
      <Image
        src="/images/rommel/sterretjes.png"
        alt=""
        width={300}
        height={400}
        className="absolute -right-10 bottom-0 pointer-events-none rotate-280"
      />
    </div>
  );
}
