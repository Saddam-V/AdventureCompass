import { useEffect, useState } from "react";
import { m, useAnimation } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import QuotesShowcase from "@/components/QuotesShowcase";
import StatsSection from "@/components/StatsSection";
import CallToAction from "@/components/CallToAction";
import Interactive3DText from "@/components/Interactive3DText";
import InteractiveParticles from "@/components/InteractiveParticles";
import { Link } from "wouter";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Home = () => {
  const controls = useAnimation();
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    controls.start("enter");
    
    // Delay loading the particles to improve initial page load performance
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <m.div
      initial="initial"
      animate={controls}
      exit="exit"
      variants={pageVariants}
      className="w-full"
    >
      <HeroSection />
      
      <section className="py-24 bg-gradient-to-b from-slate-900 to-indigo-950 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-playfair">
              The Intersection of <span className="text-teal-400">Thought</span> and <span className="text-purple-400">Technology</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Exploring the boundaries between human cognition and artificial intelligence to better understand the nature of mind and knowledge in the digital age.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="h-[400px] md:h-[500px] relative bg-slate-800/30 rounded-2xl p-8 backdrop-blur-sm shadow-xl border border-slate-700/50">
                <Interactive3DText 
                  text="Philosophy of Mind" 
                  className="h-[100px] mb-8"
                  textClassName="text-4xl md:text-5xl font-bold font-playfair"
                  depth={30}
                  layers={8}
                  color="#ffffff"
                  highlightColor="#ec4899"
                />
                <Interactive3DText 
                  text="Artificial Intelligence" 
                  className="h-[100px] mb-8"
                  textClassName="text-4xl md:text-5xl font-bold font-playfair"
                  depth={30}
                  layers={8}
                  color="#ffffff"
                  highlightColor="#10b981"
                  spring={{ stiffness: 250, damping: 25 }}
                />
                <Interactive3DText 
                  text="Human Cognition" 
                  className="h-[100px]"
                  textClassName="text-4xl md:text-5xl font-bold font-playfair"
                  depth={30}
                  layers={8}
                  color="#ffffff"
                  highlightColor="#4f46e5"
                  spring={{ stiffness: 150, damping: 20 }}
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="h-full w-full flex justify-center items-center">
                <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
                  {showParticles && (
                    <InteractiveParticles 
                      className="w-full h-full"
                      particleCount={60}
                      interactionRadius={100}
                      particleColors={['#22d3ee', '#a78bfa', '#fb7185', '#34d399', '#f472b6']}
                      backgroundColor="rgba(15, 23, 42, 0.7)"
                    />
                  )}
                </div>
                <div className="relative z-10 p-10 bg-gradient-to-br from-slate-800/80 to-indigo-900/80 rounded-2xl backdrop-blur-md shadow-2xl border border-slate-700/50 w-full">
                  <m.h3 
                    className="text-3xl md:text-4xl font-bold mb-6 text-white font-playfair"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    Where <span className="text-teal-400">Philosophy</span> Meets <span className="text-purple-400">Innovation</span>
                  </m.h3>
                  <m.p 
                    className="text-gray-200 mb-8 max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    My research builds bridges between philosophical inquiry and technological advancement, examining how AI transforms our understanding of consciousness, knowledge, and what it means to be human.
                  </m.p>
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <Link href="/research">
                      <m.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 rounded-full font-semibold text-white shadow-lg transition-all duration-300"
                        data-cursor-text="Explore"
                      >
                        Explore My Research
                      </m.a>
                    </Link>
                  </m.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturesSection />
      <StatsSection />
      <QuotesShowcase />
      <CallToAction />
    </m.div>
  );
};

export default Home;
