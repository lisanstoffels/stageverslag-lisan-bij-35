import { SchilderijCarousel } from "../../components/SchilderijCarousel";

export default function ReflectionPage() {
  return (
    <div className="relative">
      <div className="mx-auto w-6/10 max-w-250 pb-11 pt-15 text-4xl">
        <h2>
          Wat ik heb <b>opgepikt</b> in de branche: inzichten en
          beroepsvaardigheden die ik meeneem in mijn verdere carrière.
        </h2>
      </div>
      <SchilderijCarousel />
    </div>
  );
}
