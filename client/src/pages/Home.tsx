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
      
      <section className="py-24 bg-neutral relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="h-[400px] md:h-[500px] relative">
                <Interactive3DText 
                  text="Philosophy of Mind" 
                  className="h-[100px] mb-6"
                  textClassName="text-4xl md:text-5xl font-bold font-playfair"
                  depth={30}
                  layers={8}
                  color="#ffffff"
                  highlightColor="#ec4899"
                />
                <Interactive3DText 
                  text="Artificial Intelligence" 
                  className="h-[100px] mb-6"
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
                <div className="absolute inset-0 z-0">
                  {showParticles && (
                    <InteractiveParticles 
                      className="w-full h-full"
                      particleCount={50}
                      interactionRadius={100}
                    />
                  )}
                </div>
                <div className="relative z-10 text-center p-8 bg-gradient-to-br from-primary/70 to-primary rounded-xl backdrop-blur-lg">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-playfair">
                    Where <span className="text-accent">Philosophy</span> Meets <span className="text-secondary">Technology</span>
                  </h2>
                  <p className="text-gray-200 mb-6 max-w-lg">
                    Exploring the boundaries between human cognition and artificial intelligence to better understand the nature of mind and knowledge in the digital age.
                  </p>
                  <Link href="/research">
                    <m.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block px-6 py-3 bg-accent rounded-lg font-semibold text-white"
                      data-cursor-text="Explore"
                    >
                      Explore My Research
                    </m.a>
                  </Link>
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
