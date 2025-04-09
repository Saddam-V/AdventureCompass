import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Research", path: "/research" },
  { label: "Publications", path: "/publications" },
  { label: "Contact", path: "/contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full top-0 z-50 px-4 py-3 transition-all duration-500 ${
        isScrolled ? "bg-primary bg-opacity-95 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-playfair font-bold transition-colors duration-300">
          <span className="text-accent">Dr. Alloy</span> <span className="text-white">Mukherjee</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${
                location === item.path 
                  ? "text-accent" 
                  : "text-white hover:text-accent"
              } transition-colors duration-300 font-montserrat tracking-wide`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-primary bg-opacity-95 backdrop-filter backdrop-blur-sm py-6 px-4"
          >
            <div className="flex flex-col space-y-6 items-center">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`${
                    location === item.path 
                      ? "text-accent" 
                      : "text-white hover:text-accent"
                  } transition-colors duration-300 font-montserrat tracking-wide py-2`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
