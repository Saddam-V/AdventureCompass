import { useEffect } from "react";
import { m, useAnimation } from "framer-motion";
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

const Blog = () => {
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
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Blog</h1>
            <p className="text-lg text-gray-300 mt-4">
              Discover insights, stories, and updates from our journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example blog post card */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Post Title</h2>
              <p className="text-gray-400 mb-4">
                A brief description of the blog post content goes here.
              </p>
              <Link href="/blog/post-1">
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                  Read More
                </button>
              </Link>
            </div>
            {/* Add more blog post cards as needed */}
          </div>
        </div>
      </section>
    </m.div>
  );
};

export default Blog;