import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface EmojiScaleQuestionProps {
  text: string;
  emoji?: string;
  onAnswer: (value: number) => void;
  currentValue?: number;
}

const scaleOptions = [
  { value: 0, emoji: '😌', label: 'Not at all', color: 'hsl(var(--score-low))' },
  { value: 2, emoji: '🙂', label: 'Rarely', color: 'hsl(142 76% 46%)' },
  { value: 4, emoji: '😐', label: 'Sometimes', color: 'hsl(48 96% 53%)' },
  { value: 7, emoji: '😟', label: 'Often', color: 'hsl(25 95% 53%)' },
  { value: 10, emoji: '😰', label: 'Always', color: 'hsl(var(--score-high))' },
];

export function EmojiScaleQuestion({ text, emoji, onAnswer, currentValue }: EmojiScaleQuestionProps) {
  const [selected, setSelected] = useState<number | null>(currentValue ?? null);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (currentValue !== undefined) {
      setSelected(currentValue);
      setShowContinue(true);
    }
  }, [currentValue]);

  const handleSelect = (value: number) => {
    setSelected(value);
    setShowContinue(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-xl mx-auto px-4"
    >
      {emoji && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="text-5xl md:text-6xl text-center mb-4"
        >
          {emoji}
        </motion.div>
      )}
      
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-8 md:mb-10 text-center leading-relaxed">
        {text}
      </h2>
      
      {/* Emoji Scale Options */}
      <div className="grid grid-cols-5 gap-2 md:gap-3 mb-8">
        {scaleOptions.map((option, index) => {
          const isSelected = selected === option.value;
          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => handleSelect(option.value)}
              className={`relative flex flex-col items-center p-2 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all duration-300 ${
                isSelected 
                  ? 'border-primary bg-primary/10 shadow-lg scale-105' 
                  : 'border-border bg-card hover:border-primary/30 hover:bg-secondary/50'
              }`}
              whileHover={{ scale: isSelected ? 1.05 : 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Selection indicator */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Emoji */}
              <motion.span 
                className="text-2xl md:text-4xl mb-1 md:mb-2"
                animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {option.emoji}
              </motion.span>
              
              {/* Label */}
              <span className={`text-[10px] md:text-xs font-medium text-center ${
                isSelected ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {option.label}
              </span>
              
              {/* Bottom color bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl md:rounded-b-2xl"
                style={{ backgroundColor: option.color }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isSelected ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          );
        })}
      </div>
      
      {/* Continue Button */}
      <AnimatePresence>
        {showContinue && selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => onAnswer(selected)} 
                className="gap-2 min-w-[160px] md:min-w-[200px]"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
