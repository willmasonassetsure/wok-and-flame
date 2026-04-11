"use client";

import { motion } from "framer-motion";

const images = [
  { src: "https://picsum.photos/seed/charfire/600/800", span: "md:row-span-2" },
  { src: "https://picsum.photos/seed/chardim/600/400", span: "" },
  { src: "https://picsum.photos/seed/charbar/600/400", span: "" },
  { src: "https://picsum.photos/seed/charneon/600/400", span: "" },
  { src: "https://picsum.photos/seed/charplating/600/800", span: "md:row-span-2" },
  { src: "https://picsum.photos/seed/charinterior/600/400", span: "" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-40 border-t border-char-800/50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-5"
        >
          Inside CHAR
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
          className="text-3xl md:text-5xl font-700 tracking-tighter leading-tight text-char-50 mb-8 md:mb-20"
        >
          The room
        </motion.h2>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[160px] md:auto-rows-[240px]">
          {images.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className={`relative overflow-hidden group ${img.span}`}
            >
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-char-950/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
