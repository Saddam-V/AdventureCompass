import { useRef, useState, useEffect } from 'react';
import { m, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface Interactive3DTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  depth?: number;
  layers?: number;
  color?: string;
  highlightColor?: string;
  spring?: { stiffness: number; damping: number };
}

const Interactive3DText = ({ 
  text, 
  className = "", 
  textClassName = "",
  depth = 10, 
  layers = 5,
  color = "white",
  highlightColor = "#fb7185",
  spring = { stiffness: 200, damping: 30 }
}: Interactive3DTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Set up spring animations for smoother movement
  const springX = useSpring(mouseX, spring);
  const springY = useSpring(mouseY, spring);

  // Transform for rotation
  const rotateX = useTransform(springY, [0, containerDimensions.height], [10, -10]);
  const rotateY = useTransform(springX, [0, containerDimensions.width], [-10, 10]);

  // For shadow effect based on mouse position
  const shadowX = useTransform(springX, [0, containerDimensions.width], [-5, 5]);
  const shadowY = useTransform(springY, [0, containerDimensions.height], [-5, 5]);

  // For the shift effect of the text
  const textX = useTransform(springX, [0, containerDimensions.width], [-2, 2]);
  const textY = useTransform(springY, [0, containerDimensions.height], [-2, 2]);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerDimensions({ width: rect.width, height: rect.height });
    }

    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({ width: rect.width, height: rect.height });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (containerRef.current && e.touches.length > 0) {
      e.preventDefault(); // Prevent scrolling while touching the element
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
      
      // Ensure hover state is active on touch
      setIsHovered(true);
    }
  };
  
  const handleTouchEnd = () => {
    // Keep hover state for a moment before removing it
    setTimeout(() => setIsHovered(false), 500);
  };

  // Generate layers for 3D effect
  const textLayers = Array.from({ length: layers }).map((_, index) => {
    const isTop = index === layers - 1;
    const zIndex = isTop ? layers + 1 : layers - index;
    const translateZ = isTop ? depth : (depth / layers) * index;
    
    return (
      <m.div
        key={index}
        className={`absolute inset-0 flex items-center justify-center 
                   ${isTop ? 'text-shadow-none' : 'text-transparent text-stroke-2'}`}
        style={{
          zIndex,
          color: isTop && isHovered ? highlightColor : color,
          textShadow: isTop ? `${shadowX.get()}px ${shadowY.get()}px 10px rgba(0,0,0,0.5)` : 'none',
          transform: `translateZ(${translateZ}px) translateX(${isTop ? textX.get() : 0}px) translateY(${isTop ? textY.get() : 0}px)`
        }}
      >
        <span className={`${textClassName}`}>{text}</span>
      </m.div>
    );
  });

  return (
    <m.div
      ref={containerRef}
      className={`relative cursor-pointer perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchStart={() => setIsHovered(true)}
      style={{
        perspective: '1000px'
      }}
    >
      <m.div
        className="relative w-full h-full transform-style-3d"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {textLayers}
      </m.div>
      <style>
        {`
          .text-stroke-2 {
            -webkit-text-stroke: 1px ${color};
            text-stroke: 1px ${color};
          }
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .text-shadow-none {
            text-shadow: none;
          }
        `}
      </style>
    </m.div>
  );
};

export default Interactive3DText;