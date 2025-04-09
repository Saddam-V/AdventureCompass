import { useEffect, useState, useRef } from "react";
import { m, useAnimation, motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import AtomicModel3D from "@/components/AtomicModel3D";
import DynamicBackground from "@/components/DynamicBackground";
import { researchAreas } from "@/lib/data";
import { Link } from "wouter";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const itemVariants = {
  initial: { y: 30, opacity: 0 },
  enter: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

const Research = () => {
  const controls = useAnimation();
  const [headingRef, headingInView] = useScrollAnimation();
  const [showModel, setShowModel] = useState(false);
  const [activeArea, setActiveArea] = useState<number | null>(null);
  
  useEffect(() => {
    controls.start("enter");
    // Delay loading the 3D model to improve page load performance
    const timer = setTimeout(() => {
      setShowModel(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <m.section
      id="research"
      initial="initial"
      animate={controls}
      exit="exit"
      variants={pageVariants}
      className="relative py-20 md:py-24 min-h-screen text-white overflow-hidden"
    >
      {/* Dynamic background that responds to mouse movement */}
      <DynamicBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <m.div 
          ref={headingRef}
          variants={itemVariants}
          initial="initial"
          animate={headingInView ? "enter" : "initial"}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <m.span 
            className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-4 backdrop-blur-sm border border-indigo-500/20"
            variants={itemVariants}
            custom={1}
          >
            Research Focus
          </m.span>
          <m.h1 
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
            variants={itemVariants}
            custom={2}
          >
            Exploring the Frontier of{" "}
            <span className="bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
              Mind & Knowledge
            </span>
          </m.h1>
          <m.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
            custom={3}
          >
            My research spans multiple disciplines, focusing on how we understand intelligence, both natural and artificial, 
            and what this reveals about the nature of knowledge itself.
          </m.p>
        </m.div>
        
        {/* Featured Research Visualization */}
        <m.div
          variants={itemVariants}
          custom={4}
          className="mb-20 md:mb-28"
        >
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-indigo-500/20 shadow-xl">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
                  Interdisciplinary Approach
                </h3>
                <p className="text-gray-300 mb-6">
                  My research bridges the gap between philosophy of mind, cognitive science, and artificial intelligence, 
                  creating a unified framework for understanding consciousness and cognition.
                </p>
                
                <div className="space-y-4">
                  {researchAreas.map((area, index) => (
                    <div 
                      key={area.id}
                      className={`p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                        activeArea === index 
                          ? 'bg-indigo-600/30 border border-indigo-500/40' 
                          : 'bg-slate-800/50 border border-slate-700/30 hover:bg-slate-800/80'
                      }`}
                      onClick={() => setActiveArea(activeArea === index ? null : index)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600/80 to-indigo-900/80 flex items-center justify-center mr-4">
                          <img src={area.iconSrc} alt={area.title} className="w-5 h-5" />
                        </div>
                        <h4 className="font-semibold text-lg">{area.title}</h4>
                      </div>
                      
                      {activeArea === index && (
                        <m.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pl-14"
                        >
                          <p className="text-gray-300 mb-3">{area.description}</p>
                          <h5 className="font-semibold text-indigo-300 mb-2">Key Contributions:</h5>
                          <ul className="list-disc pl-5 space-y-1 text-gray-300">
                            {area.contributions.map((contribution, i) => (
                              <li key={i}>{contribution}</li>
                            ))}
                          </ul>
                        </m.div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link href="/publications" className="inline-flex items-center bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 shadow-lg shadow-indigo-600/20 group">
                    <span>View Research Publications</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <m.div
              className="order-1 lg:order-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {showModel ? (
                <AtomicModel3D className="w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900/60 backdrop-blur-md">
                  <div className="animate-pulse text-gray-400 flex flex-col items-center">
                    <svg className="animate-spin h-8 w-8 mb-2 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading 3D Model...
                  </div>
                </div>
              )}
              
              {/* Glass effect caption */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Interactive Atomic Model</h3>
                    <p className="text-gray-300 text-sm">Hover to interact with elements</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs">
                    Visualization
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </m.div>
        
        {/* Research Impact Section */}
        <m.div
          variants={itemVariants}
          custom={5}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-slate-900/80 to-indigo-950/80 backdrop-blur-md rounded-2xl p-8 border border-indigo-500/20 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center mb-8">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
                  Research Impact & Applications
                </h3>
                <p className="text-gray-300">
                  My work contributes to both theoretical understanding and practical applications in AI ethics, 
                  cognitive enhancement, and the development of more human-centered technology.
                </p>
              </div>
              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-indigo-900/30 backdrop-blur-sm p-4 border border-indigo-500/20">
                  <div className="text-3xl font-bold text-teal-400 mb-1">15+</div>
                  <div className="text-gray-300 text-sm">Published Papers</div>
                </div>
                <div className="rounded-lg bg-indigo-900/30 backdrop-blur-sm p-4 border border-indigo-500/20">
                  <div className="text-3xl font-bold text-purple-400 mb-1">8</div>
                  <div className="text-gray-300 text-sm">Research Collaborations</div>
                </div>
                <div className="rounded-lg bg-indigo-900/30 backdrop-blur-sm p-4 border border-indigo-500/20">
                  <div className="text-3xl font-bold text-pink-400 mb-1">4</div>
                  <div className="text-gray-300 text-sm">Patents Filed</div>
                </div>
                <div className="rounded-lg bg-indigo-900/30 backdrop-blur-sm p-4 border border-indigo-500/20">
                  <div className="text-3xl font-bold text-blue-400 mb-1">12</div>
                  <div className="text-gray-300 text-sm">Speaking Engagements</div>
                </div>
              </div>
            </div>
            
            {/* Horizontal divider */}
            <div className="border-t border-indigo-500/20 my-6"></div>
            
            {/* Key findings */}
            <h4 className="text-xl font-semibold mb-4 text-white">Key Research Findings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Neural Correlates of Consciousness</h5>
                  <p className="text-gray-300 text-sm">Identified specific neural patterns associated with different states of awareness and self-reflection.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">AI Alignment Frameworks</h5>
                  <p className="text-gray-300 text-sm">Developed ethical frameworks for ensuring AI systems remain aligned with human values and intentions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Cognitive Enhancement</h5>
                  <p className="text-gray-300 text-sm">Researched responsible methods for enhancing human cognitive capabilities through technology-human interfaces.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Human-AI Collaboration</h5>
                  <p className="text-gray-300 text-sm">Explored optimal models for human-AI collaborative systems that leverage the strengths of both intelligences.</p>
                </div>
              </div>
            </div>
          </div>
        </m.div>
        
        {/* Interactive Timeline */}
        <m.div
          variants={itemVariants}
          custom={6}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-slate-900/80 to-indigo-950/80 backdrop-blur-md rounded-2xl p-8 border border-indigo-500/20 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-teal-400 bg-clip-text text-transparent">
              Research Timeline
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500/60 via-purple-500/60 to-pink-500/60"></div>
              
              {/* Timeline Items */}
              <div className="space-y-16">
                {/* Timeline Item 1 */}
                <m.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center z-10 shadow-lg shadow-indigo-500/30">
                      <span className="text-white font-bold">1</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:text-right pr-0 md:pr-12">
                      <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs mb-2">
                        2018-2020
                      </div>
                      <h4 className="text-lg font-bold mb-1 text-white">Neural Correlates of Consciousness</h4>
                      <p className="text-gray-400 text-sm">Exploring the relationship between neural activity and subjective experience through advanced fMRI and EEG studies.</p>
                    </div>
                    <div className="pl-0 md:pl-12">
                      <div className="bg-indigo-900/30 backdrop-blur-sm rounded-lg p-4 border border-indigo-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span className="font-semibold text-white">Key Outcome</span>
                        </div>
                        <p className="text-gray-300 text-sm">Identified specific neural signatures associated with different levels of conscious awareness, with implications for understanding disorders of consciousness.</p>
                      </div>
                    </div>
                  </div>
                </m.div>
                
                {/* Timeline Item 2 */}
                <m.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center z-10 shadow-lg shadow-purple-500/30">
                      <span className="text-white font-bold">2</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:text-right pr-0 md:pr-12">
                      <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs mb-2">
                        2020-2021
                      </div>
                      <h4 className="text-lg font-bold mb-1 text-white">AI Alignment Ethics</h4>
                      <p className="text-gray-400 text-sm">Developing frameworks to ensure artificial intelligence systems remain aligned with human values and intentions.</p>
                    </div>
                    <div className="pl-0 md:pl-12">
                      <div className="bg-purple-900/30 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="font-semibold text-white">Key Outcome</span>
                        </div>
                        <p className="text-gray-300 text-sm">Created a novel approach to AI safety involving both technical safeguards and philosophical frameworks for value alignment. Published in leading AI ethics journals.</p>
                      </div>
                    </div>
                  </div>
                </m.div>
                
                {/* Timeline Item 3 */}
                <m.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center z-10 shadow-lg shadow-teal-500/30">
                      <span className="text-white font-bold">3</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:text-right pr-0 md:pr-12">
                      <div className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs mb-2">
                        2021-Present
                      </div>
                      <h4 className="text-lg font-bold mb-1 text-white">Cognitive Enhancement</h4>
                      <p className="text-gray-400 text-sm">Leading a multidisciplinary team researching responsible methods for enhancing human cognitive capabilities.</p>
                    </div>
                    <div className="pl-0 md:pl-12">
                      <div className="bg-teal-900/30 backdrop-blur-sm rounded-lg p-4 border border-teal-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <span className="font-semibold text-white">Key Outcome</span>
                        </div>
                        <p className="text-gray-300 text-sm">Developed non-invasive techniques combining neurofeedback and AI assistance that demonstrate measurable improvements in memory and problem-solving capabilities.</p>
                      </div>
                    </div>
                  </div>
                </m.div>
              </div>
            </div>
          </div>
        </m.div>
        
        {/* Research Publications Highlight */}
        <m.div
          variants={itemVariants}
          custom={7}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-slate-900/80 to-indigo-950/80 backdrop-blur-md rounded-2xl p-8 border border-indigo-500/20 shadow-xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
                  Featured Publications
                </h3>
                <p className="text-gray-400 max-w-2xl">
                  A selection of my most impactful publications exploring the intersection of philosophy of mind and artificial intelligence.
                </p>
              </div>
              <Link href="/publications" className="inline-flex items-center bg-white/5 hover:bg-white/10 mt-4 lg:mt-0 px-4 py-2 rounded-lg transition-all duration-300 group">
                <span className="text-white mr-2">View All Publications</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Publication Card 1 */}
              <m.div 
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl overflow-hidden border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-md bg-blue-900/40 text-blue-300">Journal Article</span>
                    <span className="text-gray-500 text-sm">2022</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-3 line-clamp-2">The Neural Basis of Self-Consciousness: A Computational Approach</h4>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    Integrating neuroscience data with computational models to understand the emergence of self-awareness in biological and artificial systems.
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-700/50">
                    <span className="text-gray-500 text-xs">Journal of Consciousness Studies</span>
                    <div className="flex space-x-1">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-gray-400">neuroscience</span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-gray-400">AI</span>
                    </div>
                  </div>
                </div>
              </m.div>
              
              {/* Publication Card 2 */}
              <m.div 
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl overflow-hidden border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-md bg-purple-900/40 text-purple-300">Conference Paper</span>
                    <span className="text-gray-500 text-sm">2021</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-3 line-clamp-2">Value Alignment for Advanced AI Systems: A Multi-Level Framework</h4>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    Proposing a novel approach to ensuring that autonomous AI systems maintain alignment with human values through multi-layered ethical constraints.
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-700/50">
                    <span className="text-gray-500 text-xs">Proceedings of AAAI Conference</span>
                    <div className="flex space-x-1">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-gray-400">ethics</span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-gray-400">safety</span>
                    </div>
                  </div>
                </div>
              </m.div>
              
              {/* Publication Card 3 */}
              <m.div 
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl overflow-hidden border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-2 py-1 text-xs rounded-md bg-teal-900/40 text-teal-300">Book Chapter</span>
                    <span className="text-gray-500 text-sm">2023</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-3 line-clamp-2">Cognitive Enhancement: Ethical Boundaries and Future Possibilities</h4>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    Examining the ethical implications of emerging technologies for cognitive enhancement and proposing a balanced framework for responsible advancement.
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-700/50">
                    <span className="text-gray-500 text-xs">Oxford University Press</span>
                    <div className="flex space-x-1">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-gray-400">enhancement</span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-gray-400">ethics</span>
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </m.div>
        
        {/* Collaborative Network */}
        <m.div
          variants={itemVariants}
          custom={8}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-slate-900/80 to-indigo-950/80 backdrop-blur-md rounded-2xl p-8 border border-indigo-500/20 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Research Network & Collaborations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Academic Partners</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                      <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-white">Oxford Cognitive Neuroscience Lab</h5>
                        <p className="text-gray-400 text-sm">Joint research on neural correlates of consciousness</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                      <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-white">MIT Media Lab</h5>
                        <p className="text-gray-400 text-sm">Collaborative research on human-AI interfaces</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                      <div className="w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-white">Stanford Philosophy Department</h5>
                        <p className="text-gray-400 text-sm">Interdisciplinary work on AI ethics and philosophy of mind</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Industry Collaborations</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                      <div className="w-12 h-12 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-white">DeepMind</h5>
                        <p className="text-gray-400 text-sm">Advisory role on AI safety and alignment research</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                      <div className="w-12 h-12 rounded-full bg-pink-600/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-white">Neuralink</h5>
                        <p className="text-gray-400 text-sm">Consulting on neural interface ethics and applications</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                      <div className="w-12 h-12 rounded-full bg-cyan-600/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-white">Future of Life Institute</h5>
                        <p className="text-gray-400 text-sm">Contributing research on long-term AI safety</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.div>
        
        {/* Call to Action */}
        <m.div 
          variants={itemVariants}
          custom={9}
          className="text-center mt-20"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium text-lg rounded-full shadow-xl shadow-indigo-700/20 transition-all duration-300 transform hover:-translate-y-1 magnetic group"
            data-cursor-text="Let's Connect"
          >
            <span className="mr-2">Collaborate on Research</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          
          <m.p 
            className="text-gray-400 mt-6 text-sm"
            variants={itemVariants}
            custom={10}
          >
            Interested in exploring research opportunities? Let's connect and discuss potential collaborations.
          </m.p>
        </m.div>
      </div>
    </m.section>
  );
};

export default Research;
