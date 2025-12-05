import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ progress, currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Step counter with animation */}
      <div className="flex items-center justify-between mb-3">
        <motion.div 
          key={currentStep}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <span className="text-xs md:text-sm font-semibold text-foreground">
            Question {currentStep + 1}
          </span>
          <span className="text-xs text-muted-foreground">
            of {totalSteps}
          </span>
        </motion.div>
        
        <motion.div 
          key={progress}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-1.5"
        >
          {progress >= 50 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </motion.div>
          )}
          <span className="text-xs md:text-sm font-bold text-primary">
            {Math.round(progress)}%
          </span>
        </motion.div>
      </div>
      
      {/* Progress bar */}
      <div className="relative h-2 md:h-2.5 bg-secondary rounded-full overflow-hidden">
        {/* Animated background stripes */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="h-full w-full"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, hsl(var(--primary) / 0.1) 10px, hsl(var(--primary) / 0.1) 20px)'
            }}
          />
        </div>
        
        {/* Progress fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* End glow */}
          {progress > 5 && (
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>
      
      {/* Step dots */}
      <div className="flex justify-between mt-3 px-1">
        {Array.from({ length: Math.min(totalSteps, 12) }).map((_, index) => {
          const stepIndex = Math.floor((index / 11) * (totalSteps - 1));
          const isCompleted = stepIndex < currentStep;
          const isCurrent = stepIndex === currentStep;
          
          return (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.03 }}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                isCompleted 
                  ? 'bg-primary' 
                  : isCurrent 
                    ? 'bg-primary animate-pulse' 
                    : 'bg-border'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
