import { getOpeningHours, FALLBACK_HOURS } from "../lib/google-hours";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const hours = (await getOpeningHours()) ?? FALLBACK_HOURS;
  return <HeroClient hours={hours} />;
}
