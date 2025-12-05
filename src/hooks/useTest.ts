import { useState, useCallback, useEffect } from 'react';
import { Answer, TestResult } from '@/types/test';
import { testQuestions } from '@/data/questions';
import { calculateScores } from '@/lib/scoring';

const STORAGE_KEY = 'zlaqa_test_draft';

interface DraftState {
  currentStep: number;
  answers: Answer[];
  savedAt: string;
}

export function useTest() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  const totalQuestions = testQuestions.length;
  const progress = ((currentStep) / totalQuestions) * 100;
  const currentQuestion = testQuestions[currentStep];

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const draft: DraftState = JSON.parse(savedDraft);
        // Only restore if draft is less than 24 hours old
        const savedTime = new Date(draft.savedAt).getTime();
        const now = Date.now();
        const hoursDiff = (now - savedTime) / (1000 * 60 * 60);
        
        if (hoursDiff < 24 && draft.answers.length > 0) {
          setCurrentStep(draft.currentStep);
          setAnswers(draft.answers);
        }
      } catch (e) {
        console.error('Error loading draft:', e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save draft to localStorage whenever answers change
  useEffect(() => {
    if (answers.length > 0 && !isComplete) {
      const draft: DraftState = {
        currentStep,
        answers,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    }
  }, [answers, currentStep, isComplete]);

  // Clear draft when test is complete
  const clearDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const submitAnswer = useCallback((value: Answer['value']) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value,
    };

    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === currentQuestion.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newAnswer;
        return updated;
      }
      return [...prev, newAnswer];
    });

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Show lead capture modal instead of directly completing
      setShowLeadModal(true);
    }
  }, [currentStep, currentQuestion, totalQuestions]);

  const completeTest = useCallback(() => {
    const calculatedResult = calculateScores(answers);
    setResult(calculatedResult);
    setIsComplete(true);
    clearDraft();
  }, [answers, clearDraft]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const getAnswerForQuestion = useCallback((questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.value;
  }, [answers]);

  const resetTest = useCallback(() => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
    setIsComplete(false);
    setShowLeadModal(false);
    clearDraft();
  }, [clearDraft]);

  return {
    currentStep,
    currentQuestion,
    totalQuestions,
    progress,
    answers,
    result,
    isComplete,
    showLeadModal,
    setShowLeadModal,
    submitAnswer,
    completeTest,
    goBack,
    getAnswerForQuestion,
    resetTest,
  };
}
