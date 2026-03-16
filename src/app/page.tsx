import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const TrustBar = dynamic(() => import("@/components/TrustBar"));
const Expertise = dynamic(() => import("@/components/Expertise"));
const Process = dynamic(() => import("@/components/Process"));
const ProjectsCTA = dynamic(() => import("@/components/ProjectsCTA"));
const Blog = dynamic(() => import("@/components/Blog"));
const Connect = dynamic(() => import("@/components/Connect"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Expertise />
        <Process />
        <ProjectsCTA />
        <Blog />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
