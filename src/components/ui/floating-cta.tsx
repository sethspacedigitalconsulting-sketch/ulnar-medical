"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* Show after 1.5 s; hide while #booking is ≥20% in view */
    const timer = setTimeout(() => setVisible(true), 1500);

    const booking = document.getElementById("booking");
    if (!booking) return () => clearTimeout(timer);

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(booking);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const scrollToBooking = () =>
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Desktop: rounded pill, bottom-right ── */}
          <motion.button
            className="fixed z-50 hidden md:flex items-center gap-2 px-6 py-3.5 rounded-full font-body font-semibold text-sm cursor-pointer"
            style={{
              bottom: 32,
              right: 32,
              background: "#FFD43A",
              color: "#080f1e",
              boxShadow: "0 8px 32px rgba(201,168,76,0.38), 0 2px 8px rgba(0,0,0,0.4)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.88 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToBooking}
            aria-label="Book appointment"
          >
            Book Now →
          </motion.button>

          {/* ── Mobile: full-width bar pinned to bottom ── */}
          <motion.div
            className="fixed z-50 left-0 right-0 bottom-0 md:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="w-full py-4 font-body font-semibold text-sm"
              style={{ background: "#FFD43A", color: "#080f1e" }}
              onClick={scrollToBooking}
            >
              Book Appointment Now →
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
