"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const BRAND_LINE_1 = "WOK";
const BRAND_LINE_2 = "FLAME";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // Deterministic ember positions (avoid SSR hydration mismatch from Math.random)
  const embers = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        // spread across ±160px of centre, biased slightly toward centre
        x: (i % 2 === 0 ? 1 : -1) * (20 + ((i * 37) % 140)),
        size: 2 + ((i * 13) % 4),
        delay: (i * 0.18) % 2.2,
        duration: 2.6 + ((i * 19) % 10) / 10,
        drift: ((i * 23) % 40) - 20,
      })),
    []
  );

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-char-950 overflow-hidden"
        >
          {/* Radial ember glow — the warm heart of the scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <motion.div
              animate={{
                opacity: [0.55, 0.9, 0.55],
                scale: [1, 1.06, 1],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[520px] h-[520px] max-w-[90vw] max-h-[90vw] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(217,45,32,0.35) 0%, rgba(180,35,24,0.18) 35%, rgba(180,35,24,0) 70%)",
              }}
            />
          </motion.div>

          {/* Rising embers — the "burning" element the user liked, elevated */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none" aria-hidden="true">
            <div className="relative w-0 h-[70%]">
              {embers.map((e) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 0, x: e.x }}
                  animate={{
                    opacity: [0, 0.9, 0.6, 0],
                    y: -360,
                    x: e.x + e.drift,
                  }}
                  transition={{
                    duration: e.duration,
                    delay: e.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute bottom-0 rounded-full"
                  style={{
                    width: e.size,
                    height: e.size,
                    background:
                      "radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(217,45,32,0.9) 45%, rgba(180,35,24,0) 100%)",
                    boxShadow: "0 0 8px rgba(217,45,32,0.8)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Centre stack — eyebrow, wordmark, line, meta */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-vermillion text-[10px] font-500 tracking-[0.5em] uppercase mb-7"
            >
              West Didsbury
            </motion.p>

            {/* Wordmark — letter-by-letter reveal, two lines for scale */}
            <div className="flex flex-col items-center gap-1 md:gap-2">
              <div className="flex overflow-hidden">
                {BRAND_LINE_1.split("").map((char, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.25 + i * 0.07,
                      ease,
                    }}
                    className="inline-block text-[56px] md:text-[88px] leading-[0.95] font-800 tracking-tighter text-char-50"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Vermillion accent line — draws across between the two words */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.75, ease }}
                style={{ transformOrigin: "center" }}
                className="h-px w-28 md:w-36 bg-gradient-to-r from-transparent via-vermillion to-transparent"
              />

              <div className="flex overflow-hidden">
                {BRAND_LINE_2.split("").map((char, i) => (
                  <motion.span
                    key={`l2-${i}`}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.85 + i * 0.07,
                      ease,
                    }}
                    className="inline-block text-[56px] md:text-[88px] leading-[0.95] font-800 tracking-tighter text-vermillion"
                    style={{
                      textShadow: "0 0 40px rgba(180,35,24,0.4)",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Meta line — pulsing ember dot + cuisine */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.45, ease }}
              className="mt-9 flex items-center gap-3"
            >
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-vermillion"
                style={{ boxShadow: "0 0 12px rgba(217,45,32,0.9)" }}
              />
              <span className="text-[11px] font-400 tracking-[0.35em] uppercase text-char-400">
                Chinese Takeaway
              </span>
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="w-1.5 h-1.5 rounded-full bg-vermillion"
                style={{ boxShadow: "0 0 12px rgba(217,45,32,0.9)" }}
              />
            </motion.div>
          </div>

          {/* Loading progress line — bottom, thin, vermillion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-px bg-char-800/80 overflow-hidden rounded-full"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.3, delay: 0.4, ease }}
              className="h-full bg-gradient-to-r from-transparent via-vermillion to-transparent"
            />
          </motion.div>

          {/* Bottom ember haze — floor of the "fire" */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(to top, rgba(180,35,24,0.18) 0%, rgba(180,35,24,0.08) 40%, rgba(180,35,24,0) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
