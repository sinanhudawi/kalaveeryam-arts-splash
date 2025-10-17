import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Brush, Sparkles } from 'lucide-react';

interface IntroSplashProps {
  onComplete: () => void;
}

export const IntroSplash = ({ onComplete }: IntroSplashProps) => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(true), 500);
    const completeTimer = setTimeout(onComplete, 4000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-watercolor"
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -200],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute"
            >
              {i % 3 === 0 ? (
                <Music className="w-6 h-6 text-primary/30" />
              ) : i % 3 === 1 ? (
                <Brush className="w-6 h-6 text-gold/30" />
              ) : (
                <Sparkles className="w-6 h-6 text-primary-glow/30" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative text-center z-10 px-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <Music className="w-16 h-16 text-white animate-float" />
            </div>
          </motion.div>

          {showTitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 watercolor-text">
                Kalaveeryam
              </h1>
              <p className="text-2xl md:text-3xl gold-text font-semibold">
                MIAC Arts Fest
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
