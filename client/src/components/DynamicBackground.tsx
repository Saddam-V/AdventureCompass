import { useRef, useEffect } from 'react';
import { useMotionValue, useTransform, motion } from 'framer-motion';

interface DynamicBackgroundProps {
  className?: string;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Parallax effect for layers
  const gradient1X = useTransform(mouseX, [0, window.innerWidth], ['-10%', '10%']);
  const gradient1Y = useTransform(mouseY, [0, window.innerHeight], ['-10%', '10%']);
  const gradient2X = useTransform(mouseX, [0, window.innerWidth], ['5%', '-5%']);
  const gradient2Y = useTransform(mouseY, [0, window.innerHeight], ['5%', '-5%']);
  const gradient3X = useTransform(mouseX, [0, window.innerWidth], ['-5%', '5%']);
  const gradient3Y = useTransform(mouseY, [0, window.innerHeight], ['-5%', '5%']);
  const noiseX = useTransform(mouseX, [0, window.innerWidth], ['2%', '-2%']);
  const noiseY = useTransform(mouseY, [0, window.innerHeight], ['2%', '-2%']);
  
  // Background color variations
  const hue1 = useTransform(mouseX, [0, window.innerWidth], [240, 260]); // Indigo to purple
  const hue2 = useTransform(mouseY, [0, window.innerHeight], [180, 200]); // Cyan to blue
  const hue3 = useTransform(
    mouseX, 
    [0, window.innerWidth], 
    [280, 340]
  ); // Purple to pink
  
  // Handle mouse movement to update motion values
  const handleMouseMove = (e: MouseEvent) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      mouseX.set(x);
      mouseY.set(y);
    }
  };
  
  // Set up event listeners for mouse movement
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }
    
    // Set initial values for center of screen
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);
    
    // Clean up event listeners
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);
  
  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Gradient layers with parallax effect */}
      <motion.div 
        className="absolute inset-0 opacity-70"
        style={{ 
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(${hue1}, 70%, 15%), hsl(${hue1}, 70%, 5%))`,
          x: gradient1X,
          y: gradient1Y,
          scale: 1.2,
        }}
      />
      
      <motion.div 
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{ 
          backgroundImage: `radial-gradient(circle at 30% 70%, hsl(${hue2}, 70%, 30%), transparent 60%)`,
          x: gradient2X,
          y: gradient2Y,
          scale: 1.3,
        }}
      />
      
      <motion.div 
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{ 
          backgroundImage: `radial-gradient(circle at 70% 30%, hsl(${hue3}, 70%, 30%), transparent 60%)`,
          x: gradient3X,
          y: gradient3Y,
          scale: 1.3,
        }}
      />
      
      {/* Noise texture overlay for depth */}
      <motion.div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          x: noiseX,
          y: noiseY,
        }}
      />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
      
      {/* Glow points */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ 
          background: `radial-gradient(circle, hsl(${hue1}, 80%, 50%), transparent 70%)`,
          left: useTransform(mouseX, [0, window.innerWidth], ['10%', '60%']),
          top: useTransform(mouseY, [0, window.innerHeight], ['10%', '60%']),
        }}
      />
      
      <motion.div 
        className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ 
          background: `radial-gradient(circle, hsl(${hue2}, 80%, 60%), transparent 70%)`,
          right: useTransform(mouseX, [0, window.innerWidth], ['60%', '10%']),
          bottom: useTransform(mouseY, [0, window.innerHeight], ['60%', '10%']),
        }}
      />
    </div>
  );
};

export default DynamicBackground;