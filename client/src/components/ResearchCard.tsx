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
          className="flip-card-front absolute w-full h-full bg-secondary/20 backdrop-blur-sm rounded-lg p-8 flex flex-col backface-hidden"
          style={{
            backfaceVisibility: "hidden",
          }}
          whileHover={{
            rotateY: 180,
            transition: { duration: 0.8 },
          }}
        >
          <div className="text-accent text-5xl mb-6">
            <img src={area.iconSrc} alt={area.title} className="w-12 h-12" />
          </div>
          <h4 className="font-playfair text-2xl font-bold mb-4">{area.title}</h4>
          <p className="text-gray-300 mb-6">{area.description}</p>
          <div className="mt-auto text-sm text-accent">
            <span>Click to discover more</span>
          </div>
        </m.div>
        
        <m.div 
          className="flip-card-back absolute w-full h-full bg-accent/90 backdrop-blur-sm rounded-lg p-8 flex flex-col backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          whileHover={{
            rotateY: 0,
            transition: { duration: 0.8 },
          }}
        >
          <h4 className="font-playfair text-2xl font-bold mb-4">Key Contributions</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-100">
            {area.contributions.map((contribution, index) => (
              <li key={index}>{contribution}</li>
            ))}
          </ul>
          <div className="mt-auto">
            <a href="#publications" className="inline-flex items-center text-white hover:underline">
              <span className="mr-2">Related Publications</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
