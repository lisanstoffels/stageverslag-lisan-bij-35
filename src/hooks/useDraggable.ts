"use client";

import { useState, useRef, useEffect } from "react";

export type UseDraggableOptions = {
  centerYMultiplier?: number;
  /** Keep the element within its parent bounds when dragging (default: false) */
  containWithinParent?: boolean;
  /** Initial position (x, y) in pixels relative to container. If set, window won't auto-center. */
  initialPosition?: { x: number; y: number };
};

export function useDraggable(options?: UseDraggableOptions) {
  const centerYMultiplier = options?.centerYMultiplier ?? 4;
  const containWithinParent = options?.containWithinParent ?? false;
  const initialPosition = options?.initialPosition;
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    initialPosition ?? null
  );
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Calculate initial centered position only when no initialPosition was provided
    if (initialPosition == null && position === null && elementRef.current) {
      const element = elementRef.current;
      const container = element.parentElement;

      if (container) {
        const timer = setTimeout(() => {
          const containerRect = container.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();

          const centerX = (containerRect.width - elementRect.width) / 2;
          const centerY = (containerRect.height - elementRect.height) / 2;

          setPosition({ x: centerX, y: centerY * centerYMultiplier });
        }, 10);

        return () => clearTimeout(timer);
      }
    }
  }, [position, centerYMultiplier, initialPosition]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      const container = elementRef.current.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const elementRect = elementRef.current.getBoundingClientRect();

      setPosition((prev) => {
        if (!prev) return prev;
        let x = e.clientX - containerRect.left - dragStart.current.x;
        let y = e.clientY - containerRect.top - dragStart.current.y;
        if (containWithinParent) {
          x = Math.max(0, Math.min(x, containerRect.width - elementRect.width));
          y = Math.max(
            0,
            Math.min(y, containerRect.height - elementRect.height)
          );
        }
        return { x, y };
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (position === null || !elementRef.current) return;
    const container = elementRef.current.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - containerRect.left - position.x,
      y: e.clientY - containerRect.top - position.y,
    };
  };

  return {
    elementRef,
    position,
    handleMouseDown,
    style: {
      position: "absolute" as const,
      left: position ? `${position.x}px` : "50%",
      top: position ? `${position.y}px` : "80%",
      transform: position ? "none" : "translate(-50%, -50%)",
      cursor: isDragging ? "grabbing" : "grab",
    },
  };
}
