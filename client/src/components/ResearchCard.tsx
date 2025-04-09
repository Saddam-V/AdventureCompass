import { m, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ResearchArea } from "@/lib/data";

interface ResearchCardProps {
  area: ResearchArea;
  delay: number;
}

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const ResearchCard = ({ area, delay }: ResearchCardProps) => {
  const controls = useAnimation();
  const [ref, inView] = useScrollAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  return (
    <m.div
      ref={ref}
      variants={cardVariants}
      initial="initial"
      animate={controls}
      custom={delay}
      className="flip-card h-[450px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div 
        className="relative w-full h-full transition-transform duration-800 transform-style-3d" 
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <m.div 
          className="flip-card-front absolute w-full h-full bg-slate-900/40 backdrop-blur-lg border border-indigo-500/20 rounded-lg p-8 flex flex-col backface-hidden shadow-lg shadow-indigo-500/10"
          style={{
            backfaceVisibility: "hidden",
          }}
          whileHover={{
            rotateY: 180,
            transition: { duration: 0.8 },
          }}
        >
          <div className="text-accent text-5xl mb-6 bg-slate-800/40 p-4 rounded-full w-16 h-16 flex items-center justify-center">
            <img src={area.iconSrc} alt={area.title} className="w-10 h-10" />
          </div>
          <h4 className="font-playfair text-2xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">{area.title}</h4>
          <p className="text-gray-300 mb-6">{area.description}</p>
          <div className="mt-auto text-sm text-accent bg-indigo-900/30 py-2 px-4 rounded-full self-start">
            <span>Hover to discover more</span>
          </div>
        </m.div>
        
        <m.div 
          className="flip-card-back absolute w-full h-full bg-indigo-800/50 backdrop-blur-xl border border-white/10 rounded-lg p-8 flex flex-col backface-hidden shadow-lg shadow-purple-700/20"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          whileHover={{
            rotateY: 0,
            transition: { duration: 0.8 },
          }}
        >
          <h4 className="font-playfair text-2xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Key Contributions</h4>
          <ul className="list-disc pl-5 space-y-3 text-white/90">
            {area.contributions.map((contribution, index) => (
              <li key={index} className="backdrop-blur-sm bg-indigo-700/20 rounded-md p-2">{contribution}</li>
            ))}
          </ul>
          <div className="mt-auto">
            <a href="#publications" className="inline-flex items-center bg-white/10 hover:bg-white/20 py-2 px-4 rounded-full transition-all duration-300 text-white group">
              <span className="mr-2">Related Publications</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </m.div>
      </div>
    </m.div>
  );
};

export default ResearchCard;
