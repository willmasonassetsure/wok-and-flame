"use client";

import { motion } from "framer-motion";
import { ArrowDown, Star } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-end md:items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/37099447/pexels-photo-37099447.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-char-950 via-char-950/90 to-char-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-char-950 via-transparent to-char-950/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-20 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end md:items-center">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <p className="text-vermillion text-sm font-500 tracking-[0.3em] uppercase mb-6">
                West Didsbury, Manchester
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
              className="text-5xl md:text-7xl lg:text-8xl font-800 tracking-tighter leading-none text-char-50 mb-3"
            >
              WOK &
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="text-5xl md:text-7xl lg:text-8xl font-800 tracking-tighter leading-none text-vermillion mb-6"
            >
              FLAME
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease }}
              className="text-lg md:text-xl font-300 text-char-400 leading-relaxed max-w-[50ch] mb-4"
            >
              Authentic Chinese and Thai, wok-fired fresh in
              West Didsbury. Delivery and collection.
            </motion.p>

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease }}
              className="flex items-center gap-2 mb-10"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} weight="fill" className="text-vermillion" />
                ))}
              </div>
              <span className="text-sm font-400 text-char-400">
                5.0 &middot; 11,375 reviews on Just Eat
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://www.just-eat.co.uk/restaurants-wokandgo-m20/menu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-vermillion text-char-50 text-sm font-500 tracking-wider uppercase hover:bg-vermillion-light transition-all duration-300 active:scale-[0.98] text-center w-full sm:w-auto"
              >
                Order on Just Eat
              </a>
              <a
                href="#menu"
                className="px-8 py-3.5 border border-char-700 text-char-200 text-sm font-500 tracking-wider uppercase hover:border-char-400 hover:text-char-50 transition-all duration-300 active:scale-[0.98] text-center w-full sm:w-auto"
              >
                View Menu
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="hidden md:flex md:col-span-5 flex-col items-end gap-8 text-right"
          >
            <div className="border-r border-char-700 pr-6">
              <p className="text-xs font-400 tracking-[0.2em] text-char-400 uppercase mb-1">
                Delivery
              </p>
              <p className="text-sm font-300 text-char-200">
                Opens daily at 16:55
              </p>
            </div>
            <div className="border-r border-char-700 pr-6">
              <p className="text-xs font-400 tracking-[0.2em] text-char-400 uppercase mb-1">
                Collection
              </p>
              <p className="text-sm font-300 text-char-200">
                From 17:00
              </p>
            </div>
            <div className="border-r border-char-700 pr-6">
              <p className="text-xs font-400 tracking-[0.2em] text-char-400 uppercase mb-1">
                Min. Order
              </p>
              <p className="text-sm font-300 text-char-200">
                &pound;15.00
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} weight="light" className="text-char-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
