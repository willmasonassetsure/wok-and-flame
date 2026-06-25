"use client";

import { Phone } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-char-800/50 py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-4">
            <p className="text-2xl font-800 tracking-[0.15em] text-char-50 mb-4">
              WOK & FLAME
            </p>
            <p className="text-sm font-300 text-char-400 leading-relaxed max-w-[35ch]">
              Authentic Chinese takeaway, wok-fired fresh in West Didsbury.
              Delivery and collection via Just Eat.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 md:col-start-6">
            <p className="text-xs font-500 tracking-[0.2em] text-char-400 uppercase mb-4">
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              <a href="#gallery" className="inline-block py-1.5 text-sm font-300 text-char-400 hover:text-char-50 transition-colors duration-300">Gallery</a>
              <a href="#reviews" className="inline-block py-1.5 text-sm font-300 text-char-400 hover:text-char-50 transition-colors duration-300">Reviews</a>
              <a href="#about" className="inline-block py-1.5 text-sm font-300 text-char-400 hover:text-char-50 transition-colors duration-300">About</a>
              <a href="#menu" className="inline-block py-1.5 text-sm font-300 text-char-400 hover:text-char-50 transition-colors duration-300">Menu</a>
              <a href="#find-us" className="inline-block py-1.5 text-sm font-300 text-char-400 hover:text-char-50 transition-colors duration-300">Find Us</a>
            </div>
          </div>

          {/* Order */}
          <div className="md:col-span-2">
            <p className="text-xs font-500 tracking-[0.2em] text-char-400 uppercase mb-4">
              Order
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.just-eat.co.uk/restaurants-wokandgo-m20/menu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1.5 text-sm font-300 text-char-400 hover:text-char-50 transition-colors duration-300"
              >
                Just Eat
              </a>
              <a href="#find-us" className="inline-block py-1.5 text-sm font-300 text-char-400 hover:text-char-50 transition-colors duration-300">
                Collection
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 md:col-start-11">
            <p className="text-xs font-500 tracking-[0.2em] text-char-400 uppercase mb-4">
              Call
            </p>
            <a
              href="tel:+441614346318"
              className="inline-flex items-center gap-2 text-sm font-400 text-char-200 hover:text-vermillion transition-colors duration-300 tabular-nums"
            >
              <Phone size={14} weight="regular" />
              0161 434 6318
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 md:mt-16 pt-8 border-t border-char-800/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs font-300 text-char-700">
            &copy; {new Date().getFullYear()} Wok &amp; Flame. West Didsbury, Manchester.
          </p>
          <p className="text-xs font-300 text-char-700">
            Designed and hosted by{" "}
            <a
              href="https://wmfreelance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-char-400 hover:text-char-200 transition-colors duration-300"
            >
              @WMFREELANCE
            </a>
          </p>
          <p className="text-xs font-300 text-char-700">
            206 Burton Road, M20 2LW
          </p>
        </div>
      </div>
    </footer>
  );
}
