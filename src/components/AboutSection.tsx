"use client";

import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { ShieldCheck, Award, Heart, Star, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── SPECIALISTS BRAND DATA MATRICES ──
interface Specialist {
  id: number;
  name: string;
  role: string;
  title: string;
  bio: string;
  image: string;
}

const CLINICAL_ROSTER: Specialist[] = [
  {
    id: 1,
    name: "Dr. Elizabeth Odondi",
    role: "Lead Consultant Radiologist",
    title: "Chief of Diagnostic Imaging",
    bio: "Senior Consultant Radiologist specializing in high-fidelity pelvic mapping, ultrasound-guided interventional tracking arrays, and advanced diagnostic reporting frameworks.",
    image: "/images/DrElizabeth.jpg"
  },
  {
    id: 2,
    name: "Dr. Cyprian Michieka",
    role: "Board-Certified OB/GYN Specialist",
    title: "Fellow in Maternal-Fetal Medicine",
    bio: "Elite maternal-fetal medical practitioner dedicated to pre-conception screening arrays, detailed 3D/4D anatomical anomaly tracking, and fetal echoes.",
    image: "/images/clinician-2.jpg"
  }
];

// ── THREE.JS CUSTOM SHADER DECLARATION ──
const createClothMaterial = () => {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        float curveIntensity = scrollForce * 0.3;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        
        pos.z -= (curve + clothEffect + flagWave);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
};

interface PlaneData {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number;
}

function ImagePlane({
  texture,
  position,
  scale,
  material,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: [number, number, number];
  material: THREE.ShaderMaterial;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (material && texture) material.uniforms.map.value = texture;
  }, [material, texture]);

  useEffect(() => {
    if (material && material.uniforms) material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
  }, [material, isHovered]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      material={material}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
}

function GalleryScene({
  images,
  onFocusedImageChange,
}: {
  images: string[];
  onFocusedImageChange: (index: number) => void;
}) {
  const { size } = useThree();
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const visibleCount = 8;
  const depthRange = 50;

  const textures = useTexture(images);
  const materials = useMemo(() => Array.from({ length: visibleCount }, () => createClothMaterial()), []);

  const spatialPositions = useMemo(() => {
    const positions: { x: number; y: number }[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const hAngle = (i * 2.618) % (Math.PI * 2);
      const vAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
      const hRadius = (i % 3) * 1.1;
      const vRadius = ((i + 1) % 4) * 0.7;
      positions.push({
        x: (Math.sin(hAngle) * hRadius * 8) / 3,
        y: (Math.cos(vAngle) * vRadius * 8) / 4
      });
    }
    return positions;
  }, []);

  const planesData = useRef<PlaneData[]>(
    Array.from({ length: visibleCount }, (_, i) => ({
      index: i,
      z: ((depthRange / visibleCount) * i) % depthRange,
      imageIndex: i % images.length,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }))
  );

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    setScrollVelocity((prev) => prev + event.deltaY * 0.008);
  }, []);

  useEffect(() => {
    const canvas = document.querySelector("#specialist-canvas canvas");
    if (canvas) {
      canvas.addEventListener("wheel", handleWheel as any, { passive: false });
      return () => canvas.removeEventListener("wheel", handleWheel as any);
    }
  }, [handleWheel]);

  useFrame((state, delta) => {
    // Continuous smooth autoplay loop
    setScrollVelocity((prev) => (prev + 0.15 * delta) * 0.96);

    const time = state.clock.getElapsedTime();
    materials.forEach((mat) => {
      if (mat.uniforms) {
        mat.uniforms.time.value = time;
        mat.uniforms.scrollForce.value = scrollVelocity;
      }
    });

    let closestPlaneIdx = 0;
    let minDistanceToFocus = Infinity;

    planesData.current.forEach((plane, i) => {
      let newZ = plane.z + scrollVelocity * delta * 12;

      if (newZ >= depthRange) {
        newZ -= depthRange;
        plane.imageIndex = (plane.imageIndex + 1) % images.length;
      } else if (newZ < 0) {
        newZ += depthRange;
        plane.imageIndex = (plane.imageIndex - 1 + images.length) % images.length;
      }

      plane.z = newZ;
      const worldZ = plane.z - depthRange / 2;

      // Track center focus node for profile text synchronization
      const distanceToFocus = Math.abs(worldZ + 10);
      if (distanceToFocus < minDistanceToFocus) {
        minDistanceToFocus = distanceToFocus;
        closestPlaneIdx = plane.imageIndex;
      }

      // Shader fading thresholds logic
      const normPos = plane.z / depthRange;
      let opacity = 1;
      if (normPos < 0.15) opacity = normPos / 0.15;
      else if (normPos > 0.85) opacity = 1 - (normPos - 0.85) / 0.15;

      let blur = 0;
      if (normPos < 0.1) blur = 4.0 * (1 - normPos / 0.1);
      else if (normPos > 0.8) blur = 4.0 * ((normPos - 0.8) / 0.2);

      if (materials[i].uniforms) {
        materials[i].uniforms.opacity.value = THREE.MathUtils.clamp(opacity, 0, 1);
        materials[i].uniforms.blurAmount.value = THREE.MathUtils.clamp(blur, 0, 4);
      }
    });

    state.clock.getElapsedTime();
    if (time % 0.5 < 0.02) {
      onFocusedImageChange(closestPlaneIdx);
    }
  });

  return (
    <>
      {planesData.current.map((plane, i) => {
        const texture = textures[plane.imageIndex];
        const material = materials[i];
        if (!texture || !material) return null;

        const worldZ = plane.z - depthRange / 2;
        const scale: [number, number, number] = [2.2, 3.0, 1];

        return (
          <ImagePlane
            key={plane.index}
            texture={texture}
            position={[plane.x, plane.y, worldZ]}
            scale={scale}
            material={material}
          />
        );
      })}
    </>
  );
}

