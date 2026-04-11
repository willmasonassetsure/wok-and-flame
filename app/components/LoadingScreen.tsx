"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-char-950"
        >
          {/* Spinning wok SVG */}
          <motion.div
            initial={{ rotateY: 0, scale: 0.8, opacity: 0 }}
            animate={{ rotateY: 360, scale: 1, opacity: 1 }}
            transition={{
              rotateY: { duration: 2.4, ease: "easeInOut" },
              scale: { duration: 0.8, ease },
              opacity: { duration: 0.4 },
            }}
            style={{ perspective: 800 }}
            className="relative mb-8"
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_30px_rgba(180,35,24,0.3)]"
            >
              {/* Wok body */}
              <ellipse cx="60" cy="70" rx="50" ry="28" fill="#1c1917" stroke="#292524" strokeWidth="2" />
              <ellipse cx="60" cy="65" rx="46" ry="24" fill="#292524" />
              {/* Inner glow */}
              <ellipse cx="60" cy="63" rx="38" ry="18" fill="#1c1917" />
              {/* Fire glow at bottom */}
              <motion.ellipse
                cx="60"
                cy="90"
                rx="30"
                ry="8"
                fill="#b42318"
                opacity={0.4}
                animate={{ opacity: [0.2, 0.5, 0.2], ry: [6, 10, 6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Steam lines */}
              <motion.path
                d="M40 50 Q42 35 38 20"
                stroke="#44403c"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.6, 0], y: [0, -10] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.path
                d="M60 48 Q58 32 62 18"
                stroke="#44403c"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.5, 0], y: [0, -12] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              />
              <motion.path
                d="M80 50 Q78 36 82 22"
                stroke="#44403c"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.6, 0], y: [0, -10] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              />
              {/* Wok handle */}
              <rect x="105" y="62" width="14" height="6" rx="3" fill="#44403c" />
            </svg>
          </motion.div>

          {/* Brand name */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="text-3xl font-800 tracking-[0.3em] text-char-50 mb-3"
          >
            WOK & FLAME
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-xs font-400 tracking-[0.25em] text-char-400 uppercase"
          >
            West Didsbury
          </motion.p>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-px bg-char-800 overflow-hidden rounded-full"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, delay: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="h-full bg-vermillion"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
