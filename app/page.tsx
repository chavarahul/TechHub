import Navbar from "./components/common/Navbar";
import About from "./components/pages/About";
import End from "./components/pages/End";
import Features from "./components/pages/Features";
import Hero from "./components/pages/Hero";


export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden px-12 Smoother">

      <Hero />
      <About />
      <Features/>
      <End/>
    </main>
  );
}
