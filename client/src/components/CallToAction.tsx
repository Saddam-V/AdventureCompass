import { useRef, useState } from 'react';
import { m, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'wouter';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CallToAction = () => {
  const [ref, inView] = useScrollAnimation(0.2);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smoother movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Transform for the spotlight effect
  const spotlightX = useTransform(springX, [-300, 300], ['0%', '100%']);
  const spotlightY = useTransform(springY, [-300, 300], ['0%', '100%']);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate position relative to center
      const x = e.clientX - rect.left - centerX;
      const y = e.clientY - rect.top - centerY;
      
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-indigo-950 to-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <m.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Background gradient */}
            <m.div 
              className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>
            
            {/* Spotlight effect */}
            <m.div 
              className="absolute inset-0 opacity-30 pointer-events-none" 
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)',
                backgroundPosition: `${spotlightX.get()}% ${spotlightY.get()}%`,
                backgroundSize: '120% 120%',
              }}
            />
            
            {/* Animated shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <m.div
                className="absolute w-64 h-64 rounded-full bg-teal-500/20 blur-3xl"
                animate={{
                  x: [mousePosition.x * 0.2 - 100, mousePosition.x * 0.2 - 100],
                  y: [mousePosition.y * 0.2 - 100, mousePosition.y * 0.2 - 100],
                }}
                transition={{ duration: 0.8 }}
              />
              <m.div
                className="absolute w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"
                animate={{
                  x: [mousePosition.x * 0.1 + 200, mousePosition.x * 0.1 + 200],
                  y: [mousePosition.y * 0.1 + 100, mousePosition.y * 0.1 + 100],
                }}
                transition={{ duration: 0.8 }}
              />
            </div>
            
            <div className="relative z-10 py-24 px-12 text-center">
              <m.h2 
                className="text-4xl md:text-5xl font-bold text-white font-playfair mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Interested in <span className="bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">Collaboration</span>?
              </m.h2>
              
              <m.p 
                className="text-xl text-gray-200 max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Whether you're a researcher, student, or institution, I welcome 
                opportunities to explore philosophical questions together.
              </m.p>
              
              <m.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link href="/contact">
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl magnetic"
                    data-cursor-text="Get in Touch"
                  >
                    Contact Me
                  </m.button>
                </Link>
                
                <Link href="/publications">
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-8 py-4 bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 font-semibold rounded-full transition-all shadow-lg hover:shadow-xl magnetic"
                    data-cursor-text="View Research"
                  >
                    View My Research
                  </m.button>
                </Link>
              </m.div>
            </div>
          </div>
        </m.div>
      </div>

    </section>
  );
};

export default CallToAction;