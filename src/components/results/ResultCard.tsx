import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Target, MessageCircle, Users, Download, Headphones, Wind, ChevronDown, Trophy, Sparkles } from 'lucide-react';
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
  'emotional-tension': 'SRPP™ result: Moderate to High Risk. Clinical tests used: Stuttering Risk & Pattern Predictor (SRPP™), Speech Anxiety & Situational Trigger Scale (SASTS). This suggests a mix of motor difficulty and anticipatory anxiety. Many people with this profile make strong gains with fluency shaping + fear-reduction work.',
  'motor-tension': 'SRPP™ result: Motor-Dominant with Compensatory Strengths. You show physical tension patterns but have developed good coping mechanisms. Focused motor exercises combined with confidence building will help you further.',
  'avoidance-dominant': 'SRPP™ result: Avoidance-Dominant Pattern. Your main challenge is avoiding situations rather than the stuttering itself. Gradual exposure therapy combined with communication strategies will be most effective.',
  'motor-severe': 'SRPP™ result: Motor-Dominant Severe. You show significant physical speech patterns. A structured therapy program with a speech-language pathologist is recommended for best outcomes.',
  'low-risk': 'SRPP™ result: Low Risk / Mild Pattern. Your speech patterns are within typical range with minimal impact. Some awareness exercises and communication strategies can help maintain fluency.',
};

export function ResultCard({ result, userData, onJoinCommunity }: ResultCardProps) {
  const tier = getTier(result.riskScore, result.emotionScore);
  const [showExercises, setShowExercises] = useState(false);

  const handleDownloadPDF = () => {
    if (userData) {
      downloadReport(result, userData);
    }
  };

  const handleWhatsAppShare = () => {
    if (userData) {
      const message = generateWhatsAppMessage(result, userData);
      window.open(`https://wa.me/${userData.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
    }
  };

  const handleContactAdmin = () => {
    window.open('https://wa.me/918089124307', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      {/* Celebration Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', delay: 0.1 }}
        className="flex flex-col items-center justify-center gap-2 mb-6 md:mb-8"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <Trophy className="w-12 h-12 md:w-16 md:h-16 text-primary" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h1 className="text-lg md:text-xl font-bold text-foreground">Profile Complete!</h1>
          <p className="text-xs md:text-sm text-muted-foreground">Here's your personalized speech profile</p>
        </motion.div>
      </motion.div>

      {/* Main Result Card */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl md:rounded-3xl border border-border shadow-2xl overflow-hidden"
      >
        {/* Header gradient */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 md:p-6 lg:p-8 border-b border-border">
          <div className="text-center space-y-3 md:space-y-4">
            <ProfileBadge tier={tier} />
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground"
            >
              {result.profileLabel}
            </motion.h2>
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8 space-y-5 md:space-y-6">
          {/* Scores */}
          <div className="space-y-3 md:space-y-4 py-4 md:py-6 border-b border-border">
            <ScoreBar label="Risk Score (RS)" score={result.riskScore} type="risk" delay={0.4} />
            <ScoreBar label="Emotion/Fear Score (EFS)" score={result.emotionScore} type="emotion" delay={0.6} />
            <ScoreBar label="Function/Strength Score (FSS)" score={result.functionScore} type="function" delay={0.8} />
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-gradient-to-br from-secondary/80 to-secondary/30 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-border/50"
          >
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {profileDescriptions[result.profileType]}
            </p>
          </motion.div>

          {/* Top Triggers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm md:text-base">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              Your Top Triggers
            </h3>
            <ul className="space-y-2">
              {result.triggers.map((trigger, index) => (
                <motion.li 
                  key={trigger} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center gap-3 text-sm md:text-base text-muted-foreground p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <span className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  {trigger}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Breathing Exercises Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="rounded-xl border border-border overflow-hidden"
          >
            <button
              onClick={() => setShowExercises(!showExercises)}
              className="w-full flex items-center justify-between font-semibold text-foreground text-sm md:text-base p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Wind className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                Recommended Breathing Exercises
              </span>
              <span className="flex items-center gap-1 text-primary text-sm">
                {result.exercises.length} exercises
                <motion.div
                  animate={{ rotate: showExercises ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </span>
            </button>
            
            <AnimatePresence>
              {showExercises && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-border"
                >
                  <div className="p-4 space-y-3">
                    {result.exercises.map((exercise, index) => (
                      <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm md:text-base">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
              Your Next Steps
            </h3>
            <div className="grid gap-2 md:gap-3">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-3 p-3 md:p-4 bg-primary/5 rounded-xl border border-primary/20"
              >
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded shrink-0">TODAY</span>
                <p className="text-xs md:text-sm text-foreground">Try the 3-minute Diaphragmatic Breathing exercise</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-start gap-3 p-3 md:p-4 bg-secondary/50 rounded-xl border border-border"
              >
                <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded shrink-0">THIS WEEK</span>
                <p className="text-xs md:text-sm text-foreground">Practice recommended exercises daily (5-10 min)</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4"
          >
            {userData && (
              <>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="hero" size="lg" onClick={handleDownloadPDF} className="gap-2 w-full shadow-lg shadow-primary/20">
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                    Download PDF Report
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" size="lg" onClick={handleWhatsAppShare} className="gap-2 w-full">
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    Share on WhatsApp
                  </Button>
                </motion.div>
              </>
            )}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sm:col-span-2">
              <Button 
                variant="lime" 
                size="lg" 
                onClick={() => window.open('https://chat.whatsapp.com/GJdRe8ZhIHBHwT3TiadtkL/', '_blank')}
                className="gap-2 w-full"
              >
                <Users className="w-4 h-4 md:w-5 md:h-5" />
                Join Early Access Community
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} className="sm:col-span-2">
              <Button variant="ghost" size="lg" onClick={handleContactAdmin} className="gap-2 w-full">
                <Headphones className="w-4 h-4 md:w-5 md:h-5" />
                Contact Admin for Support
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Safety Notice Footer */}
        <div className="bg-secondary/30 px-4 md:px-6 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            ⚠️ If you're in serious distress (panic/trauma/sudden adult onset), please consult a clinician.
            This is a screening tool and does not replace professional assessment.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
