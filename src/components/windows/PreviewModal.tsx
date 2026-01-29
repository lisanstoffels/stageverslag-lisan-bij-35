"use client";

import Image from "next/image";
import { useDraggable } from "../../hooks/useDraggable";

type PreviewModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function PreviewModal({ title, onClose, children }: PreviewModalProps) {
  const { elementRef, handleMouseDown, style } = useDraggable({
    centerYMultiplier: 1,
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={elementRef}
        style={{ ...style }}
        className="flex h-[min(85vh,700px)] w-[min(90vw,800px)] flex-col overflow-hidden rounded-[12px] bg-[#f5f5f7] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-modal-title"
      >
        <div
          className="flex shrink-0 cursor-grab active:cursor-grabbing items-center gap-3 border-b border-black/8 bg-[#ebebeb] px-4 py-2.5"
          onMouseDown={handleMouseDown}
        >
          <TrafficLights onClose={onClose} />
          <div className="flex-1 text-center">
            <span
              id="preview-modal-title"
              className="text-[13px] font-medium text-black/80"
            >
              {title}
            </span>
          </div>
          <div className="w-[52px]" />
        </div>

        <div className="flex-1 cursor-default overflow-y-auto p-6 text-[15px] text-black/90">
          {children}
        </div>
      </div>
    </div>
  );
}

function TrafficLights({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex gap-1.5">
      <button
        type="button"
        onClick={onClose}
        className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] shadow-inner transition hover:bg-[#ff4b43]"
        aria-label="Sluiten"
      />
      <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-inner" />
      <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-inner" />
    </div>
  );
}

export function PreviewText({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 leading-relaxed">{children}</div>;
}

export function PreviewImages({
  srcs,
  alts,
  widths = 400,
  heights = 250,
}: {
  srcs: string[];
  alts: string[];
  widths?: number | number[];
  heights?: number | number[];
}) {
  const w = Array.isArray(widths) ? widths : srcs.map(() => widths);
  const h = Array.isArray(heights) ? heights : srcs.map(() => heights);
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {srcs.map((src, i) => (
        <div
          key={src}
          className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm"
        >
          <Image
            src={src}
            alt={alts[i] ?? "Afbeelding"}
            width={w[i] ?? 400}
            height={h[i] ?? 250}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
