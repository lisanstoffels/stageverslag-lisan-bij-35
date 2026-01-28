"use client";

import { useState, useRef, useEffect } from "react";

export function useDraggable() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Calculate initial centered position
    if (position === null && elementRef.current) {
      const element = elementRef.current;
      const container = element.parentElement;
      
      if (container) {
        // Use a small delay to ensure layout is complete
        const timer = setTimeout(() => {
          const containerRect = container.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          
          const centerX = (containerRect.width - elementRect.width) / 2;
          const centerY = (containerRect.height - elementRect.height) / 2;
          
          setPosition({ x: centerX, y: centerY * 4 });
        }, 10);
        
        return () => clearTimeout(timer);
      }
    }
  }, [position]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      const container = elementRef.current.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      
      setPosition((prev) => {
        if (!prev) return prev;
        return {
          x: e.clientX - containerRect.left - dragStart.current.x,
          y: e.clientY - containerRect.top - dragStart.current.y,
        };
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
