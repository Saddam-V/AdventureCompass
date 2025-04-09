import { useRef, useEffect, useState } from 'react';
import { m, useSpring, useTransform, useMotionValue } from 'framer-motion';

interface BrainModel3DProps {
  className?: string;
}

const BrainModel3D: React.FC<BrainModel3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [activePoint, setActivePoint] = useState<string | null>(null);
  
  // Motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smoother movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  // Rotation transforms
  const rotateX = useTransform(springY, [0, 300], [15, -15]);
  const rotateY = useTransform(springX, [0, 300], [-15, 15]);
  
  // Interactive point positions
  const interactivePoints = [
    { id: 'frontal', x: 50, y: 30, label: 'Frontal Lobe', description: 'Controls reasoning, planning, speech, and movement' },
    { id: 'parietal', x: 50, y: 70, label: 'Parietal Lobe', description: 'Processes sensory information like touch and spatial awareness' },
    { id: 'temporal', x: 25, y: 50, label: 'Temporal Lobe', description: 'Involved in hearing, language processing, and memory' },
    { id: 'occipital', x: 80, y: 60, label: 'Occipital Lobe', description: 'Responsible for vision processing' },
    { id: 'cerebellum', x: 80, y: 85, label: 'Cerebellum', description: 'Coordinates muscle movements and balance' },
  ];
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
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
  
  // Animation for the pulse effect
  const pulseVariants = {
    idle: { scale: 1, opacity: 0.7 },
    pulse: { 
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };
  
  useEffect(() => {
    // Show tooltip with a delay after hovering a point
    if (activePoint) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
    
    return () => {};
  }, [activePoint]);

  return (
    <m.div
      ref={containerRef}
      className={`relative w-full h-full perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActivePoint(null);
        setShowTooltip(false);
      }}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        setTimeout(() => {
          setIsHovered(false);
          setActivePoint(null);
          setShowTooltip(false);
        }, 300);
      }}
    >
      {/* 3D Brain model container */}
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
        {/* Brain outline SVG */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full max-w-md"
            style={{ 
              filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))',
              transform: 'translateZ(10px)'
            }}
          >
            {/* Simplified brain outline */}
            <path 
              d="M25,40 C20,25 40,20 50,25 C60,20 80,25 75,40 C85,50 80,70 70,75 
                 C60,85 40,85 30,75 C20,70 15,50 25,40 Z" 
              fill="none" 
              stroke="url(#brain-gradient)" 
              strokeWidth="1.5"
              strokeLinecap="round"
              className="brain-outline"
            />
            
            {/* Brain inner details */}
            <path 
              d="M40,35 C45,30 55,30 60,35 M35,50 C45,45 55,45 65,50 
                 M40,65 C45,60 55,60 60,65" 
              fill="none" 
              stroke="url(#brain-detail)" 
              strokeWidth="1" 
              strokeLinecap="round"
              className="brain-details"
              opacity="0.6"
            />
            
            {/* Interaction points */}
            {interactivePoints.map((point) => (
              <g key={point.id}>
                <m.circle
                  cx={point.x}
                  cy={point.y}
                  r={3}
                  fill={activePoint === point.id ? '#06b6d4' : '#8b5cf6'}
                  variants={pulseVariants}
                  initial="idle"
                  animate="pulse"
                  className="cursor-pointer"
                  onMouseEnter={() => setActivePoint(point.id)}
                  onMouseLeave={() => setActivePoint(null)}
                  onClick={() => setActivePoint(activePoint === point.id ? null : point.id)}
                  style={{ filter: 'drop-shadow(0 0 5px rgba(139, 92, 246, 0.5))' }}
                />
                <m.circle
                  cx={point.x}
                  cy={point.y}
                  r={6}
                  fill="transparent"
                  stroke={activePoint === point.id ? '#06b6d4' : '#8b5cf6'}
                  strokeWidth="1"
                  opacity={0.4}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0.2, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </g>
            ))}
            
            {/* Gradients */}
            <defs>
              <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="brain-detail" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Neural network animation in the background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg width="100%" height="100%" className="neural-net">
            <rect width="100%" height="100%" fill="url(#neural-pattern)" />
            <defs>
              <pattern id="neural-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#22d3ee" />
                <circle cx="0" cy="0" r="1" fill="#f472b6" />
                <circle cx="40" cy="0" r="1" fill="#f472b6" />
                <circle cx="0" cy="40" r="1" fill="#f472b6" />
                <circle cx="40" cy="40" r="1" fill="#f472b6" />
                <line x1="20" y1="20" x2="0" y2="0" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.4" />
                <line x1="20" y1="20" x2="40" y2="0" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.4" />
                <line x1="20" y1="20" x2="0" y2="40" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.4" />
                <line x1="20" y1="20" x2="40" y2="40" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.4" />
              </pattern>
            </defs>
          </svg>
        </div>
        
        {/* Tooltip */}
        {activePoint && showTooltip && (
          <m.div 
            className="absolute z-20 pointer-events-none bg-slate-800 p-3 rounded-md shadow-xl border border-purple-500/30"
            style={{ 
              top: `${interactivePoints.find(p => p.id === activePoint)?.y}%`,
              left: `${interactivePoints.find(p => p.id === activePoint)?.x}%`,
              transform: 'translate(-50%, -130%)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="text-white font-bold mb-1 text-sm">
              {interactivePoints.find(p => p.id === activePoint)?.label}
            </div>
            <div className="text-gray-300 text-xs max-w-[200px]">
              {interactivePoints.find(p => p.id === activePoint)?.description}
            </div>
            <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 bg-slate-800 border-r border-b border-purple-500/30" />
          </m.div>
        )}
      </m.div>
      
      {/* Instruction text */}
      <m.div 
        className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-xs opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        {isHovered ? '' : 'Move mouse over brain model to interact'}
      </m.div>
      
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .brain-outline {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: dash 3s linear forwards;
        }
        .brain-details {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: dash 3s linear forwards 0.5s;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        .neural-net {
          animation: pulse 10s linear infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </m.div>
  );
};

export default BrainModel3D;