import { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  originalX: number;
  originalY: number;
  life: number;
  maxLife: number;
}

interface InteractiveParticlesProps {
  particleCount?: number;
  particleColors?: string[];
  backgroundColor?: string;
  interactionRadius?: number;
  maxSpeed?: number;
  connectDistance?: number;
  className?: string;
}

const InteractiveParticles = ({ 
  particleCount = 80,
  particleColors = ['#fed7aa', '#fecaca', '#c4b5fd', '#bfdbfe', '#a5f3fc'],
  backgroundColor = 'rgba(10, 10, 45, 0.9)',
  interactionRadius = 120,
  maxSpeed = 1.5,
  connectDistance = 150,
  className = ''
}: InteractiveParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const animationRef = useRef<number | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize canvas and particles
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    contextRef.current = ctx;
    
    const updateDimensions = () => {
      if (!canvasRef.current) return;
      
      const container = canvasRef.current.parentElement;
      
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    
    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }).map(() => createParticle(dimensions.width, dimensions.height, particleColors));
    
    // Set up event listeners
    window.addEventListener('resize', updateDimensions);
    
    if (canvasRef.current) {
      canvasRef.current.addEventListener('mousemove', handleMouseMove);
      canvasRef.current.addEventListener('mouseleave', handleMouseLeave);
      canvasRef.current.addEventListener('mouseenter', handleMouseEnter);
      canvasRef.current.addEventListener('touchmove', handleTouchMove);
      canvasRef.current.addEventListener('touchend', handleMouseLeave);
    }
    
    // Start animation
    startAnimation();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
      
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
        canvasRef.current.removeEventListener('mouseleave', handleMouseLeave);
        canvasRef.current.removeEventListener('mouseenter', handleMouseEnter);
        canvasRef.current.removeEventListener('touchmove', handleTouchMove);
        canvasRef.current.removeEventListener('touchend', handleMouseLeave);
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Update animation when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      particlesRef.current = Array.from({ length: particleCount }).map(() => 
        createParticle(dimensions.width, dimensions.height, particleColors)
      );
    }
  }, [dimensions, particleCount, particleColors]);

  const createParticle = (width: number, height: number, colors: string[]): Particle => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 3 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const vx = (Math.random() - 0.5) * 1;
    const vy = (Math.random() - 0.5) * 1;
    const life = Math.random() * 100;
    const maxLife = 100 + Math.random() * 100;
    
    return {
      x,
      y,
      vx,
      vy,
      size,
      color,
      originalX: x,
      originalY: y,
      life,
      maxLife
    };
  };

  const startAnimation = () => {
    if (!contextRef.current || !canvasRef.current) return;
    
    const ctx = contextRef.current;
    const { width, height } = canvasRef.current;
    
    const animate = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Increase particle life
        particle.life += 0.1;
        
        // Reset particle when it reaches max life
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
          particle.originalX = particle.x;
          particle.originalY = particle.y;
        }
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        
        // Apply mouse interaction
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < interactionRadius) {
            // Calculate repulsion force
            const force = (interactionRadius - distance) / interactionRadius;
            
            // Apply force away from mouse
            particle.vx -= force * dx * 0.02;
            particle.vy -= force * dy * 0.02;
          }
        }
        
        // Apply maximum speed limit
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }
        
        // Slowly return to original position when mouse is not active
        if (!mouseRef.current.isActive) {
          particle.vx += (particle.originalX - particle.x) * 0.003;
          particle.vy += (particle.originalY - particle.y) * 0.003;
        }
        
        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Connect particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(connectDistance - distance) / connectDistance * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isActive: true
    };
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!canvasRef.current || e.touches.length === 0) return;
    
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
      isActive: true
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isActive = false;
  };

  const handleMouseEnter = () => {
    mouseRef.current.isActive = true;
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default InteractiveParticles;