import { useEffect } from "react";
import { m, useAnimation } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
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
              <p>
                I am a philosopher with a specialization in epistemology, philosophy of mind, and artificial intelligence. My research investigates the nature of knowledge, rationality, and intelligence.
              </p>
              <p>
                Currently serving as a faculty member at the Department of Philosophy, University of California, I combine my academic research with practical applications in the field of AI ethics and cognitive science.
              </p>
              <p>
                With over 15 years of experience in academia, I've published numerous papers in leading journals and presented my work at international conferences.
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
