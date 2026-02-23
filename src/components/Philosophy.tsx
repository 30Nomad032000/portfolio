"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimateText } from "@/lib/motion-plus/animate-text";
import { ASCII_ART } from "@/lib/ascii-art";
import SectionMarker from "./SectionMarker";

gsap.registerPlugin(ScrollTrigger);

const charVariants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 8 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".philosophy-small")
        .forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="philosophy" id="philosophy" ref={sectionRef}>
      <pre className="philosophy-ascii" aria-hidden="true">
        {ASCII_ART}
      </pre>
      <div className="philosophy-content">
        <SectionMarker current={3} total={7} category="Philosophy" sublabel="Principles" />
        <div className="philosophy-line">
          <div className="philosophy-small">
            Most engineers focus on writing code that works today.
          </div>
        </div>
        <div className="philosophy-line">
          <motion.div
            className="philosophy-big"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            transition={{ staggerChildren: 0.015, delayChildren: 0.1 }}
          >
            <AnimateText type="char" variants={charVariants}>
              I build systems that compound tomorrow.
            </AnimateText>
          </motion.div>
        </div>
        <div className="philosophy-line" style={{ marginTop: "2rem" }}>
          <div className="philosophy-small">
            Ship fast, observe everything, iterate with data — not guesses.
          </div>
        </div>
      </div>
    </section>
  );
}
