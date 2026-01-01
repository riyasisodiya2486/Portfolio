
import Hero from "@/components/Hero"
import SkillsSection from "@/components/Skills"
import AboutMe from "@/components/AboutMe"
import Project from "@/components/Projects"
import Contact from "@/components/Contact"

export default function Page() {


  return (
    <main className="bg-black text-white">
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="skills" >
        <SkillsSection />
      </section>
      <section id="projects" className="min-h-screen" >
         <Project />
      </section>
      <section id="contact" className="min-h-screen bg-white" >
        <Contact />
      </section>
    </main>
  )
}
