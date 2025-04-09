import { useEffect, useState } from "react";
import { m, useAnimation } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ResearchCard from "@/components/ResearchCard";
import AtomicModel3D from "@/components/AtomicModel3D";
import DynamicBackground from "@/components/DynamicBackground";
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
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const Research = () => {
  const controls = useAnimation();
  const [headingRef, headingInView] = useScrollAnimation();
  const [buttonRef, buttonInView] = useScrollAnimation();
  const [brainModelRef, brainModelInView] = useScrollAnimation();
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    controls.start("enter");
    // Delay loading the 3D model to improve page load performance
    const timer = setTimeout(() => {
      setShowModel(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <m.section
      id="research"
      initial="initial"
      animate={controls}
      exit="exit"
      variants={pageVariants}
      className="relative py-24 md:py-32 min-h-screen text-white overflow-hidden"
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
        
        <m.div
          ref={brainModelRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={brainModelInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-96 mb-20 rounded-lg overflow-hidden shadow-2xl relative perspective-1000"
        >
          {showModel ? (
            <AtomicModel3D className="w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <div className="animate-pulse text-gray-400">Loading 3D Model...</div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-center">
            <h3 className="text-2xl font-bold text-white">Interactive Atomic Model</h3>
            <p className="text-gray-300 text-sm">Hover to interact with elements</p>
          </div>
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
            className="inline-block px-8 py-3 bg-accent hover:bg-opacity-90 text-white font-montserrat tracking-wide transition-all duration-300 transform hover:-translate-y-1 rounded magnetic"
            data-cursor-text="Let's Work Together"
          >
            Collaborate on Research
          </a>
        </m.div>
      </div>
      
      {/* Dynamic background that responds to mouse movement */}
      <DynamicBackground />
    </m.section>
  );
};

export default Research;
