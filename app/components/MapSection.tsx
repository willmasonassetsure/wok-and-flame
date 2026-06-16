"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, NavigationArrow } from "@phosphor-icons/react";

const LocationMap = dynamic(() => import("./LocationMap"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export default function MapSection() {
  return (
    <section
      id="find-us"
      aria-labelledby="find-us-title"
      className="py-16 md:py-40 border-t border-char-800/50"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-5"
        >
          Find Us
        </motion.p>

        <motion.h2
          id="find-us-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="text-3xl md:text-5xl font-700 tracking-tighter leading-tight text-char-50 mb-8 md:mb-14"
        >
          West Didsbury
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="md:col-span-8 relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[480px]"
          >
            <LocationMap />
            {/* Map overlay gradient — pointer-events-none so the map underneath
                stays interactive (zoom / drag / popup) */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-char-950/30 to-transparent z-[400]" />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="md:col-span-4 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <MapPin size={18} weight="regular" className="text-vermillion" />
                </div>
                <div>
                  <p className="text-xs font-500 tracking-[0.2em] text-char-400 uppercase mb-2">
                    Address
                  </p>
                  <p className="text-sm font-300 text-char-200 leading-relaxed">
                    Burton Road
                    <br />
                    West Didsbury
                    <br />
                    Manchester, M20 2LW
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Clock size={18} weight="regular" className="text-vermillion" />
                </div>
                <div>
                  <p className="text-xs font-500 tracking-[0.2em] text-char-400 uppercase mb-2">
                    Hours
                  </p>
                  <div className="space-y-1.5 text-sm font-300 text-char-200">
                    <div className="flex justify-between gap-8">
                      <span>Every day</span>
                      <span className="text-char-400 tabular-nums">17:00 - 23:00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Phone size={18} weight="regular" className="text-vermillion" />
                </div>
                <div>
                  <p className="text-xs font-500 tracking-[0.2em] text-char-400 uppercase mb-2">
                    Order
                  </p>
                  <a
                    href="tel:+441614346318"
                    className="block text-sm font-400 text-char-50 hover:text-vermillion transition-colors duration-300 tabular-nums"
                  >
                    0161 434 6318
                  </a>
                  <p className="text-xs font-300 text-char-400 mt-1.5">
                    Min. order &pound;15.00 &middot; Delivery &pound;1.70
                  </p>
                  <p className="text-xs font-300 text-char-400">
                    Collection from 17:00
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=53.4266560,-2.2429775&destination_place_id=Wok+%26+Flame+Burton+Road+M20+2LW"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 mt-8 md:mt-10 px-8 py-4 bg-vermillion text-char-50 text-sm font-500 tracking-wider uppercase hover:bg-vermillion-light transition-all duration-300 active:scale-[0.98] rounded-xl w-full md:w-auto"
            >
              Get Directions
              <NavigationArrow
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
