import { m, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Publication } from "@/lib/data";

interface PublicationCardProps {
  publication: Publication;
  delay: number;
}

const cardVariants = {
  initial: { 
    opacity: 0, 
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const PublicationCard = ({ publication, delay }: PublicationCardProps) => {
  const controls = useAnimation();
  const [ref, inView] = useScrollAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  return (
    <m.div
      ref={ref}
      variants={cardVariants}
      initial="initial"
      animate={controls}
      custom={delay}
      className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform duration-500 transform hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-1 bg-primary p-8 flex flex-col justify-center">
          <span className="text-gray-400 font-montserrat text-sm uppercase tracking-wider">{publication.type}</span>
          <h4 className="font-playfair text-white text-2xl font-bold mt-2">{publication.title}</h4>
          <p className="text-gray-300 mt-3 mb-4">{publication.publisher}, {publication.year}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {publication.tags.map((tag, index) => (
              <span 
                key={index} 
                className={`inline-block px-3 py-1 ${index % 2 === 0 ? 'bg-secondary' : 'bg-accent'} text-white text-xs rounded-full`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-accent font-montserrat font-semibold">
                {publication.citationText}
              </span>
            </div>
            <a href={publication.link} className="text-primary hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
          <p className="text-gray-700 mb-6">{publication.abstract}</p>
          <div className="border-t border-gray-200 pt-6">
            <h5 className="font-montserrat font-bold text-primary mb-3">Key Contributions:</h5>
            <ul className="text-gray-700 space-y-1">
              {publication.contributions.map((contribution, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent mr-2 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>{contribution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default PublicationCard;
