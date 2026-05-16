import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Reviews from "./components/Reviews";
import About from "./components/About";
import MenuHighlights from "./components/MenuHighlights";
import Gallery from "./components/Gallery";
import MapSection from "./components/MapSection";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import DragonTexture from "./components/DragonTexture";
import MobileOrderBar from "./components/MobileOrderBar";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <DragonTexture />
      <Navbar />
      <main className="relative z-10">
        {/* Section order:
              Hero    — hook + CTAs (the "Jump to menu" CTA skips straight to #menu for high-intent takeaway visitors)
              Gallery — cinematic plate showcase right after the hook, sells the food before anything else
              Reviews — social proof for the still-considering visitor
              Menu    — high-intent product reveal
              About   — story / trust deepener
              Map     — find-us close (collection & discovery) */}
        <Hero />
        <Gallery />
        <Reviews />
        <MenuHighlights />
        <About />
        <MapSection />
      </main>
      <Footer />
      <MobileOrderBar />
    </>
  );
}
