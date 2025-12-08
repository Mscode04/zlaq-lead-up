import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';

interface TapRankQuestionProps {
  text: string;
  emoji?: string;
  options: string[];
  onAnswer: (value: string[]) => void;
  currentValue?: string[];
}

export function TapRankQuestion({ text, emoji, options, onAnswer, currentValue }: TapRankQuestionProps) {
  const [selected, setSelected] = useState<string[]>(currentValue ?? []);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentValue && currentValue.length === options.length) {
      setSelected(currentValue);
      setIsComplete(true);
    }
  }, [currentValue, options.length]);

  useEffect(() => {
    setIsComplete(selected.length === options.length);
  }, [selected.length, options.length]);

  const handleTap = (option: string) => {
    if (selected.includes(option)) {
      // Allow deselecting only if it's the last item
      if (selected[selected.length - 1] === option) {
        setSelected(prev => prev.filter(s => s !== option));
      }
      return;
    }
    
    setSelected(prev => [...prev, option]);
  };

  const handleReset = () => {
    setSelected([]);
  };

  const getRankPosition = (option: string): number | null => {
    const index = selected.indexOf(option);
    return index >= 0 ? index + 1 : null;
  };

  const availableOptions = options.filter(o => !selected.includes(o));

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
          className="text-5xl md:text-6xl text-center mb-4"
        >
          {emoji}
        </motion.div>
      )}
      
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 text-center leading-relaxed">
        {text}
      </h2>
      
      <p className="text-xs md:text-sm text-muted-foreground text-center mb-6">
        Tap in order from hardest (#1) to easiest
      </p>

      {/* Selected items - shown as ranked list */}
      {selected.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Your ranking
            </span>
            <Button variant="ghost" size="sm" onClick={handleReset} className="h-7 text-xs gap-1">
              <RotateCcw className="w-3 h-3" />
              Reset
            </Button>
          </div>
          <div className="space-y-2">
            {selected.map((option, index) => (
              <motion.div
                key={option}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 border-2 border-primary"
              >
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                  {index + 1}
                </span>
                <span className="flex-1 text-sm font-medium">{option}</span>
                <Check className="w-4 h-4 text-primary" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Available options */}
      {availableOptions.length > 0 && (
        <div className="mb-6">
          {selected.length > 0 && (
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">
              Tap next (#{selected.length + 1})
            </span>
          )}
          <div className="space-y-2">
            {availableOptions.map((option, index) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleTap(option)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-secondary/50 transition-all text-left"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-7 h-7 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-sm font-medium text-muted-foreground shrink-0">
                  ?
                </span>
                <span className="flex-1 text-sm font-medium">{option}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Continue Button */}
      <AnimatePresence>
        {selected.length > 0 && (
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
                className="gap-2 min-w-[160px]"
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
