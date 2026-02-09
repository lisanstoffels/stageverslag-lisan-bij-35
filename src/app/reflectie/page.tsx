import { SchilderijCarousel } from "../../components/SchilderijCarousel";

export default function ReflectionPage() {
  return (
    <>
      <div className="relative">
        <div className="mx-auto w-6/10 max-w-250 pb-11 pt-15 text-4xl">
          <h2>
            Wat ik heb <b>opgepikt</b> in de branche: inzichten en
            beroepsvaardigheden die ik meeneem in mijn verdere carrière.
          </h2>
        </div>
        <SchilderijCarousel />
      </div>
      <div
        className="mx-auto w-full max-w-4xl mt-24"
        style={{ padding: "56.25% 0 0 0", position: "relative" }}
      >
        <iframe
          src="https://player.vimeo.com/video/1161599816?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          title="Stage bij 35® - Lisan Stoffels"
        />
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </>
  );
}
