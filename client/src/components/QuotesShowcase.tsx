import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Quote {
  id: number;
  text: string;
  author: string;
  role: string;
  source?: string;
}

const quotes: Quote[] = [
  {
    id: 1,
    text: "Dr. Mukherjee's work on extended cognition has fundamentally changed how we think about the boundaries of the human mind in relation to technology.",
    author: "Dr. Sarah Chen",
    role: "Professor of Cognitive Science, MIT",
    source: "The Cognitive Science Journal"
  },
  {
    id: 2,
    text: "Few scholars are able to bridge philosophy and artificial intelligence with the clarity and insight that Alloy brings to these complex intersections.",
    author: "Thomas Reynolds",
    role: "Director of AI Ethics, Stanford University"
  },
  {
    id: 3,
    text: "His latest book offers a profound examination of how digital technologies are reshaping our cognitive architecture and what that means for human identity.",
    author: "Maya Williams",
    role: "Technology Editor, The Atlantic"
  },
];

const QuotesShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleRef, titleInView] = useScrollAnimation(0.1);
  
  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section ref={containerRef} className="py-28 relative bg-gradient-to-b from-slate-900 to-indigo-950 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM0ZjQ2ZTUiIGZpbGwtb3BhY2l0eT0iMC4wMjUiPjxwYXRoIGQ9Ik0zNiAzNGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptLTIgMGMwLTEuMTA1LS44OTUtMi0yLTJzLTIgLjg5NS0yIDIgLjg5NSAyIDIgMiAyLS44OTUgMi0yem0zMiAxNmMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptLTIgMGMwLTEuMTA1LS44OTUtMi0yLTJzLTIgLjg5NS0yIDIgLjg5NSAyIDIgMiAyLS44OTUgMi0yem0tMzIgMGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptLTIgMGMwLTEuMTA1LS44OTUtMi0yLTJzLTIgLjg5NS0yIDIgLjg5NSAyIDIgMiAyLS44OTUgMi0yem0wLTE2YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0tMiAwYzAtMS4xMDUtLjg5NS0yLTItMnMtMiAuODk1LTIgMiAuODk1IDIgMiAyIDItLjg5NSAyLTJ6bTMyLTE2YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0tMiAwYzAtMS4xMDUtLjg5NS0yLTItMnMtMiAuODk1LTIgMiAuODk1IDIgMiAyIDItLjg5NSAyLTJ6bS0xNi0xNmMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptLTIgMGMwLTEuMTA1LS44OTUtMi0yLTJzLTIgLjg5NS0yIDIgLjg5NSAyIDIgMiAyLS44OTUgMi0yem0tMTYtMTZjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMC0xLjEwNS0uODk1LTItMi0ycy0yIC44OTUtMiAyIC44OTUgMiAyIDIgMi0uODk1IDItMnptMzIgMGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptLTIgMGMwLTEuMTA1LS44OTUtMi0yLTJzLTIgLjg5NS0yIDIgLjg5NSAyIDIgMiAyLS44OTUgMi0yeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')]"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-600/10 to-transparent pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <m.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white font-playfair mb-6">
            What Others <span className="text-teal-400">Say</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Perspectives on my research from colleagues and publications in the field
          </p>
        </m.div>
        
        <m.div 
          style={{ opacity }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          <m.div 
            style={{ y: y1 }}
            className="md:col-span-5 md:col-start-2"
          >
            <QuoteCard quote={quotes[0]} delay={0.1} />
          </m.div>
          
          <m.div 
            style={{ y: y2 }}
            className="md:col-span-5 md:mt-24"
          >
            <QuoteCard quote={quotes[1]} delay={0.3} />
          </m.div>
          
          <m.div 
            style={{ y: y1 }}
            className="md:col-span-5 md:col-start-4"
          >
            <QuoteCard quote={quotes[2]} delay={0.5} />
          </m.div>
        </m.div>
      </div>
    </section>
  );
};

interface QuoteCardProps {
  quote: Quote;
  delay: number;
}

const QuoteCard = ({ quote, delay }: QuoteCardProps) => {
  const [ref, inView] = useScrollAnimation(0.1);
  
  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="bg-gradient-to-br from-slate-800/80 to-indigo-900/80 backdrop-blur-md rounded-xl p-8 shadow-xl border border-slate-700/50"
    >
      <svg
        className="text-teal-400 h-8 w-8 mb-4"
        fill="currentColor"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </svg>

      <p className="text-white text-lg italic mb-6 leading-relaxed">
        "{quote.text}"
      </p>
      
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500/30 to-purple-600/30 flex items-center justify-center text-white font-bold">
          {quote.author.charAt(0)}
        </div>
        <div className="ml-4">
          <h4 className="text-white font-semibold">{quote.author}</h4>
          <p className="text-gray-300 text-sm">{quote.role}</p>
          {quote.source && (
            <p className="text-purple-400 text-xs mt-1">{quote.source}</p>
          )}
        </div>
      </div>
    </m.div>
  );
};

export default QuotesShowcase;