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

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <DragonTexture />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Reviews />
        <About />
        <MenuHighlights />
        <Gallery />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
