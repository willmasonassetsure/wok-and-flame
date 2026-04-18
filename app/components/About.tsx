"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease },
};

export default function About() {
  return (
    <section id="about" className="py-10 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-20 items-center">
          {/* Image */}
          <motion.div {...fadeUp} className="md:col-span-5 md:col-start-1">
            <div className="relative aspect-[16/9] md:aspect-[3/4] overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/33145258/pexels-photo-33145258.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067&dpr=2"
                alt="Wok & Flame kitchen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-char-950/40 to-transparent" />
            </div>
          </motion.div>

          {/* Text */}
          <div className="md:col-span-6 md:col-start-7">
            <motion.p
              {...fadeUp}
              className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-5"
            >
              About Us
            </motion.p>

            <motion.h2
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="text-3xl md:text-5xl font-700 tracking-tighter leading-tight text-char-50 mb-8"
            >
              Wok-fired fresh
              <br />
              in Didsbury
            </motion.h2>

            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="text-base font-300 text-char-400 leading-relaxed max-w-[55ch] mb-8"
            >
              Wok & Flame brings authentic Chinese and Thai cooking to West
              Didsbury. Every dish is cooked to order over high heat in a
              traditional wok, keeping flavours sharp and ingredients fresh.
            </motion.p>

            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.3 }}
              className="text-base font-300 text-char-400 leading-relaxed max-w-[55ch] mb-10"
            >
              From classic salt and pepper dishes and hand-folded dim sum to
              rich Thai curries and stir-fried noodles, every plate is made with
              care. We keep things simple: good ingredients, real fire, no
              shortcuts.
            </motion.p>

            {/* Stats */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 md:gap-6 border-t border-char-800 pt-8"
            >
              <div>
                <p className="text-2xl md:text-3xl font-700 text-char-50 tracking-tight">
                  5.0
                </p>
                <p className="text-xs font-400 text-char-400 tracking-wider uppercase mt-1">
                  Star Rating
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-700 text-char-50 tracking-tight">
                  9,999+
                </p>
                <p className="text-xs font-400 text-char-400 tracking-wider uppercase mt-1">
                  Reviews
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-700 text-char-50 tracking-tight">
                  M20
                </p>
                <p className="text-xs font-400 text-char-400 tracking-wider uppercase mt-1">
                  West Didsbury
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
