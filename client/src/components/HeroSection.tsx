import { m, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link } from "wouter";
import ParticlesBackground from "./ParticlesBackground";

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};

const descriptionsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.7,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.2,
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const buttonVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const HeroSection = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-primary text-white">
      <ParticlesBackground />
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary opacity-80"></div>
        <img 
          src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"
          alt="Abstract Background" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary to-transparent opacity-80 z-10"></div>
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <m.div
            initial="hidden"
            animate={controls}
            variants={titleVariants}
            className="overflow-hidden mb-3"
          >
            <h2 className="font-montserrat text-xl md:text-2xl uppercase tracking-[0.25em] text-secondary opacity-80">
              Professor & Researcher
            </h2>
          </m.div>
          
          <m.div
            initial="hidden"
            animate={controls}
            variants={subtitleVariants}
            className="overflow-hidden mb-6"
          >
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
              Dr. Alloy <span className="text-accent">Mukherjee</span>
            </h1>
          </m.div>
          
          <m.p
            initial="hidden"
            animate={controls}
            variants={descriptionsVariants}
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
          >
            Exploring the intersection of philosophy, artificial intelligence, and cognitive science to address fundamental questions about mind and knowledge.
          </m.p>
          
          <m.div
            initial="hidden"
            animate={controls}
            variants={buttonContainerVariants}
            className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6"
          >
            <m.div variants={buttonVariants}>
              <Link href="/research" className="inline-block px-8 py-3 bg-secondary hover:bg-opacity-90 text-white font-montserrat tracking-wide transition-all duration-300 transform hover:-translate-y-1">
                Explore Research
              </Link>
            </m.div>
            <m.div variants={buttonVariants}>
              <Link href="/about" className="inline-block px-8 py-3 border-2 border-white hover:border-accent hover:text-accent text-white font-montserrat tracking-wide transition-all duration-300 transform hover:-translate-y-1">
                About Me
              </Link>
            </m.div>
          </m.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <Link href="/about" className="text-white opacity-70 hover:opacity-100 transition-opacity duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </Link>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-primary to-transparent opacity-80 z-10"></div>
    </section>
  );
};

export default HeroSection;
