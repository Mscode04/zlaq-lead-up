import { motion, AnimatePresence } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

interface MultipleChoiceQuestionProps {
  text: string;
  emoji?: string;
  options: string[];
  onAnswer: (value: string) => void;
  currentValue?: string;
}

const optionEmojis = ['🅰️', '🅱️', '©️', '🔷'];

export function MultipleChoiceQuestion({ text, emoji, options, onAnswer, currentValue }: MultipleChoiceQuestionProps) {
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
          transition={{ type: 'spring', delay: 0.1 }}
          className="text-5xl md:text-6xl text-center mb-4 md:mb-6"
        >
          {emoji}
        </motion.div>
      )}
      
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-6 md:mb-8 text-center leading-relaxed">
        {text}
      </h2>
      
      <div className="flex flex-col gap-3">
        {options.map((option, index) => {
          const isSelected = currentValue === option;
          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.02, x: 8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAnswer(option)}
              className={`
                relative w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden
                ${isSelected 
                  ? 'bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/30' 
                  : 'bg-card border-border hover:border-primary/40 hover:bg-secondary/50 hover:shadow-md'
                }
              `}
            >
              {/* Selection indicator */}
              <motion.div 
                className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all
                  ${isSelected 
                    ? 'bg-background/20' 
                    : 'bg-secondary border border-border'
                  }
                `}
                animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {isSelected ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <Check className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="letter"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="text-sm md:text-base font-bold text-muted-foreground"
                    >
                      {String.fromCharCode(65 + index)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Option text */}
              <span className="flex-1 text-sm md:text-base font-medium">{option}</span>
              
              {/* Right indicator */}
              <motion.div
                animate={isSelected ? { scale: [0, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/30" />
                )}
              </motion.div>
              
              {/* Background animation on selection */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    className="absolute inset-y-0 left-0 w-1 bg-background/30 origin-left"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
