const fs = require('fs');
const path = require('path');

const filePath = path.join(
  'C:\\Users\\MS29\\OneDrive\\Desktop\\Antigravity IDE projects\\ulnar-medical',
  'src', 'components', 'ui', 'vertical-image-stack.tsx'
);

const content = `"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface StackItem {
  src: string;
  alt: string;
}

interface VerticalImageStackProps {
  items?: StackItem[];
  className?: string;
}

const defaultItems: StackItem[] = [
  { src: "/leadC.jpg", alt: "Ulnar Medical clinic" },
  { src: "/leadB.jpg", alt: "Diagnostic equipment" },
  { src: "/leadA.jpg", alt: "Medical team" },
];

export function VerticalImageStack({
  items = defaultItems,
  className,
}: VerticalImageStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center gap-4 py-8",
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="relative w-full max-w-sm overflow-hidden rounded-2xl shadow-lg"
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>
  );
}

export default VerticalImageStack;
`;

fs.writeFileSync(filePath, content, { encoding: 'utf8' });
console.log('vertical-image-stack.tsx written successfully (UTF-8)');