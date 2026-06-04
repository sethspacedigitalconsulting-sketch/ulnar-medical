"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InfiniteSliderProps {
  children?: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentDuration(duration);
  }, [duration]);

  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        WebkitMaskImage: isHorizontal
          ? "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          : "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        maskImage: isHorizontal
          ? "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          : "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
      }}
      onMouseEnter={() => {
        if (durationOnHover) setCurrentDuration(durationOnHover);
      }}
      onMouseLeave={() => {
        setCurrentDuration(duration);
      }}
    >
      <div
        ref={innerRef}
        className={cn(
          "flex w-max",
          isHorizontal ? "flex-row" : "flex-col",
          reverse
            ? isHorizontal
              ? "animate-infinite-slider-reverse"
              : "animate-infinite-slider-vertical-reverse"
            : isHorizontal
            ? "animate-infinite-slider"
            : "animate-infinite-slider-vertical"
        )}
        style={{
          gap: `${gap}px`,
          animationDuration: `${currentDuration}s`,
          willChange: "transform",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

interface InfiniteParallaxSliderProps {
  children?: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
}

export function InfiniteParallaxSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteParallaxSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentDuration(duration);
  }, [duration]);

  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        WebkitMaskImage: isHorizontal
          ? "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          : "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        maskImage: isHorizontal
          ? "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          : "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
      }}
      onMouseEnter={() => {
        if (durationOnHover) setCurrentDuration(durationOnHover);
      }}
      onMouseLeave={() => {
        setCurrentDuration(duration);
      }}
    >
      <div
        ref={innerRef}
        className={cn(
          "flex w-max",
          isHorizontal ? "flex-row" : "flex-col",
          reverse
            ? isHorizontal
              ? "animate-infinite-slider-reverse"
              : "animate-infinite-slider-vertical-reverse"
            : isHorizontal
            ? "animate-infinite-slider"
            : "animate-infinite-slider-vertical"
        )}
        style={{
          gap: `${gap}px`,
          animationDuration: `${currentDuration}s`,
          willChange: "transform",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
