import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import FloatingCard3D from './FloatingCard3D';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Philosophy of Mind",
    description: "Exploring the nature of consciousness and how it relates to physical processes in the brain.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    color: "#4f46e5"
  },
  {
    id: 2,
    title: "Artificial Intelligence Ethics",
    description: "Investigating ethical implications of AI and machine learning systems on society and human values.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    color: "#ec4899"
  },
  {
    id: 3,
    title: "Extended Cognition",
    description: "Examining how technology extends human cognitive capacities beyond the boundaries of our brains.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    color: "#10b981"
  },
  {
    id: 4,
    title: "Epistemology",
    description: "Analyzing the nature of knowledge, justification, and the rationality of belief in contemporary contexts.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    color: "#f59e0b"
  },
  {
    id: 5,
    title: "Cognitive Science",
    description: "Bridging philosophy with empirical research on how the mind works through interdisciplinary approaches.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    color: "#8b5cf6"
  },
  {
    id: 6,
    title: "Technological Philosophy",
    description: "Considering how emerging technologies transform fundamental aspects of human experience and society.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    color: "#ef4444"
  },
];

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const FeaturesSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [ref, inView] = useScrollAnimation(0.1);
  
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-indigo-950 to-slate-900">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-teal-500/10 to-transparent"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-cyan-600/20 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <m.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white font-playfair mb-6">
            My Research <span className="text-teal-400">Expertise</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Exploring the boundaries between philosophy, cognition, and emerging technologies
            to better understand the nature of mind and knowledge.
          </p>
        </m.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            // Updated feature colors for better cohesion
            const updatedColors = {
              "#4f46e5": "#6366f1", // indigo
              "#ec4899": "#d946ef", // fuchsia
              "#10b981": "#14b8a6", // teal
              "#f59e0b": "#f59e0b", // amber
              "#8b5cf6": "#8b5cf6", // violet
              "#ef4444": "#f43f5e", // rose
            };
            
            const colorKey = feature.color as keyof typeof updatedColors;
            const updatedColor = updatedColors[colorKey] || feature.color;
            
            return (
              <m.div
                key={feature.id}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                transition={{ delay: index * 0.1 }}
                className="h-[320px]"
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <FloatingCard3D 
                  className="h-full w-full" 
                  backgroundColor="rgba(15, 23, 42, 0.7)"
                  glareColor={updatedColor}
                  shadowIntensity={0.8}
                  borderRadius="1rem"
                >
                  <div className="p-8 h-full flex flex-col bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-[inherit] border border-slate-700/30">
                    <div 
                      className="p-4 rounded-full w-fit mb-4 flex items-center justify-center" 
                      style={{ 
                        background: `linear-gradient(135deg, ${updatedColor}40, ${updatedColor}10)`,
                        boxShadow: `0 0 20px ${updatedColor}30`
                      }}
                    >
                      <div style={{ color: updatedColor }}>
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-montserrat">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 flex-grow mb-4">
                      {feature.description}
                    </p>
                    <m.button
                      className="text-sm font-medium group flex items-center space-x-1 w-fit"
                      whileHover={{ x: 5 }}
                      style={{ color: updatedColor }}
                      data-cursor-text="Learn More"
                    >
                      <span>Learn more</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </m.button>
                  </div>
                </FloatingCard3D>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;