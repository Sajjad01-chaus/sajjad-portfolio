import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/sections/hero";
import { Principles } from "@/components/sections/principles";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <Principles />
        <Stack />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
