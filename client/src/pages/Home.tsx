import { useEffect } from "react";
import { m, useAnimation } from "framer-motion";
import HeroSection from "@/components/HeroSection";
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
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Home = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("enter");
  }, [controls]);

  return (
    <m.div
      initial="initial"
      animate={controls}
      exit="exit"
      variants={pageVariants}
      className="w-full"
    >
      <HeroSection />
      <div className="h-[100px]"></div>
    </m.div>
  );
};

export default Home;
