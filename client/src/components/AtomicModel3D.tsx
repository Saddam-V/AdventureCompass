import { useRef, useEffect, useState } from 'react';
import { m, useSpring, useTransform, useMotionValue } from 'framer-motion';

interface AtomicModel3DProps {
  className?: string;
}

const AtomicModel3D: React.FC<AtomicModel3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeOrbit, setActiveOrbit] = useState<number | null>(null);
  
  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smoother movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  // Rotation transforms
  const rotateX = useTransform(springY, [0, 300], [15, -15]);
  const rotateY = useTransform(springX, [0, 300], [-15, 15]);
  
  // Atoms data with slightly shorter descriptions
  const atoms = [
    { name: 'Consciousness', description: 'Subjective experience and awareness', color: '#8b5cf6' },
    { name: 'Knowledge', description: 'Structure & limits of understanding', color: '#06b6d4' },
    { name: 'Identity', description: 'Self continuity through time & change', color: '#ec4899' },
    { name: 'Ethics', description: 'Moral principles in AI development', color: '#10b981' }
  ];
  
  // Orbit data (radius, rotation speed, start angle)
  const orbits = [
    { radius: 30, speed: 20, startAngle: 0, electronColor: '#8b5cf6', pathColor: 'rgba(139, 92, 246, 0.2)' },
    { radius: 45, speed: 25, startAngle: 60, electronColor: '#06b6d4', pathColor: 'rgba(6, 182, 212, 0.2)' },
    { radius: 60, speed: 15, startAngle: 120, electronColor: '#ec4899', pathColor: 'rgba(236, 72, 153, 0.2)' },
    { radius: 75, speed: 30, startAngle: 240, electronColor: '#10b981', pathColor: 'rgba(16, 185, 129, 0.2)' }
  ];
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
      
      // Check if mouse is over an orbit
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const svgCenterX = svgRect.width / 2;
        const svgCenterY = svgRect.height / 2;
        
        const mouseDistanceFromCenter = Math.sqrt(
          Math.pow(x - svgCenterX, 2) + Math.pow(y - svgCenterY, 2)
        );
        
        let closestOrbit = null;
        let minDistance = Infinity;
        
        orbits.forEach((orbit, index) => {
          const distance = Math.abs(mouseDistanceFromCenter - orbit.radius * (svgRect.width / 200));
          if (distance < minDistance && distance < 15) {
            minDistance = distance;
            closestOrbit = index;
          }
        });
        
        setActiveOrbit(closestOrbit);
      }
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (containerRef.current && e.touches.length > 0) {
      e.preventDefault(); // Prevent scrolling while touching
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  return (
    <m.div
      ref={containerRef}
      className={`relative w-full h-full perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveOrbit(null);
      }}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        setTimeout(() => {
          setIsHovered(false);
          setActiveOrbit(null);
        }, 300);
      }}
    >
      {/* 3D container */}
      <m.div
        className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-800/80 to-indigo-900/80 backdrop-blur-md 
                   shadow-2xl border border-slate-700/50 overflow-hidden transform-style-3d"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          transition: !isHovered ? 'all 0.5s ease-out' : 'none',
        }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-teal-500/20 blur-3xl"></div>
        
        {/* Atomic model with SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            ref={svgRef}
            viewBox="0 0 200 200" 
            className="w-full h-full max-w-md"
            style={{ 
              filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))',
              transform: 'translateZ(10px)'
            }}
          >
            {/* Nucleus - Moved to the beginning so it appears behind everything else */}
            <circle
              cx="100"
              cy="100"
              r="15"
              fill="url(#nucleus-gradient)"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))'
              }}
            />
            
            <m.circle
              cx="100"
              cy="100"
              r="18"
              fill="none"
              stroke="rgba(236, 72, 153, 0.3)"
              strokeWidth="1"
              animate={{
                r: [18, 25, 18],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            
            {/* Center text - only shown when no orbit is active */}
            {activeOrbit === null && (
              <text
                x="100"
                y="103"
                textAnchor="middle"
                fill="white"
                fontSize="8"
                fontWeight="bold"
              >
                MIND
              </text>
            )}
            
            {/* Orbits */}
            {orbits.map((orbit, index) => (
              <g key={`orbit-${index}`}>
                {/* Orbit path */}
                <circle
                  cx="100"
                  cy="100"
                  r={orbit.radius}
                  fill="none"
                  stroke={activeOrbit === index ? atoms[index].color : orbit.pathColor}
                  strokeWidth={activeOrbit === index ? 1.5 : 1}
                  strokeDasharray={activeOrbit === index ? "3,2" : ""}
                  opacity={activeOrbit === index ? 0.8 : 0.4}
                />
                
                {/* Electron */}
                <m.circle
                  cx="100"
                  cy="100"
                  r={3.5}
                  fill={orbit.electronColor}
                  animate={{
                    cx: [
                      100 + orbit.radius * Math.cos(orbit.startAngle * Math.PI / 180),
                      100 + orbit.radius * Math.cos((orbit.startAngle + 120) * Math.PI / 180),
                      100 + orbit.radius * Math.cos((orbit.startAngle + 240) * Math.PI / 180),
                      100 + orbit.radius * Math.cos((orbit.startAngle + 360) * Math.PI / 180)
                    ],
                    cy: [
                      100 + orbit.radius * Math.sin(orbit.startAngle * Math.PI / 180),
                      100 + orbit.radius * Math.sin((orbit.startAngle + 120) * Math.PI / 180),
                      100 + orbit.radius * Math.sin((orbit.startAngle + 240) * Math.PI / 180),
                      100 + orbit.radius * Math.sin((orbit.startAngle + 360) * Math.PI / 180)
                    ],
                    scale: activeOrbit === index ? [1, 1.5, 1] : 1
                  }}
                  transition={{
                    duration: orbit.speed,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  style={{
                    filter: `drop-shadow(0 0 5px ${orbit.electronColor})`
                  }}
                />
                
                {/* Label for orbit when active - Now rendered last to appear on top of everything */}
                {activeOrbit === index && (
                  <m.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background blur effect with increased width and z-index */}
                    <rect
                      x="45"
                      y="95"
                      width="120"
                      height="40"
                      rx="8"
                      fill="rgba(15, 23, 42, 0.95)"
                      filter="url(#blur-filter)"
                    />
                    
                    {/* Gradient border */}
                    <rect
                      x="45"
                      y="95"
                      width="120"
                      height="40"
                      rx="8"
                      fill="none"
                      stroke={`url(#gradient-stroke-${index})`}
                      strokeWidth="1.5"
                    />
                    
                    {/* Small decorative element */}
                    <circle
                      cx="58"
                      cy="105"
                      r="4"
                      fill={atoms[index].color}
                      opacity="0.8"
                    />
                    
                    {/* Content */}
                    <text
                      x="67"
                      y="107"
                      textAnchor="start"
                      fill="white"
                      fontSize="8"
                      fontWeight="bold"
                      letterSpacing="0.5"
                    >
                      {atoms[index].name.toUpperCase()}
                    </text>
                    <text
                      x="58"
                      y="122"
                      textAnchor="start"
                      fill="#94a3b8"
                      fontSize="6"
                    >
                      {atoms[index].description.length > 35 
                        ? atoms[index].description.substring(0, 35) + '...' 
                        : atoms[index].description}
                    </text>
                    
                    {/* Define gradient for this label */}
                    <defs>
                      <linearGradient id={`gradient-stroke-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={atoms[index].color} stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                  </m.g>
                )}
              </g>
            ))}
            
            {/* Gradients and Filters */}
            <defs>
              <radialGradient id="nucleus-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </radialGradient>
              
              {/* Blur filter for tooltip backgrounds */}
              <filter id="blur-filter" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>
        </div>
        
        {/* Caption */}
        <m.div 
          className="absolute bottom-6 left-0 right-0 text-center text-gray-300 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0 : 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {isHovered ? '' : 'Interactive Model of Mind • Hover to Explore'}
        </m.div>
      </m.div>
      
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </m.div>
  );
};

export default AtomicModel3D;