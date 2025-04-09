import { useEffect } from "react";
import { m, useAnimation } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface TimelineItemProps {
  year: string;
  title: string;
  institution: string;
  description: string;
  alignment: "left" | "right";
  delay: number;
}

const TimelineItem = ({ year, title, institution, description, alignment, delay }: TimelineItemProps) => {
  const [itemRef, itemInView] = useScrollAnimation(0.1);

  const containerClasses = alignment === "left" 
    ? "flex-row-reverse md:pr-12 text-right"
    : "md:pl-12 text-left";

  return (
    <m.div 
      ref={itemRef}
      initial={{ opacity: 0, y: 25, x: alignment === "left" ? 50 : -50 }}
      animate={itemInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 25, x: alignment === "left" ? 50 : -50 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={`flex items-center ${containerClasses}`}
    >
      <div className={`w-full md:w-1/2 space-y-3 ${alignment === "right" ? "text-left" : "text-right"}`}>
        <div 
          className={`inline-block py-1 px-4 rounded-full bg-primary text-white font-montserrat text-sm font-semibold transform hover:scale-105 transition-transform`}
        >
          {year}
        </div>
        <h3 className="font-playfair text-2xl font-bold">{title}</h3>
        <p className="text-accent font-semibold">{institution}</p>
        <p className="text-gray-700">{description}</p>
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6">
        <div className="w-6 h-6 rounded-full bg-accent border-4 border-white shadow transition-transform duration-300 transform hover:scale-150"></div>
      </div>
    </m.div>
  );
};

const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
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
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useScrollAnimation();
  const [imageRef, imageInView] = useScrollAnimation();
  const [detailsRef, detailsInView] = useScrollAnimation();

  useEffect(() => {
    controls.start("enter");
  }, [controls]);

  return (
    <m.section
      id="about"
      initial="initial"
      animate={controls}
      exit="exit"
      variants={pageVariants}
      className="relative py-20 md:py-32 overflow-hidden bg-neutral"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <m.div 
            ref={imageRef} 
            variants={itemVariants}
            initial="initial"
            animate={imageInView ? "enter" : "initial"}
            className="relative"
          >
            <div className="w-full h-[500px] rounded-lg overflow-hidden relative group perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-accent/30 mix-blend-overlay z-10"></div>
              <m.div 
                whileHover={{ 
                  rotateX: 5, 
                  rotateY: 10, 
                  transition: { duration: 0.5 } 
                }}
                className="w-full h-full transition-transform duration-500 ease-out preserve-3d"
              >
                <img 
                  src="https://images.unsplash.com/photo-1573165850883-9b0e18c44bd2?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3" 
                  alt="Dr. Alloy Mukherjee" 
                  className="w-full h-full object-cover object-center"
                />
              </m.div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-secondary rounded-full"></div>
          </m.div>
          
          <m.div 
            ref={detailsRef}
            variants={itemVariants}
            initial="initial"
            animate={detailsInView ? "enter" : "initial"}
            className="space-y-6"
          >
            <m.div variants={itemVariants}>
              <h2 className="font-montserrat text-lg text-accent uppercase tracking-widest mb-2">About Me</h2>
              <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-primary">
                Philosopher, <br/>
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Scholar & Educator
                </span>
              </h3>
            </m.div>
            
            <m.div variants={itemVariants} className="space-y-4 text-gray-700 mb-10">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:text-accent first-letter:float-left">
                I am a Professor of Philosophy at Princeton University, specializing in philosophy of mind, cognitive science, and epistemology. My work bridges traditional philosophical questions with contemporary scientific research on consciousness, artificial intelligence, and human reasoning.
              </p>
              <p>
                My research program investigates what I call "hybrid cognition"—how human understanding emerges from the interplay between formal reasoning, embodied experience, and technological extension. I am particularly interested in how AI systems both illuminate and transform our understanding of human thought.
              </p>
              <p>
                I've authored four books and over thirty scholarly articles exploring the boundaries of mind, knowledge, and technology. My latest book, <em className="text-accent">The Extended Mind Revisited</em> (Oxford University Press, 2022), examines how digital technologies are reshaping human cognitive capacities.
              </p>
            </m.div>
            
            <m.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-l-4 border-secondary pl-4">
                <h4 className="font-montserrat font-bold text-lg mb-1">Education</h4>
                <p className="text-gray-600">Ph.D. in Philosophy<br/>Oxford University</p>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-montserrat font-bold text-lg mb-1">Specialization</h4>
                <p className="text-gray-600">Epistemology<br/>AI Philosophy</p>
              </div>
            </m.div>
            
            <m.a 
              href="#research" 
              variants={itemVariants}
              className="inline-flex items-center font-montserrat font-semibold text-primary group"
            >
              <span className="mr-2 group-hover:mr-4 transition-all duration-300">Explore My Research</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 transform group-hover:translate-x-2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </m.a>
          </m.div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-32">
        <m.div 
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl font-bold mb-4 inline-block">
            Academic Journey
            <div className="h-1 w-full bg-accent mt-2"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Exploring the evolution of my research and career over the years</p>
        </m.div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-secondary via-accent to-secondary"></div>
          
          {/* Timeline items */}
          <div className="space-y-24 relative">
            <TimelineItem 
              year="2005" 
              title="Doctoral Degree" 
              institution="Oxford University"
              description="Completed Ph.D. in Philosophy with dissertation on 'Consciousness and Cognitive Integration'"
              alignment="right"
              delay={0.1}
            />
            
            <TimelineItem 
              year="2008" 
              title="Assistant Professor" 
              institution="Columbia University"
              description="Began teaching philosophy of mind and cognitive science courses while developing early research on extended cognition"
              alignment="left"
              delay={0.3}
            />
            
            <TimelineItem 
              year="2013" 
              title="Associate Professor" 
              institution="University of California"
              description="Expanded research program to include artificial intelligence and computational models of cognition"
              alignment="right"
              delay={0.5}
            />
            
            <TimelineItem 
              year="2017" 
              title="AI Ethics Research Chair" 
              institution="Princeton University"
              description="Led interdisciplinary research team exploring ethical dimensions of artificial intelligence and machine learning"
              alignment="left"
              delay={0.7}
            />
            
            <TimelineItem 
              year="2021" 
              title="Full Professor" 
              institution="Princeton University"
              description="Published landmark work on hybrid cognition and continued cross-disciplinary collaborations in cognitive science"
              alignment="right"
              delay={0.9}
            />
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3" 
          alt="Abstract texture" 
          className="w-full h-full object-cover"
        />
      </div>
    </m.section>
  );
};

export default About;
