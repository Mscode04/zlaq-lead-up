import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, MessageCircle, Users, Download, Wind, ChevronDown, Trophy, Sparkles } from 'lucide-react';
import { TestResult, LeadFormData } from '@/types/test';
import { getTier } from '@/lib/scoring';
import { downloadReport, generateWhatsAppMessage } from '@/lib/pdfGenerator';
import { ScoreBar } from './ScoreBar';
import { ProfileBadge } from './ProfileBadge';
import { ExerciseCard } from './ExerciseCard';
import { Button } from '@/components/ui/button';

interface ResultCardProps {
  result: TestResult;
  userData?: LeadFormData;
  onJoinCommunity?: () => void;
}

const profileDescriptions: Record<string, string> = {
  'emotional-tension': 'Anxiety-driven speech challenges. Fluency shaping + anxiety management recommended.',
  'motor-tension': 'Motor-dominant with good coping. Focus on motor exercises.',
  'avoidance-dominant': 'Situation avoidance is main challenge. Exposure therapy helps.',
  'motor-severe': 'Significant motor patterns. Professional therapy recommended.',
  'low-risk': 'Speech within typical range. Maintenance exercises help.',
};

export function ResultCard({ result, userData }: ResultCardProps) {
  const tier = getTier(result.riskScore, result.emotionScore);
  const [showExercises, setShowExercises] = useState(false);

  const handleDownloadPDF = () => {
    if (userData) downloadReport(result, userData);
  };

  const handleWhatsAppShare = () => {
    if (userData) {
      const message = generateWhatsAppMessage(result, userData);
      window.open(`https://wa.me/${userData.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-lg mx-auto px-4"
    >
      {/* Celebration */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', delay: 0.1 }}
        className="flex flex-col items-center gap-2 mb-5"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <Trophy className="w-10 h-10 text-primary" />
          <Sparkles className="w-4 h-4 text-primary absolute -top-1 -right-1 animate-pulse" />
        </motion.div>
        <h1 className="text-lg font-bold text-foreground">Profile Ready! 🎉</h1>
      </motion.div>

      {/* Main Card */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-card to-secondary/20 rounded-2xl border border-primary/20 shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-primary/10">
          <div className="text-center space-y-1">
            <ProfileBadge tier={tier} />
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {result.profileLabel}
            </h2>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Scores */}
          <div className="space-y-1 pb-3 border-b border-border/30">
            <ScoreBar label="Risk" score={result.riskScore} type="risk" delay={0.4} />
            <ScoreBar label="Emotion" score={result.emotionScore} type="emotion" delay={0.6} />
            <ScoreBar label="Function" score={result.functionScore} type="function" delay={0.8} />
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-foreground bg-primary/5 p-3 rounded-lg border border-primary/10"
          >
            {profileDescriptions[result.profileType]}
          </motion.p>

          {/* Triggers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-1 mb-2">
              <Target className="w-4 h-4 text-primary" />
              Triggers
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {result.triggers.map((trigger) => (
                <span 
                  key={trigger} 
                  className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                >
                  {trigger}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Exercises */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="rounded-lg border border-border/30 overflow-hidden"
          >
            <button
              onClick={() => setShowExercises(!showExercises)}
              className="w-full flex items-center justify-between font-semibold text-sm p-3 bg-secondary/15 hover:bg-secondary/30 transition-colors"
            >
              <span className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-primary" />
                Exercises ({result.exercises.length})
              </span>
              <motion.div animate={{ rotate: showExercises ? 180 : 0 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {showExercises && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border/30 max-h-80 overflow-y-auto"
                >
                  <div className="p-3 space-y-2">
                    {result.exercises.map((exercise) => (
                      <ExerciseCard key={exercise.id} exercise={exercise} index={0} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="space-y-2 pt-2"
          >
            {userData && (
              <>
                <Button variant="hero" size="sm" onClick={handleDownloadPDF} className="gap-2 w-full">
                  <Download className="w-3.5 h-3.5" />
                  Report
                </Button>
                <Button variant="outline" size="sm" onClick={handleWhatsAppShare} className="gap-2 w-full">
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </Button>
              </>
            )}
            <Button 
              variant="lime" 
              size="sm" 
              onClick={() => window.open('https://chat.whatsapp.com/GJdRe8ZhIHBHwT3TiadtkL/', '_blank')}
              className="gap-2 w-full"
            >
              <Users className="w-3.5 h-3.5" />
              Community
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
