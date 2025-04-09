import { useState, useEffect } from "react";
import { m, AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

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
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
        isScrolled 
          ? isDark
            ? "bg-slate-900/95 shadow-lg shadow-black/20 backdrop-blur-md"
            : "bg-white/95 shadow-lg shadow-black/5 backdrop-blur-md" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-playfair font-bold transition-colors duration-300">
          <span className="text-accent">Dr. Alloy</span> 
          <span className={`${isDark ? "text-white" : "text-slate-800"}`}>Mukherjee</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${
                location === item.path 
                  ? "text-accent" 
                  : isDark
                    ? "text-gray-200 hover:text-accent"
                    : "text-gray-800 hover:text-accent"
              } transition-colors duration-300 font-montserrat tracking-wide`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle className="ml-2" />
        </div>
        
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button 
            onClick={toggleMobileMenu}
            className={`focus:outline-none ${isDark ? "text-white" : "text-slate-800"}`}
            aria-label="Toggle mobile menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="w-6 h-5 flex flex-col justify-between"
            >
              <motion.span
                variants={{
                  open: { rotate: 45, y: 9, originX: 0 },
                  closed: { rotate: 0, y: 0 }
                }}
                transition={{ duration: 0.4 }}
                className={`block h-0.5 rounded-full ${isDark ? "bg-white" : "bg-slate-800"}`}
              />
              <motion.span
                variants={{
                  open: { opacity: 0 },
                  closed: { opacity: 1 }
                }}
                transition={{ duration: 0.4 }}
                className={`block h-0.5 rounded-full ${isDark ? "bg-white" : "bg-slate-800"}`}
              />
              <motion.span
                variants={{
                  open: { rotate: -45, y: -9, originX: 0 },
                  closed: { rotate: 0, y: 0 }
                }}
                transition={{ duration: 0.4 }}
                className={`block h-0.5 rounded-full ${isDark ? "bg-white" : "bg-slate-800"}`}
              />
            </motion.div>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden absolute top-full left-0 w-full ${
              isDark 
                ? "bg-slate-900/95 border-t border-slate-800" 
                : "bg-white/95 border-t border-slate-200"
            } backdrop-blur-md py-6 px-4 overflow-hidden`}
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
                      : isDark
                        ? "text-gray-200 hover:text-accent"
                        : "text-gray-800 hover:text-accent"
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
