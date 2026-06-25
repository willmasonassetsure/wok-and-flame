"use client";

import { useEffect, useRef } from "react";

// Leaflet is loaded from CDN via app/layout.tsx — no npm install needed.
// This component initialises a map in a div ref using window.L once the
// script tag has finished loading. Open-source tiles (OpenStreetMap),
// recoloured via CSS filters to match the dark site theme, with a custom
// vermillion flame marker built from inline SVG.

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    L: any;
  }
}

// Coordinates: M20 2LW, West Didsbury (verified via OpenStreetMap Nominatim).
// If the exact shopfront moves, update these — Nominatim or what3words will
// give you a fresh pair in seconds.
const LAT = 53.4266560;
const LON = -2.2429775;

const FLAME_ICON_HTML = `
  <div class="wf-marker">
    <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="wf-glow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.95"/>
          <stop offset="55%" stop-color="#d92d20" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="#7a1410" stop-opacity="0.9"/>
        </radialGradient>
      </defs>
      <path d="M18 2 C 11 12, 7 17, 7 24 a 11 11 0 0 0 22 0 C 29 17, 25 12, 18 2 Z" fill="url(#wf-glow)" stroke="#ffe7a8" stroke-width="0.8"/>
      <path d="M18 12 C 14.5 17, 13 20, 13 24 a 5 5 0 0 0 10 0 C 23 20, 21.5 17, 18 12 Z" fill="#fff5d1" opacity="0.85"/>
      <circle cx="18" cy="40" r="2.4" fill="#b42318" opacity="0.55"/>
    </svg>
  </div>
`;

export default function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const waitForLeaflet = () =>
      new Promise<void>((resolve) => {
        if (typeof window !== "undefined" && window.L) return resolve();
        const interval = window.setInterval(() => {
          if (window.L) {
            window.clearInterval(interval);
            resolve();
          }
        }, 60);
      });

    const init = async () => {
      await waitForLeaflet();
      if (cancelled || !containerRef.current || mapRef.current) return;

      const L = window.L;
      const map = L.map(containerRef.current, {
        center: [LAT, LON],
        zoom: 16,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true,
      });
      mapRef.current = map;

      // OSM tiles — free for non-commercial low-volume use under the
      // OSM Tile Usage Policy. CSS filter darkens them to match the theme.
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
        className: "wf-tile-layer",
      }).addTo(map);

      const flameIcon = L.divIcon({
        html: FLAME_ICON_HTML,
        className: "wf-flame-icon",
        iconSize: [36, 44],
        iconAnchor: [18, 42],
      });

      L.marker([LAT, LON], { icon: flameIcon, title: "Wok & Flame" })
        .addTo(map)
        .bindPopup(
          "<strong style='font-family:inherit;font-weight:600;color:#fafaf9;'>Wok &amp; Flame</strong><br/><span style='color:#a8a29e;font-size:12px;'>206 Burton Road, West Didsbury, M20 2LW</span>"
        );

      // Zoom control in bottom-right so it doesn't fight the address card
      L.control.zoom({ position: "bottomright" }).addTo(map);
    };

    init();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full bg-char-900"
      aria-label="Map showing Wok & Flame location on Burton Road, West Didsbury"
      role="img"
    />
  );
}
