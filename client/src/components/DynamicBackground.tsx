import { useRef, useEffect, useState } from 'react';
import { useMotionValue, useTransform, motion, AnimatePresence } from 'framer-motion';

interface DynamicBackgroundProps {
  className?: string;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  
  // Mouse position motion values
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400);
  
  // Create more dramatic movement 
  const gradient1X = useTransform(mouseX, [0, windowSize.width], ['-15%', '15%']);
  const gradient1Y = useTransform(mouseY, [0, windowSize.height], ['-15%', '15%']);
  const gradient2X = useTransform(mouseX, [0, windowSize.width], ['10%', '-10%']);
  const gradient2Y = useTransform(mouseY, [0, windowSize.height], ['10%', '-10%']);
  const gradient3X = useTransform(mouseX, [0, windowSize.width], ['-8%', '8%']);
  const gradient3Y = useTransform(mouseY, [0, windowSize.height], ['-8%', '8%']);
  
  // More dramatic orb movement
  const orb1X = useTransform(mouseX, [0, windowSize.width], ['-25%', '25%']);
  const orb1Y = useTransform(mouseY, [0, windowSize.height], ['-25%', '25%']);
  const orb2X = useTransform(mouseX, [0, windowSize.width], ['25%', '-25%']);
  const orb2Y = useTransform(mouseY, [0, windowSize.height], ['25%', '-25%']);
  const orb3X = useTransform(mouseX, [0, windowSize.width], ['-15%', '15%']);
  const orb3Y = useTransform(mouseY, [0, windowSize.height], ['15%', '-15%']);
  
  // Parallax for particles
  const particlesX = useTransform(mouseX, [0, windowSize.width], ['3%', '-3%']); 
  const particlesY = useTransform(mouseY, [0, windowSize.height], ['3%', '-3%']);
  
  // For dynamic grid movement
  const gridX = useTransform(mouseX, [0, windowSize.width], ['-5%', '5%']);
  const gridY = useTransform(mouseY, [0, windowSize.height], ['-5%', '5%']);
  
  // Handle mouse movement to update motion values with more immediate response
  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };
  
  // Set up event listeners for mouse movement
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Set initial values for center of screen
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Create more animated particles with distinct movement
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const size = Math.random() * 6 + 1;
    const speed = Math.random() * 0.5 + 0.2;
    const initialX = Math.random() * windowSize.width;
    const initialY = Math.random() * windowSize.height;
    const delay = Math.random() * 5;
    
    return (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          x: initialX,
          y: initialY,
          background: i % 5 === 0 ? '#22d3ee' : 
                     i % 5 === 1 ? '#a78bfa' : 
                     i % 5 === 2 ? '#fb7185' : 
                     i % 5 === 3 ? '#34d399' : 
                     '#f472b6',
          opacity: Math.random() * 0.7 + 0.3,
          boxShadow: `0 0 ${size * 2}px ${size / 2}px currentColor`,
          filter: 'blur(1px)'
        }}
        animate={{
          y: [
            initialY, 
            initialY + (Math.random() * 200 - 100)
          ],
          x: [
            initialX,
            initialX + (Math.random() * 200 - 100)
          ],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 8 / speed,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay
        }}
      />
    );
  });
  
  // Geometric shapes for visual interest
  const shapes = Array.from({ length: 10 }).map((_, i) => {
    const size = Math.random() * 100 + 50;
    const rotation = Math.random() * 360;
    const posX = Math.random() * windowSize.width;
    const posY = Math.random() * windowSize.height;
    const isTriangle = i % 3 === 0;
    const isCircle = i % 3 === 1;
    
    // Create shape transform based on mouse position with delay
    const shapeX = useTransform(
      mouseX, 
      [0, windowSize.width], 
      [posX - 40, posX + 40]
    );
    
    const shapeY = useTransform(
      mouseY, 
      [0, windowSize.height], 
      [posY - 40, posY + 40]
    );
    
    const rotateZ = useTransform(
      mouseX, 
      [0, windowSize.width], 
      [rotation - 30, rotation + 30]
    );
    
    // Different shapes based on index
    if (isTriangle) {
      return (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            x: shapeX,
            y: shapeY,
            rotate: rotateZ,
            width: 0,
            height: 0,
            borderLeft: `${size/2}px solid transparent`,
            borderRight: `${size/2}px solid transparent`,
            borderBottom: `${size}px solid rgba(139, 92, 246, 0.03)`,
            mixBlendMode: 'screen',
            filter: 'blur(3px)',
            willChange: 'transform'
          }}
        />
      );
    } else if (isCircle) {
      return (
        <motion.div
          key={`shape-${i}`}
          className="absolute rounded-full"
          style={{
            x: shapeX,
            y: shapeY,
            rotate: rotateZ,
            width: size,
            height: size,
            border: '1px solid rgba(6, 182, 212, 0.05)',
            background: 'rgba(6, 182, 212, 0.02)',
            mixBlendMode: 'screen',
            filter: 'blur(3px)',
            willChange: 'transform'
          }}
        />
      );
    } else {
      return (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            x: shapeX,
            y: shapeY,
            rotate: rotateZ,
            width: size,
            height: size,
            border: '1px solid rgba(244, 63, 94, 0.05)',
            background: 'rgba(244, 63, 94, 0.02)',
            mixBlendMode: 'screen',
            filter: 'blur(3px)',
            willChange: 'transform'
          }}
        />
      );
    }
  });
  
  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Base dark background gradient - Make it more dramatic with a vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900" />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.4) 100%)' 
        }} 
      />
      
      {/* Flowing gradient background that follows mouse - more dramatic */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ 
          background: 'radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.4), rgba(30, 41, 59, 0.95) 70%)',
          x: gradient1X,
          y: gradient1Y,
          scale: 1.3,
          willChange: 'transform'
        }}
      />
      
      {/* Accent color gradients with more dramatic movement */}
      <motion.div 
        className="absolute top-0 right-0 w-full h-full opacity-50"
        style={{ 
          background: 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.4), transparent 65%)',
          x: gradient2X,
          y: gradient2Y,
          scale: 1.2,
          willChange: 'transform'
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-full opacity-50"
        style={{ 
          background: 'radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.4), transparent 65%)',
          x: gradient3X,
          y: gradient3Y,
          scale: 1.2,
          willChange: 'transform'
        }}
      />
      
      {/* Decorative glowing orbs with more dramatic movement */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent 70%)',
          x: orb1X,
          y: orb1Y,
          willChange: 'transform'
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6), transparent 70%)',
          x: orb2X,
          y: orb2Y,
          willChange: 'transform'
        }}
      />
      
      <motion.div 
        className="absolute top-3/4 right-1/3 w-[300px] h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ 
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.8), transparent 70%)',
          x: orb3X,
          y: orb3Y,
          willChange: 'transform'
        }}
      />
      
      {/* Geometric shapes layer */}
      <div className="absolute inset-0 pointer-events-none">
        {shapes}
      </div>
      
      {/* Grid pattern overlay that moves with mouse */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ x: gridX, y: gridY, willChange: 'transform' }}
      >
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Floating particles with parallax movement */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          x: particlesX,
          y: particlesY,
          willChange: 'transform'
        }}
      >
        <AnimatePresence>
          {particles}
        </AnimatePresence>
      </motion.div>
      
      {/* Top lighting effect like neoculturalcouture.com */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-indigo-600/20 via-blue-500/10 to-transparent pointer-events-none" />
      
      {/* Subtle top and bottom gradients for better content contrast */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-900/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default DynamicBackground;