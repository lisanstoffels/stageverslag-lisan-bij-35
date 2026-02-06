import NotesWindow from "../components/windows/NotesWindow";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <div className="m-5 relative overflow-hidden rounded-2xl h-[600px] bg-light-blue">
        <Image
          src="/images/bg-images/goldenway_mat.png"
          width={1000}
          height={400}
          alt="Goldenway cutting mat"
          className="w-full h-full object-cover mix-blend-screen pointer-events-none"
        />
        <Image
          src="/images/paper/card_serrated-edges.png"
          width={488}
          height={488}
          alt="Paper with serrated edges"
          className="absolute -top-40 -left-20 pointer-events-none"
        />
        <Image
          src="/images/paper/ticket_green.png"
          width={200}
          height={125}
          alt="Green ticket"
          className="absolute -top-10 left-10 pointer-events-none"
        />
        <Image
          src="/images/paper/lined_paper-white.png"
          width={550}
          height={700}
          alt="Lined paper"
          className="absolute -bottom-50 -left-20 pointer-events-none"
        />
        <Image
          src="/images/paper/squared-paper.png"
          width={600}
          height={400}
          alt="Squared lined paper"
          className="absolute top-20 -right-40 pointer-events-none"
        />
        <Image
          src="/images/paper/rough_paper_square.png"
          width={400}
          height={300}
          alt="Rough paper"
          className="absolute -bottom-20 right-10 pointer-events-none"
        />
        <Image
          src="/images/rommel/potlood.png"
          width={400}
          height={300}
          alt="potlood"
          className="absolute -bottom-20 left-5 pointer-events-none"
        />
        <Image
          src="/images/rommel/schaar.png"
          width={400}
          height={300}
          alt="schaar"
          className="absolute top-0 right-50 pointer-events-none"
        />
        <NotesWindow />
      </div>
    </>
  );
}
