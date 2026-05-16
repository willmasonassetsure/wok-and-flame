"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { OpeningHoursData, OpeningPeriod } from "../lib/google-hours";

// Days follow Google Places API convention: 0 = Sunday, 1 = Monday, etc.
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

// Returns current time in Europe/London regardless of server/visitor clock.
function nowInLondon(): { day: number; minutes: number } {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = get("weekday") as (typeof DAY_NAMES)[number];
  const day = DAY_NAMES.indexOf(weekday);
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  return { day, minutes: hour * 60 + minute };
}

function isOpenNow(periods: OpeningPeriod[]): boolean {
  if (periods.length === 0) return false;
  const now = nowInLondon();
  const nowAbs = now.day * 1440 + now.minutes;

  for (const p of periods) {
    const openAbs = p.open.day * 1440 + p.open.hour * 60 + p.open.minute;
    let closeAbs = p.close.day * 1440 + p.close.hour * 60 + p.close.minute;
    // Periods that close after midnight wrap into the next day.
    if (closeAbs <= openAbs) closeAbs += 7 * 1440;
    // Check the period and its -7d mirror so Sun-morning hits a Sat-night wrap.
    if (
      (nowAbs >= openAbs && nowAbs < closeAbs) ||
      (nowAbs >= openAbs - 7 * 1440 && nowAbs < closeAbs - 7 * 1440)
    ) {
      return true;
    }
  }
  return false;
}

export default function OpenStatus({ hours }: { hours: OpeningHoursData }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(isOpenNow(hours.periods));
    tick();
    // Re-evaluate every 30s — handles transitions promptly without burning cycles.
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [hours.periods]);

  // Wait for the first client tick — server "now" and client "now" don't match.
  if (open === null) return null;

  const dot = open ? "bg-emerald-400" : "bg-red-500";
  const ring = open ? "bg-emerald-400/50" : "bg-red-500/50";

  return (
    <span
      className="inline-flex items-center gap-2"
      role="status"
      aria-live="polite"
      aria-label={open ? "Currently open" : "Currently closed"}
    >
      <span className="relative inline-flex h-2 w-2">
        <motion.span
          aria-hidden
          className={`absolute inset-0 rounded-full ${ring}`}
          animate={{ scale: [1, 2.4, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className={`relative inline-flex h-2 w-2 rounded-full ${dot}`}
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      <span>{open ? "Open now" : "Closed now"}</span>
    </span>
  );
}
