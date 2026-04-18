"use client";

import { motion } from "framer-motion";

const images = [
  { src: "https://images.pexels.com/photos/36921226/pexels-photo-36921226.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=2", span: "md:row-span-2", alt: "Wok cooking with flame" },
  { src: "https://images.pexels.com/photos/35069186/pexels-photo-35069186.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2", span: "", alt: "Dim sum in bamboo steamers" },
  { src: "https://images.pexels.com/photos/35015157/pexels-photo-35015157.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2", span: "", alt: "Restaurant interior" },
  { src: "https://images.pexels.com/photos/30080895/pexels-photo-30080895.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2", span: "", alt: "Night market fire cooking" },
  { src: "https://images.pexels.com/photos/31256391/pexels-photo-31256391.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=2", span: "md:row-span-2", alt: "Plated dumplings" },
  { src: "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=600&h=400&q=85&auto=format&fit=crop", span: "", alt: "Thai green curry" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-10 md:py-40 border-t border-char-800/50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-5"
        >
          Gallery
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
                alt={img.alt}
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
