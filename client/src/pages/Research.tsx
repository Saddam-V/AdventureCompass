import { useEffect } from "react";
import { m, useAnimation } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ResearchCard from "@/components/ResearchCard";
import { researchAreas } from "@/lib/data";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const itemVariants = {
  initial: { y: 30, opacity: 0 },
  enter: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

const Research = () => {
  const controls = useAnimation();
  const [headingRef, headingInView] = useScrollAnimation();
  const [buttonRef, buttonInView] = useScrollAnimation();

  useEffect(() => {
    controls.start("enter");
  }, [controls]);

  return (
    <m.section
      id="research"
      initial="initial"
      animate={controls}
      exit="exit"
      variants={pageVariants}
      className="relative py-24 md:py-32 bg-primary text-white clip-path-polygon"
    >
      <div className="container mx-auto px-6 relative z-10">
        <m.div 
          ref={headingRef}
          variants={itemVariants}
          initial="initial"
          animate={headingInView ? "enter" : "initial"}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="font-montserrat text-lg text-accent uppercase tracking-widest mb-2">Research Areas</h2>
          <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Exploring the Frontier of{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Mind & Knowledge
            </span>
          </h3>
          <p className="text-gray-300">
            My research spans multiple disciplines, focusing on how we understand intelligence, both natural and artificial, and what this reveals about the nature of knowledge itself.
          </p>
        </m.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {researchAreas.map((area, index) => (
            <ResearchCard 
              key={area.id}
              area={area}
              delay={0.2 + (index * 0.2)}
            />
          ))}
        </div>
        
        <m.div 
          ref={buttonRef}
          variants={itemVariants}
          initial="initial"
          animate={buttonInView ? "enter" : "initial"}
          className="mt-16 text-center"
        >
          <a 
            href="#contact" 
            className="inline-block px-8 py-3 bg-accent hover:bg-opacity-90 text-white font-montserrat tracking-wide transition-all duration-300 transform hover:-translate-y-1 rounded"
          >
            Collaborate on Research
          </a>
        </m.div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-10 mix-blend-overlay pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3" 
          alt="Abstract texture" 
          className="w-full h-full object-cover"
        />
      </div>
    </m.section>
  );
};

export default Research;
