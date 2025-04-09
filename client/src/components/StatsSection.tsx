import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Stat {
  id: number;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color: string;
}

const stats: Stat[] = [
  {
    id: 1,
    value: 150,
    label: "Research Papers",
    suffix: "+",
    color: "#4f46e5"
  },
  {
    id: 2,
    value: 4,
    label: "Published Books",
    color: "#ec4899"
  },
  {
    id: 3,
    value: 25,
    label: "Years of Experience",
    suffix: "+",
    color: "#f59e0b"
  },
  {
    id: 4,
    value: 18,
    label: "International Awards",
    color: "#10b981"
  }
];

const StatsSection = () => {
  const [ref, inView] = useScrollAnimation(0.2);
  
  return (
    <section className="py-24 bg-neutral relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <m.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <AnimatedStat 
              key={stat.id} 
              stat={stat} 
              delay={0.1 * (index + 1)}
              inView={inView}
            />
          ))}
        </m.div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 pointer-events-none"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent opacity-5 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary opacity-5 blur-3xl"></div>
    </section>
  );
};

interface AnimatedStatProps {
  stat: Stat;
  delay: number;
  inView: boolean;
}

const AnimatedStat = ({ stat, delay, inView }: AnimatedStatProps) => {
  const [count, setCount] = useState(0);
  const duration = 2000; // Animation duration in milliseconds
  
  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * stat.value);
      
      setCount(currentCount);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(stat.value);
      }
    };
    
    // Delay the start of the animation
    const timer = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [inView, stat.value, delay, duration]);
  
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="flex justify-center mb-2">
        <div 
          className="w-16 h-1 rounded"
          style={{ backgroundColor: stat.color }}
        ></div>
      </div>
      <h3 className="text-5xl font-bold mb-2 font-playfair" style={{ color: stat.color }}>
        {stat.prefix}{count}{stat.suffix}
      </h3>
      <p className="text-gray-600 font-montserrat uppercase tracking-wider text-sm">
        {stat.label}
      </p>
    </m.div>
  );
};

export default StatsSection;