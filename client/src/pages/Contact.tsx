import { useEffect } from "react";
import { m, useAnimation } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ContactForm from "@/components/ContactForm";

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

const Contact = () => {
  const controls = useAnimation();
  const [leftColRef, leftColInView] = useScrollAnimation();
  const [rightColRef, rightColInView] = useScrollAnimation();

  useEffect(() => {
    controls.start("enter");
  }, [controls]);

  return (
    <m.section
      id="contact"
      initial="initial"
      animate={controls}
      exit="exit"
      variants={pageVariants}
      className="relative py-24 md:py-32 bg-primary text-white"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <m.div 
              ref={leftColRef}
              variants={itemVariants}
              initial="initial"
              animate={leftColInView ? "enter" : "initial"}
            >
              <h2 className="font-montserrat text-lg text-accent uppercase tracking-widest mb-2">Get In Touch</h2>
              <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-8">
                Interested in{" "}
                <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Collaboration?
                </span>
              </h3>
              
              <p className="text-gray-300 mb-8">
                I'm always open to discussing research collaborations, speaking opportunities, or consulting projects. Whether you have a question about my work or are interested in working together, I'd love to hear from you.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <div className="text-accent text-xl mt-1 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-bold mb-1">Email</h4>
                    <p className="text-gray-300">contact@aloymukherjee.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-accent text-xl mt-1 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-bold mb-1">Office</h4>
                    <p className="text-gray-300">Department of Philosophy<br/>University of California<br/>Berkeley, CA 94720</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-accent text-xl mt-1 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-bold mb-1">Office Hours</h4>
                    <p className="text-gray-300">Tuesday & Thursday<br/>2:00 PM - 4:00 PM<br/>Or by appointment</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-accent transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-accent transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-accent transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.352 0 0 5.352 0 12s5.352 12 12 12 12-5.352 12-12S18.648 0 12 0zm2.8 4.333c-.8 0-1.4.6-1.4 1.4 0 .8.6 1.4 1.4 1.4.8 0 1.4-.6 1.4-1.4 0-.8-.6-1.4-1.4-1.4zM18.4 9.467c.133 1.2.267 3.066.267 4.533s-.133 3.333-.267 4.533c-.133 1.067-.667 1.867-1.733 2-1.467.133-3.6.267-6.667.267s-5.2-.133-6.667-.267c-1.067-.133-1.6-.933-1.733-2-.133-1.2-.267-3.066-.267-4.533s.133-3.333.267-4.533c.133-1.067.667-1.867 1.733-2C5.8 7.333 7.933 7.2 11 7.2s5.2.133 6.667.267c1.067.133 1.6.933 1.733 2zM8.667 15.333L15.333 12 8.667 8.667v6.666z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-accent transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.14 4.376a7.624 7.624 0 0 1 7.636 7.636 7.624 7.624 0 0 1-7.636 7.636 7.624 7.624 0 0 1-7.636-7.636 7.624 7.624 0 0 1 7.636-7.636zm3.88 3.226h-1.6c-.16 0-.293.057-.4.168-.107.113-.16.244-.16.397v1.445h2.16l-.32 2.16h-1.84v5.516h-2.24v-5.516H9.98v-2.16h1.84V8.697c0-.837.233-1.483.7-1.937.467-.453 1.083-.68 1.848-.68h1.632v1.522z" />
                  </svg>
                </a>
              </div>
            </m.div>
            
            <m.div 
              ref={rightColRef}
              variants={itemVariants}
              initial="initial"
              animate={rightColInView ? "enter" : "initial"}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                <h4 className="font-playfair text-2xl font-bold mb-6">Send a Message</h4>
                <ContactForm />
              </div>
            </m.div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-10 mix-blend-overlay pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3" 
          alt="Abstract texture" 
          className="w-full h-full object-cover"
        />
      </div>
    </m.section>
  );
};

export default Contact;
