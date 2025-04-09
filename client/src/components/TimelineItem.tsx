import { m } from "framer-motion";
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
          className={`inline-block py-1 px-4 rounded-full bg-secondary/90 text-white font-montserrat text-sm font-semibold transform hover:scale-105 transition-transform`}
        >
          {year}
        </div>
        <h3 className="font-playfair text-2xl font-bold text-foreground">{title}</h3>
        <p className="text-accent font-semibold">{institution}</p>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6">
        <div className="w-6 h-6 rounded-full bg-accent border-4 border-white dark:border-slate-800 shadow transition-transform duration-300 transform hover:scale-150"></div>
      </div>
    </m.div>
  );
};

export default TimelineItem;