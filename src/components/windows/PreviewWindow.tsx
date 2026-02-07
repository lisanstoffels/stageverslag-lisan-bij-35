"use client";

import Image from "next/image";
import { useDraggable } from "../../hooks/useDraggable";

type DraggableWindowShellProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  contentClassName?: string;
  titleId?: string;
  initialX?: number;
  initialY?: number;
  width?: number;
  onRequestFocus?: () => void;
  heightContent?: boolean;
};

function DraggableWindowShell({
  title,
  onClose,
  children,
  contentClassName = "flex min-h-0 flex-1 cursor-default flex-col overflow-y-auto px-1 py-6 text-[15px] text-black/90",
  titleId = "preview-window-title",
  initialX,
  initialY,
  width,
  onRequestFocus,
  heightContent = false,
}: DraggableWindowShellProps) {
  const { elementRef, handleMouseDown, style } = useDraggable({
    centerYMultiplier: 1,
    initialPosition:
      initialX != null && initialY != null
        ? { x: initialX, y: initialY }
        : undefined,
  });

  const mergedStyle = width != null ? { ...style, width: `${width}px` } : style;
  const heightClass = heightContent
    ? "h-auto max-h-[500px]"
    : "h-[500px] max-h-[500px]";

  return (
    <div
      ref={elementRef}
      style={mergedStyle}
      className={`z-10 flex w-[min(90%,860px)] min-w-[320px] flex-col overflow-hidden rounded-3xl bg-white/70 p-3 shadow-[0_30px_60px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.12)] backdrop-blur-2xl ${heightClass}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      onClick={(e) => {
        e.stopPropagation();
        onRequestFocus?.();
      }}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl">
        <div
          className="flex shrink-0 cursor-grab active:cursor-grabbing items-center gap-3 bg-black/5 rounded-full px-4 py-2.5 backdrop-blur-xl"
          onMouseDown={handleMouseDown}
        >
          <TrafficLights onClose={onClose} />
          <div className="flex-1 text-center">
            <span
              id={titleId}
              className="text-[13px] font-medium text-black/70"
            >
              {title}
            </span>
          </div>
          <div className="w-[52px]" />
        </div>

        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}

function TrafficLights({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex gap-2">
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="h-[12px] w-[12px] rounded-full bg-red-500 shadow-inner transition hover:bg-red-600 focus:outline-none"
          aria-label="Sluiten"
        />
      ) : (
        <span className="h-[12px] w-[12px] rounded-full bg-red-500 shadow-inner" />
      )}
      <span className="h-[12px] w-[12px] rounded-full bg-yellow-400 shadow-inner" />
      <span className="h-[12px] w-[12px] rounded-full bg-green-500 shadow-inner" />
    </div>
  );
}

type PreviewWindowProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  width?: number;
};

/**
 * Generic draggable preview window.
 * Renders inside the parent element; parent should have position: relative.
 */
export function PreviewWindow({
  title,
  onClose,
  children,
  initialX,
  initialY,
  width,
}: PreviewWindowProps) {
  return (
    <DraggableWindowShell
      title={title}
      onClose={onClose}
      initialX={initialX}
      initialY={initialY}
      width={width}
    >
      {children}
    </DraggableWindowShell>
  );
}

export type MediaItemImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type MediaItemVideo = {
  src: string;
  /** Optionele titel voor het video-venster */
  title?: string;
  /** Breedte van het video-venster in px */
  width?: number;
};

type MediaWindowProps = {
  title: string;
  onClose: () => void;
  /** Photo(s) to display */
  images: MediaItemImage[];
  /** Optional video(s) to display */
  videos?: MediaItemVideo[];
  initialX?: number;
  initialY?: number;
  width?: number;
  /** Called when the window is clicked (e.g. to bring to front) */
  onRequestFocus?: () => void;
};

/**
 * Draggable window for photos and/or video only.
 */
export function MediaWindow({
  title,
  onClose,
  images,
  videos = [],
  initialX,
  initialY,
  width,
  onRequestFocus,
}: MediaWindowProps) {
  return (
    <DraggableWindowShell
      title={title}
      onClose={onClose}
      contentClassName="flex min-h-0 flex-1 cursor-default flex-col overflow-y-auto p-4 text-black/90"
      initialX={initialX}
      initialY={initialY}
      width={width}
      onRequestFocus={onRequestFocus}
      heightContent
    >
      <div className="flex flex-col gap-4">
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {images.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="overflow-hidden rounded-lg bg-white"
              >
                {img.src.toLowerCase().endsWith(".gif") ? (
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={img.width ?? 400}
                    height={img.height ?? 250}
                    className="h-auto w-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width ?? 400}
                    height={img.height ?? 250}
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        {videos.length > 0 && (
          <div className="flex flex-col gap-4">
            {videos.map((v, i) => (
              <div
                key={`${v.src}-${i}`}
                className="overflow-hidden rounded-lg border border-black/10 bg-black"
              >
                <video
                  src={v.src}
                  controls
                  className="w-full max-h-[360px] object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </DraggableWindowShell>
  );
}

type TextWindowProps = {
  title: string;
  onClose: () => void;
  /** Text content only (paragraphs, lists, etc.) */
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  width?: number;
  /** Called when the window is clicked (e.g. to bring to front) */
  onRequestFocus?: () => void;
};

/**
 * Draggable window for text only.
 */
export function TextWindow({
  title,
  onClose,
  children,
  initialX,
  initialY,
  onRequestFocus,
  width,
}: TextWindowProps) {
  return (
    <DraggableWindowShell
      title={title}
      onClose={onClose}
      initialX={initialX}
      initialY={initialY}
      width={width}
      onRequestFocus={onRequestFocus}
    >
      <div className="space-y-4 leading-relaxed max-w-[65ch]">{children}</div>
    </DraggableWindowShell>
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
          className="overflow-hidden rounded-lg bg-white w-full flex items-center justify-center"
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
