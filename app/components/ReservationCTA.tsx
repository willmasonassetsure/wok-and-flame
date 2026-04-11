"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

export default function ReservationCTA() {
  return (
    <section
      id="reserve"
      className="relative py-16 md:py-44 border-t border-char-800/50 overflow-hidden"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/charsmoke/1920/800"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-char-950 via-char-950/95 to-char-950/80" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-5"
            >
              Reserve
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="text-3xl md:text-5xl lg:text-6xl font-700 tracking-tighter leading-tight text-char-50 mb-6"
            >
              Tables go fast.
              <br />
              Walk-ins welcome
              <br />
              after ten.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="text-base font-300 text-char-400 leading-relaxed max-w-[50ch] mb-10"
            >
              We keep 8 seats open at the bar every night for anyone who turns
              up hungry. No booking needed. First come, first fired.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="tel:+441612478103"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-vermillion text-char-50 text-sm font-500 tracking-wider uppercase hover:bg-vermillion-light transition-all duration-300 active:scale-[0.98]"
              >
                Call to Reserve
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-char-700 text-char-200 text-sm font-500 tracking-wider uppercase hover:border-char-400 hover:text-char-50 transition-all duration-300 active:scale-[0.98] text-center"
              >
                Get Directions
              </a>
            </motion.div>
          </div>

          {/* Info block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="md:col-span-4 md:col-start-9"
          >
            <div className="space-y-8">
              <div className="border-l-2 border-vermillion pl-6">
                <p className="text-xs font-400 tracking-[0.2em] text-char-400 uppercase mb-2">
                  Address
                </p>
                <p className="text-sm font-300 text-char-200 leading-relaxed">
                  Unit 3, Warwick House
                  <br />
                  Oldham Street
                  <br />
                  Northern Quarter, M1 1JQ
                </p>
              </div>

              <div className="border-l-2 border-char-800 pl-6">
                <p className="text-xs font-400 tracking-[0.2em] text-char-400 uppercase mb-2">
                  Hours
                </p>
                <div className="space-y-1.5 text-sm font-300 text-char-200">
                  <div className="flex justify-between gap-8">
                    <span>Wed - Thu</span>
                    <span className="text-char-400 tabular-nums">17:00 - 23:00</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Fri - Sat</span>
                    <span className="text-char-400 tabular-nums">17:00 - 01:00</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Sunday</span>
                    <span className="text-char-400 tabular-nums">12:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Mon - Tue</span>
                    <span className="text-char-400">Closed</span>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-char-800 pl-6">
                <p className="text-xs font-400 tracking-[0.2em] text-char-400 uppercase mb-2">
                  Phone
                </p>
                <p className="text-sm font-300 text-char-200">
                  +44 (0)161 247 8103
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
