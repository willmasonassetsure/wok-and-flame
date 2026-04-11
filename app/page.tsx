import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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
        <About />
        <MenuHighlights />
        <Gallery />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
