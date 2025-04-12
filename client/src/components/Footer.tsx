import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="text-2xl font-playfair font-bold mb-4 inline-block">
              <span className="text-accent">Dr. Alloy</span> <span className="text-white">Mukherjee</span>
            </Link>
            <p className="text-gray-400 mb-6">Exploring the intersection of philosophy, artificial intelligence, and cognitive science.</p>
            <p className="text-gray-500">&copy; {new Date().getFullYear()} Dr. Alloy Mukherjee. All rights reserved.</p>
          </div>
          
          <div>
            <h5 className="font-montserrat font-bold text-lg mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-montserrat font-bold text-lg mb-4">Newsletter</h5>
            <p className="text-gray-400 mb-4">Subscribe to receive updates on my latest research and publications.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border border-white/20 rounded-l px-4 py-2 focus:outline-none focus:border-accent transition-colors w-full"
                aria-label="Email address"
              />
              <button 
                type="submit" 
                className="bg-accent hover:bg-opacity-90 px-4 py-2 rounded-r transition-colors duration-300"
                aria-label="Subscribe"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-10 text-center text-gray-500 text-sm">
          <p>Website designed and developed proudly by <a href="https://www.assignova.com/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">AssigNova</a>.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
