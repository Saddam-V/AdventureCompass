import { useRef, useState } from 'react';
import { m, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface FloatingCard3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  backgroundColor?: string;
  glareColor?: string;
  borderRadius?: string;
  spring?: { stiffness: number; damping: number };
  rotateIntensity?: number;
  shadowIntensity?: number;
}

const FloatingCard3D = ({
  children,
  className = "",
  depth = 50,
  backgroundColor = "#1a1a2e",
  glareColor = "rgba(255, 255, 255, 0.15)",
  borderRadius = "1rem",
  spring = { stiffness: 400, damping: 40 },
  rotateIntensity = 10,
  shadowIntensity = 0.5
}: FloatingCard3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Motion values for mouse position relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoothed values for more natural movement
  const springX = useSpring(mouseX, spring);
  const springY = useSpring(mouseY, spring);
  
  // Transform mouse position to rotation values
  const rotateX = useTransform(springY, [0, dimensions.height], [rotateIntensity, -rotateIntensity]);
  const rotateY = useTransform(springX, [0, dimensions.width], [-rotateIntensity, rotateIntensity]);
  
  // Transform for the 3D shadow
  const shadowX = useTransform(springX, [0, dimensions.width], [10, -10]);
  const shadowY = useTransform(springY, [0, dimensions.height], [10, -10]);
  
  // For the glare effect
  const glareX = useTransform(springX, [0, dimensions.width], ["-100%", "200%"]);
  const glareY = useTransform(springY, [0, dimensions.height], ["-100%", "200%"]);
  
  // Functions to handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    // Get dimensions if not already set
    if (dimensions.width === 0) {
      const rect = cardRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
    
    // Calculate mouse position relative to card
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    
    setIsHovered(true);
    
    // Set dimensions when mouse enters
    const rect = cardRef.current.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Reset to center position
    mouseX.set(dimensions.width / 2);
    mouseY.set(dimensions.height / 2);
  };
  
  return (
    <m.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <m.div
        className="relative w-full h-full rounded-[inherit] overflow-hidden"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          borderRadius,
          backgroundColor,
          boxShadow: isHovered 
            ? `
                ${shadowX.get() * shadowIntensity}px 
                ${shadowY.get() * shadowIntensity}px 
                30px rgba(0, 0, 0, 0.3)
              `
            : '0px 10px 20px rgba(0, 0, 0, 0.2)',
          transition: !isHovered ? 'all 0.5s ease-out' : 'none',
        }}
      >
        {/* Glare effect */}
        <m.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            opacity: isHovered ? 0.4 : 0,
            background: `linear-gradient(
              125deg,
              transparent 0%,
              ${glareColor} 40%,
              ${glareColor} 60%,
              transparent 100%
            )`,
            transform: `translate(${glareX.get()}%, ${glareY.get()}%)`,
            transition: !isHovered ? 'opacity 0.5s ease-out' : 'none',
          }}
        />
        
        {/* Card content with 3D float effect */}
        <m.div
          className="relative w-full h-full"
          style={{
            transform: isHovered ? `translateZ(${depth}px)` : 'translateZ(0)',
            transition: !isHovered ? 'transform 0.5s ease-out' : 'none',
          }}
        >
          {children}
        </m.div>
      </m.div>
    </m.div>
  );
};

export default FloatingCard3D;