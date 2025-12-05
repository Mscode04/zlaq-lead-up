import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

interface YesNoQuestionProps {
  text: string;
  emoji?: string;
  onAnswer: (value: boolean) => void;
  currentValue?: boolean;
}

export function YesNoQuestion({ text, emoji, onAnswer, currentValue }: YesNoQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-lg mx-auto px-4"
    >
      {emoji && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.1, stiffness: 200 }}
          className="text-5xl md:text-6xl text-center mb-4 md:mb-6"
        >
          {emoji}
        </motion.div>
      )}
      
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-8 md:mb-10 text-center leading-relaxed">
        {text}
      </h2>
      
      <div className="flex flex-row gap-4 md:gap-6 justify-center">
        {/* Yes Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          whileHover={{ scale: 1.08, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAnswer(true)}
          className={`
            relative flex flex-col items-center justify-center rounded-3xl border-2 transition-all duration-300 overflow-hidden
            w-28 h-32 md:w-36 md:h-40
            ${currentValue === true 
              ? 'bg-primary border-primary text-primary-foreground shadow-2xl shadow-primary/40' 
              : 'bg-card border-border hover:border-primary/50 hover:shadow-lg'
            }
          `}
        >
          {/* Background glow effect when selected */}
          <AnimatePresence>
            {currentValue === true && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 2 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"
              />
            )}
          </AnimatePresence>
          
          {/* Icon */}
          <motion.div 
            className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 ${
              currentValue === true ? 'bg-background/20' : 'bg-primary/10'
            }`}
            animate={currentValue === true ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Check className={`w-6 h-6 md:w-8 md:h-8 ${currentValue === true ? 'text-primary-foreground' : 'text-primary'}`} />
          </motion.div>
          
          <span className="relative z-10 text-lg md:text-xl font-bold">Yes</span>
          
          {/* Sparkle when selected */}
          <AnimatePresence>
            {currentValue === true && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-2 right-2"
              >
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        {/* No Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          whileHover={{ scale: 1.08, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAnswer(false)}
          className={`
            relative flex flex-col items-center justify-center rounded-3xl border-2 transition-all duration-300 overflow-hidden
            w-28 h-32 md:w-36 md:h-40
            ${currentValue === false 
              ? 'bg-foreground border-foreground text-background shadow-2xl' 
              : 'bg-card border-border hover:border-foreground/30 hover:shadow-lg'
            }
          `}
        >
          {/* Background effect when selected */}
          <AnimatePresence>
            {currentValue === false && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-background to-transparent"
              />
            )}
          </AnimatePresence>
          
          {/* Icon */}
          <motion.div 
            className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 ${
              currentValue === false ? 'bg-background/20' : 'bg-muted'
            }`}
            animate={currentValue === false ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <X className={`w-6 h-6 md:w-8 md:h-8 ${currentValue === false ? 'text-background' : 'text-muted-foreground'}`} />
          </motion.div>
          
          <span className="relative z-10 text-lg md:text-xl font-bold">No</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
