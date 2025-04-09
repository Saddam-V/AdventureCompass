import { useRef, useEffect } from 'react';
import { useMotionValue, useTransform, motion, AnimatePresence } from 'framer-motion';

interface DynamicBackgroundProps {
  className?: string;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Parallax effect for layers with more subtle movement
  const gradient1X = useTransform(mouseX, [0, window.innerWidth], ['-5%', '5%']);
  const gradient1Y = useTransform(mouseY, [0, window.innerHeight], ['-5%', '5%']);
  const gradient2X = useTransform(mouseX, [0, window.innerWidth], ['3%', '-3%']);
  const gradient2Y = useTransform(mouseY, [0, window.innerHeight], ['3%', '-3%']);
  const gradient3X = useTransform(mouseX, [0, window.innerWidth], ['-2%', '2%']);
  const gradient3Y = useTransform(mouseY, [0, window.innerHeight], ['-2%', '2%']);
  const particlesX = useTransform(mouseX, [0, window.innerWidth], ['1%', '-1%']); 
  const particlesY = useTransform(mouseY, [0, window.innerHeight], ['1%', '-1%']);
  
  // Handle mouse movement to update motion values
  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const x = e.clientX;
      const y = e.clientY;
      mouseX.set(x);
      mouseY.set(y);
    }
  };
  
  // Set up event listeners for mouse movement
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    // Set initial values for center of screen
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Create animated particles
  const particles = Array.from({ length: 30 }).map((_, i) => {
    const size = Math.random() * 4 + 1;
    const speed = Math.random() * 0.5 + 0.2;
    
    return (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          background: i % 5 === 0 ? '#22d3ee' : 
                     i % 5 === 1 ? '#a78bfa' : 
                     i % 5 === 2 ? '#fb7185' : 
                     i % 5 === 3 ? '#34d399' : 
                     '#f472b6',
          opacity: Math.random() * 0.5 + 0.3,
          boxShadow: `0 0 ${size * 2}px ${size / 2}px currentColor`,
          filter: 'blur(1px)'
        }}
        animate={{
          y: [
            `${Math.random() * 100}%`,
            `${Math.random() * 100 + 100}%`
          ],
        }}
        transition={{
          duration: 10 / speed,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
    );
  });
  
  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Base dark background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-indigo-950" />
      
      {/* Primary moving gradient */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.8) 70%)',
          x: gradient1X,
          y: gradient1Y,
          scale: 1.2,
        }}
      />
      
      {/* Accent color gradients */}
      <motion.div 
        className="absolute top-0 right-0 w-full h-full opacity-30"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.4), transparent 50%)',
          x: gradient2X,
          y: gradient2Y,
          scale: 1.1,
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-full opacity-30"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.4), transparent 50%)',
          x: gradient3X,
          y: gradient3Y,
          scale: 1.1,
        }}
      />
      
      {/* Top gradient */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
      
      {/* Decorative glowing orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent 70%)',
          x: useTransform(mouseX, [0, window.innerWidth], ['-10%', '10%']),
          y: useTransform(mouseY, [0, window.innerHeight], ['-10%', '10%']),
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6), transparent 70%)',
          x: useTransform(mouseX, [0, window.innerWidth], ['10%', '-10%']),
          y: useTransform(mouseY, [0, window.innerHeight], ['10%', '-10%']),
        }}
      />
      
      <motion.div 
        className="absolute top-3/4 right-1/3 w-40 h-40 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.6), transparent 70%)',
          x: useTransform(mouseX, [0, window.innerWidth], ['-5%', '5%']),
          y: useTransform(mouseY, [0, window.innerHeight], ['5%', '-5%']),
        }}
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Floating particles with parallax movement */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          x: particlesX,
          y: particlesY
        }}
      >
        <AnimatePresence>
          {particles}
        </AnimatePresence>
      </motion.div>
      
      {/* Subtle top and bottom gradients for better content contrast */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-900/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default DynamicBackground;