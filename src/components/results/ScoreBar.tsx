import { motion } from 'framer-motion';
import { getScoreColor, getScoreLabel } from '@/lib/scoring';

interface ScoreBarProps {
  label: string;
  score: number;
  type: 'risk' | 'emotion' | 'function';
  delay?: number;
}

export function ScoreBar({ label, score, type, delay = 0 }: ScoreBarProps) {
  const colorClass = getScoreColor(score, type === 'function');
  const scoreLabel = getScoreLabel(score, type);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold text-foreground">{scoreLabel} ({score}%)</span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
