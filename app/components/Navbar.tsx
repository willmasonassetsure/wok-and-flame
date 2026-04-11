"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Find Us", href: "#find-us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-char-950/80 backdrop-blur-xl border-b border-char-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 py-5">
        <a
          href="#"
          className="text-2xl font-800 tracking-[0.2em] text-char-50 hover:text-vermillion transition-colors duration-300"
        >
          WOK & FLAME
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-400 tracking-wider text-char-400 hover:text-char-50 transition-colors duration-300 uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.just-eat.co.uk/restaurants-wokandgo-m20/menu" target="_blank" rel="noopener noreferrer"
            className="text-sm font-500 tracking-wider uppercase px-6 py-2.5 border border-vermillion text-vermillion hover:bg-vermillion hover:text-char-50 transition-all duration-300 active:scale-[0.98]"
          >
            Order Now
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-char-50 p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-char-950/95 backdrop-blur-xl border-t border-char-800/50 px-6 pb-8 pt-4"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-300 tracking-wider text-char-400 hover:text-char-50 transition-colors uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.just-eat.co.uk/restaurants-wokandgo-m20/menu" target="_blank" rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-500 tracking-wider uppercase px-6 py-3 border border-vermillion text-vermillion hover:bg-vermillion hover:text-char-50 transition-all duration-300 text-center mt-2"
            >
              Order Now
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
