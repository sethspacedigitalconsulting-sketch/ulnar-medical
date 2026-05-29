"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 60;  
const IMG_HEIGHT = 85; 

function FlipCard({ src, index, total, phase, target }: FlipCardProps) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", 
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-[#122954]/40 border border-white/5"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {/* ✅ FIX 3: Correct alt template literal matching syntax boundaries */}
                    <img src={src} alt={`medical-metric-${index}`} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-[#0d1b3e]/20 transition-colors group-hover:bg-transparent" />
                </div>
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-[#080f1e] flex flex-col items-center justify-center p-2 border border-[#FFD43A]/30"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[7px] font-bold text-[#FFD43A] uppercase tracking-widest mb-0.5">Ulnar</p>
                        <p className="text-[9px] font-medium text-white/90">HQ Scan</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

const TOTAL_IMAGES = 20;
const MAX_SCROLL = 2000; 

const MEDICAL_IMAGES = [
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&q=80",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&q=80",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=300&q=80",
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=300&q=80",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&q=80",
    "https://images.unsplash.com/photo-1666887360680-77a83db62cc4?w=300&q=80",
];

{/* ✅ FIX 3: Added missing multiplication * operators back to the linear interpolation equation */}
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export function HeroScrub() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 1200, height: 800 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const handleResize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY * 0.7, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = (touchStartY - touchY) * 1.5; 
            touchStartY = touchY;

            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    const morphProgress = useTransform(virtualScroll, [0, 500], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    const scrollRotate = useTransform(virtualScroll, [500, 2000], [0, 180]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 40);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 400);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 1800);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    const scatterPositions = useMemo(() => {
        return Array.from({ length: TOTAL_IMAGES }, () => ({
            x: (Math.random() - 0.5) * 1200,
            y: (Math.random() - 0.5) * 600,
            rotation: (Math.random() - 0.5) * 120,
            scale: 0.5,
            opacity: 0,
        }));
    }, []);

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unMorph = smoothMorph.on("change", setMorphValue);
        const unRotate = smoothScrollRotate.on("change", setRotateValue);
        const unParallax = smoothMouseX.on("change", setParallaxValue);
        return () => { unMorph(); unRotate(); unParallax(); };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full bg-transparent overflow-hidden pointer-events-auto">
            <div className="relative flex items-center justify-center w-full h-full">
                {Array.from({ length: TOTAL_IMAGES }).map((_, i) => {
                    const src = MEDICAL_IMAGES[i % MEDICAL_IMAGES.length];
                    let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                    if (introPhase === "scatter") {
                        target = scatterPositions[i];
                    } else if (introPhase === "line") {
                        const lineSpacing = 50; 
                        const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                        const lineX = i * lineSpacing - lineTotalWidth / 2;
                        target = { x: lineX, y: -40, rotation: 0, scale: 0.8, opacity: 0.7 };
                    } else {
                        const isMobile = containerSize.width < 768;
                        const minDimension = Math.min(containerSize.width, containerSize.height);

                        const circleRadius = Math.min(minDimension * 0.28, 240);
                        const circleAngle = (i / TOTAL_IMAGES) * 360;
                        const circleRad = (circleAngle * Math.PI) / 180;
                        const circlePos = {
                            x: Math.cos(circleRad) * circleRadius,
                            y: Math.sin(circleRad) * circleRadius - 20,
                            rotation: circleAngle + 90,
                        };

                        const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                        const arcRadius = baseRadius * (isMobile ? 1.3 : 0.95);
                        const arcApexY = containerSize.height * (isMobile ? 0.25 : 0.15);
                        const arcCenterY = arcApexY + arcRadius;

                        const spreadAngle = isMobile ? 80 : 110;
                        const startAngle = -90 - (spreadAngle / 2);
                        const step = spreadAngle / (TOTAL_IMAGES - 1);

                        const scrollProgress = Math.min(Math.max(rotateValue / 180, 0), 1);
                        const maxRotation = spreadAngle * 0.5;
                        const boundedRotation = -scrollProgress * maxRotation;

                        const currentArcAngle = startAngle + (i * step) + boundedRotation;
                        const arcRad = (currentArcAngle * Math.PI) / 180;

                        const arcPos = {
                            x: Math.cos(arcRad) * arcRadius + parallaxValue,
                            y: Math.sin(arcRad) * arcRadius + arcCenterY - (containerSize.height / 2),
                            rotation: currentArcAngle + 90,
                            scale: isMobile ? 1.1 : 1.3,
                        };

                        target = {
                            x: lerp(circlePos.x, arcPos.x, morphValue),
                            y: lerp(circlePos.y, arcPos.y, morphValue),
                            rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                            scale: lerp(0.8, arcPos.scale, morphValue),
                            opacity: lerp(0.8, 0.35, morphValue), 
                        };
                    }

                    return (
                        <FlipCard key={i} src={src} index={i} total={TOTAL_IMAGES} phase={introPhase} target={target} />
                    );
                })}
            </div>
        </div>
    );
}