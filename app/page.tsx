import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { Hero } from "./components/landing/hero";
import { Stats } from "./components/landing/stats";
import { HowItWorks } from "./components/landing/how";
import { CodeSection } from "./components/landing/code-section";
import { Blocks } from "./components/landing/blocks";
import { FinalCta } from "./components/landing/final-cta";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <CodeSection />
        <Blocks />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
