import { useEffect } from "react";
import { m, useAnimation } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import PublicationCard from "@/components/PublicationCard";
import { publications } from "@/lib/data";

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

const Publications = () => {
  const controls = useAnimation();
  const [headingRef, headingInView] = useScrollAnimation();
  const [buttonRef, buttonInView] = useScrollAnimation();

  useEffect(() => {
    controls.start("enter");
  }, [controls]);

  return (
    <m.section
      id="publications"
      initial="initial"
      animate={controls}
      exit="exit"
      variants={pageVariants}
      className="relative py-24 md:py-32 bg-neutral"
    >
      <div className="container mx-auto px-6 relative z-10">
        <m.div 
          ref={headingRef}
          variants={itemVariants}
          initial="initial"
          animate={headingInView ? "enter" : "initial"}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-montserrat text-lg text-accent uppercase tracking-widest mb-2">Publications</h2>
          <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-primary">
            Selected{" "}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Academic Works
            </span>
          </h3>
          <p className="text-gray-700">
            A collection of my most significant contributions to philosophical discourse and research in cognitive science and artificial intelligence.
          </p>
        </m.div>
        
        <div className="grid grid-cols-1 gap-10">
          {publications.map((publication, index) => (
            <PublicationCard 
              key={publication.id}
              publication={publication}
              delay={0.3 + (index * 0.2)}
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
            href="#"
            className="inline-block px-8 py-3 bg-primary hover:bg-opacity-90 text-white font-montserrat tracking-wide transition-all duration-300 transform hover:-translate-y-1 rounded"
          >
            View Full Publication List
          </a>
        </m.div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3" 
          alt="Abstract texture" 
          className="w-full h-full object-cover"
        />
      </div>
    </m.section>
  );
};

export default Publications;
