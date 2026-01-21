"use client";

import { useDraggable } from "@/src/hooks/useDraggable";

interface DraggableProps {
  children: React.ReactNode;
  className?: string;
}

export function Draggable({ children, className = "" }: DraggableProps) {
  const { elementRef, handleMouseDown, style } = useDraggable();

  return (
    <div ref={elementRef} onMouseDown={handleMouseDown} style={style} className={className}>
      {children}
    </div>
  );
}
