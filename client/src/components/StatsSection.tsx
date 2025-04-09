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
    <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTI1MjkiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMC0xLjEwNS0uODk1LTItMi0ycy0yIC44OTUtMiAyIC44OTUgMiAyIDIgMi0uODk1IDItMnptMzIgMTZjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMC0xLjEwNS0uODk1LTItMi0ycy0yIC44OTUtMiAyIC44OTUgMiAyIDIgMi0uODk1IDItMnptLTMyIDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMC0xLjEwNS0uODk1LTItMi0ycy0yIC44OTUtMiAyIC44OTUgMiAyIDIgMi0uODk1IDItMnptMC0xNmMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptLTIgMGMwLTEuMTA1LS44OTUtMi0yLTJzLTIgLjg5NS0yIDIgLjg5NSAyIDIgMiAyLS44OTUgMi0yem0zMi0xNmMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptLTIgMGMwLTEuMTA1LS44OTUtMi0yLTJzLTIgLjg5NS0yIDIgLjg5NSAyIDIgMiAyLS44OTUgMi0yem0tMTYtMTZjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMC0xLjEwNS0uODk1LTItMi0ycy0yIC44OTUtMiAyIC44OTUgMiAyIDIgMi0uODk1IDItMnptLTE2LTE2YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0tMiAwYzAtMS4xMDUtLjg5NS0yLTItMnMtMiAuODk1LTIgMiAuODk1IDIgMiAyIDItLjg5NSAyLTJ6bTMyIDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMC0xLjEwNS0uODk1LTItMi0ycy0yIC44OTUtMiAyIC44OTUgMiAyIDIgMi0uODk1IDItMnoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==')]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-purple-500/10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-3">
            Research <span className="text-teal-400">Impact</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-purple-500 mx-auto mb-6"></div>
        </div>
        
        <m.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => {
            // Updated colors to match the new theme
            const updatedColors = {
              "#4f46e5": "#6366f1", // indigo
              "#ec4899": "#d946ef", // fuchsia
              "#10b981": "#14b8a6", // teal
              "#f59e0b": "#f59e0b", // amber
            };
            
            const colorKey = stat.color as keyof typeof updatedColors;
            const updatedColor = updatedColors[colorKey] || stat.color;
            
            return (
              <AnimatedStat 
                key={stat.id} 
                stat={{...stat, color: updatedColor}}
                delay={0.1 * (index + 1)}
                inView={inView}
              />
            );
          })}
        </m.div>
      </div>
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
      <p className="text-gray-300 font-montserrat uppercase tracking-wider text-sm">
        {stat.label}
      </p>
    </m.div>
  );
};

export default StatsSection;