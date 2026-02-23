import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Expertise from "@/components/Expertise";
import Philosophy from "@/components/Philosophy";
import Process from "@/components/Process";
import ProjectsCTA from "@/components/ProjectsCTA";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Expertise />
        <Philosophy />
        <Process />
        <ProjectsCTA />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