// ── MAIN CORE ABOUT SECTION CONTAINER MODULE ──
export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [focusedIdx, setFocusedIdx] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      textContainerRef.current?.children || [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out", stagger: 0.15 }
    );
  }, { scope: containerRef });

  const activeDoc = CLINICAL_ROSTER[focusedIdx] || CLINICAL_ROSTER[0];
  const galleryImages = useMemo(() => CLINICAL_ROSTER.map((d) => d.image), []);

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative bg-[#080f1e] py-28 px-4 sm:px-6 md:px-14 border-b border-white/5 overflow-hidden min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Refined Typography & Descriptions */}
          <div ref={textContainerRef} className="lg:col-span-5 flex flex-col items-start text-left relative z-20">
            <div className="flex items-center gap-3 mb-4 group">
              <div className="h-px w-8 bg-[#F4B9B9] group-hover:w-12 transition-all duration-500" />
              <span className="font-mono text-xs text-[#F4B9B9] tracking-[0.2em] uppercase font-medium">Clinical Sanctuary</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-8 leading-[1.15]">
              Engineering Excellence in <br />
              <span className="text-[#FFD43A] italic font-semibold">Women's Healthcare</span>
            </h2>
            
            <div className="space-y-6 font-body font-light text-[rgba(248,246,242,0.65)] leading-relaxed text-sm md:text-base max-w-xl mb-8">
              <p>
                Ulnar Medical & Diagnostic Centre is a premier specialist facility committed to redefining clinical accuracy and premium patient care. Located in Nairobi, our clinic bridges the gap between advanced medical diagnostic infrastructure and compassionate, expert specialty treatment.
              </p>
              <p>
                We recognize that modern healthcare demands customized, precision approaches. By combining advanced 3D/4D ultrasonic tracking systems with an elite clinical environment, we deliver tailored screening diagnostics and specialist consultations that meet international benchmarks right here on Ngong Road.
              </p>
            </div>

            {/* Dynamic Real-time Roster Detail Display Card */}
            <div className="w-full bg-[#0d1b3e]/40 border border-white/5 rounded-2xl p-5 backdrop-blur-md shadow-xl min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDoc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col text-left"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="size-3.5 text-[#FFD43A]" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-[#FFD43A]">{activeDoc.title}</span>
                  </div>
                  <h4 className="text-lg font-display font-bold text-white tracking-tight">{activeDoc.name}</h4>
                  <p className="font-mono text-[11px] text-[#F4B9B9] mb-2">{activeDoc.role}</p>
                  <p className="font-sans text-xs text-white/50 leading-relaxed italic">&ldquo;{activeDoc.bio}&rdquo;</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: ✅ NEW INTERACTIVE WEBGL CLOTH INFINITE FABRIC GALLERY */}
          <div className="lg:col-span-7 w-full h-[520px] md:h-[600px] relative z-10 rounded-[2.5rem] bg-gradient-to-br from-[#0d1b3e]/30 to-black/40 border border-white/5 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing">
            
            <div id="specialist-canvas" className="w-full h-full absolute inset-0 z-10">
              <Canvas camera={{ position: [0, 0, 0], fov: 55 }} gl={{ antialias: true, alpha: true }}>
                <GalleryScene images={galleryImages} onFocusedImageChange={(idx) => setFocusedIdx(idx)} />
              </Canvas>
            </div>

            {/* Micro Interaction Hint Badges */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD43A] animate-pulse" />
                <span className="text-[9px] font-mono tracking-wider text-white/50 uppercase">WebGL Hardware Acceleration Active</span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-white/20 uppercase max-md:hidden">Scroll trackpad over canvas to shift warp force</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;