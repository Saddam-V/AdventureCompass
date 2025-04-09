import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isDark = theme === "dark";

  return (
    <motion.button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative h-9 w-12 rounded-full p-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        isDark 
          ? "bg-indigo-700 hover:bg-indigo-600" 
          : "bg-indigo-200 hover:bg-indigo-300"
      } ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="pointer-events-none relative h-7 w-7 rounded-full"
        initial={false}
        animate={{
          x: isDark ? "calc(100% - 4px)" : "0%",
          rotate: isHovered ? [0, -15, 15, -15, 0] : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          rotate: { duration: 0.5 },
          scale: { duration: 0.2 },
        }}
      >
        {/* Sun */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-5 w-5 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50" />
        </motion.div>

        {/* Moon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-5 w-5 rounded-full bg-slate-200 shadow-lg shadow-slate-200/50" />
          <div className="absolute right-[6px] top-[3px] h-2 w-2 rounded-full bg-slate-700" />
        </motion.div>
      </motion.div>

      {/* Stars */}
      {isDark && (
        <>
          <motion.div
            className="absolute right-[8px] top-[3px] h-[3px] w-[3px] rounded-full bg-slate-200"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
          <motion.div
            className="absolute right-[15px] top-[6px] h-[2px] w-[2px] rounded-full bg-slate-200"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        </>
      )}
    </motion.button>
  );
}