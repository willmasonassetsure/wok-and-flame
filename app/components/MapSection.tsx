"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, NavigationArrow } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function MapSection() {
  return (
    <section id="find-us" className="py-16 md:py-40 border-t border-char-800/50">
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2378.8!2d-2.2312!3d53.4229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDI1JzIyLjQiTiAywrAxMyc1Mi4zIlc!5e0!3m2!1sen!2suk!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.6)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wok & Flame location in West Didsbury"
              className="absolute inset-0 w-full h-full"
            />
            {/* Map overlay gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-char-950/30 to-transparent" />
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
                      <span>Mon - Thu</span>
                      <span className="text-char-400 tabular-nums">16:55 - 22:00</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Fri - Sat</span>
                      <span className="text-char-400 tabular-nums">16:55 - 23:00</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Sunday</span>
                      <span className="text-char-400 tabular-nums">16:55 - 22:00</span>
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
                  <p className="text-sm font-300 text-char-200">
                    Min. order: &pound;15.00
                  </p>
                  <p className="text-xs font-300 text-char-400 mt-1">
                    Delivery &pound;1.70 &middot; Collection from 17:00
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=53.4229,-2.2312"
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
