import { AnimatedBackground } from '@/components/animated-background';
import { ScrollProgress } from '@/components/scroll-progress';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Certifications } from '@/components/sections/certifications';
import { Achievements } from '@/components/sections/achievements';
import { Services } from '@/components/sections/services';
import { AIAssistant } from '@/components/sections/ai-assistant';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Certifications />
        <Experience />
        <Skills />
        <Achievements />
        <Services />
        <AIAssistant />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
