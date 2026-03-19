import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.5 }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90]"
        >
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 bg-primary/20 hover:bg-primary border border-primary/50 text-white rounded-xl backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300 text-primary group-hover:text-white" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollUpButton;
