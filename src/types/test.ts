export type QuestionType = 'yes-no' | 'slider' | 'multiple-choice' | 'rank';

export interface Question {
  id: string;
  type: QuestionType;
  category: 'history' | 'situational' | 'physical' | 'emotional' | 'functional' | 'strength';
  text: string;
  emoji?: string;
  options?: string[];
  sliderMin?: number;
  sliderMax?: number;
  sliderLabels?: { min: string; max: string };
}

export interface Answer {
  questionId: string;
  value: string | number | string[] | boolean;
}

export interface TestResult {
  riskScore: number;
  emotionScore: number;
  functionScore: number;
  profileType: ProfileType;
  profileLabel: string;
  triggers: string[];
  exercises: BreathingExercise[];
}

export interface BreathingExercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  steps: string[];
  benefit: string;
}

export type ProfileType = 
  | 'emotional-tension'
  | 'motor-tension'
  | 'avoidance-dominant'
  | 'motor-severe'
  | 'low-risk';

export type TierType = 'Explorer' | 'Challenger' | 'Responder' | 'Founder';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

export interface LeadFormData {
  name: string;
  whatsapp: string;
  email?: string;
}
