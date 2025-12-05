import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/test/ProgressBar';
import { QuestionRenderer } from '@/components/test/QuestionRenderer';
import { ResultCard } from '@/components/results/ResultCard';
import { LeadCaptureModal } from '@/components/test/LeadCaptureModal';
import { useTest } from '@/hooks/useTest';
import { useScrollHide } from '@/hooks/useScrollHide';
import { testInfo } from '@/data/questions';
import { LeadFormData } from '@/types/test';
import { calculateScores } from '@/lib/scoring';

const Test = () => {
  const navigate = useNavigate();
  const isHeaderHidden = useScrollHide(30);
  const [userData, setUserData] = useState<LeadFormData | null>(null);
  
  const {
    currentStep,
    currentQuestion,
    totalQuestions,
    progress,
    answers,
    isComplete,
    result,
    showLeadModal,
    setShowLeadModal,
    submitAnswer,
    completeTest,
    goBack,
    getAnswerForQuestion,
  } = useTest();

  const handleJoinCommunity = () => {
    navigate('/community');
  };

  const handleLeadSubmit = (data: LeadFormData) => {
    setUserData(data);
    setShowLeadModal(false);
    completeTest();
  };

  // Calculate result for modal preview
  const previewResult = answers.length > 0 ? calculateScores(answers) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hidden on scroll */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHeaderHidden && !isComplete ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="zlaqa-container flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-base md:text-lg">Z</span>
            </div>
            <span className="font-bold text-lg md:text-xl text-foreground">ZLAQA</span>
          </Link>
          
          {/* Close button hidden during test */}
        </div>
      </motion.header>

      <main className="pt-20 md:pt-24 pb-8 md:pb-12 px-4">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              {/* Test Info (first step only) */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8 md:mb-12"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs md:text-sm font-medium text-primary mb-3 md:mb-4">
                    {testInfo.title}
                  </div>
                  <p className="text-muted-foreground text-xs md:text-sm max-w-md mx-auto">
                    {testInfo.trustLine}
                  </p>
                </motion.div>
              )}

              {/* Progress */}
              <div className="mb-8 md:mb-12">
                <ProgressBar
                  progress={progress}
                  currentStep={currentStep}
                  totalSteps={totalQuestions}
                />
              </div>

              {/* Back Button */}
              {currentStep > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 md:mb-8"
                >
                  <Button variant="ghost" size="sm" onClick={goBack} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                </motion.div>
              )}

              {/* Question */}
              <QuestionRenderer
                question={currentQuestion}
                onAnswer={submitAnswer}
                currentValue={getAnswerForQuestion(currentQuestion.id)}
              />

              {/* Category Indicator */}
              <motion.div
                key={currentQuestion.category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 md:mt-12 text-center"
              >
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {currentQuestion.category.replace('-', ' ')} section
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-4 md:py-8"
            >
              {result && (
                <ResultCard 
                  result={result} 
                  userData={userData || undefined}
                  onJoinCommunity={handleJoinCommunity} 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        open={showLeadModal}
        onOpenChange={setShowLeadModal}
        onSubmit={handleLeadSubmit}
        result={previewResult}
        answers={answers}
      />
    </div>
  );
};

export default Test;
