import { Question } from '@/types/test';

export const testQuestions: Question[] = [
  // History / Risk
  {
    id: 'q1',
    type: 'yes-no',
    category: 'history',
    emoji: '👨‍👩‍👧',
    text: 'Does anyone in your family stutter?',
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    category: 'history',
    emoji: '👶',
    text: 'When did you first notice stuttering?',
    options: ['Before age 8', 'After age 8', 'Not sure'],
  },
  // Situational Triggers
  {
    id: 'q3',
    type: 'rank',
    category: 'situational',
    emoji: '📊',
    text: 'Drag to rank: What\'s hardest for you?',
    options: [
      '📞 Phone calls',
      '🎤 Public speaking',
      '👋 Introductions',
      '🍔 Ordering food',
      '👨‍👩‍👧‍👦 Family talks',
    ],
  },
  // Physical Signs
  {
    id: 'q4',
    type: 'slider',
    category: 'physical',
    emoji: '😰',
    text: 'How tense do you feel before speaking?',
    sliderMin: 0,
    sliderMax: 10,
    sliderLabels: { min: '😌 Relaxed', max: '😣 Very tense' },
  },
  {
    id: 'q5',
    type: 'yes-no',
    category: 'physical',
    emoji: '👀',
    text: 'Do you blink, jerk, or move your jaw when speaking?',
  },
  // Emotional
  {
    id: 'q6',
    type: 'slider',
    category: 'emotional',
    emoji: '😟',
    text: 'How worried are you about being judged?',
    sliderMin: 0,
    sliderMax: 10,
    sliderLabels: { min: '😊 Not at all', max: '😰 Very worried' },
  },
  {
    id: 'q7',
    type: 'yes-no',
    category: 'emotional',
    emoji: '🚫',
    text: 'Do you avoid words or situations because of stuttering?',
  },
  {
    id: 'q8',
    type: 'slider',
    category: 'emotional',
    emoji: '💭',
    text: 'How anxious are you before important talks?',
    sliderMin: 0,
    sliderMax: 10,
    sliderLabels: { min: '😎 Calm', max: '😬 Very anxious' },
  },
  // Functional Impact
  {
    id: 'q9',
    type: 'yes-no',
    category: 'functional',
    emoji: '💼',
    text: 'Has stuttering affected your work or studies?',
  },
  {
    id: 'q10',
    type: 'slider',
    category: 'functional',
    emoji: '💪',
    text: 'How confident are you speaking in public?',
    sliderMin: 0,
    sliderMax: 10,
    sliderLabels: { min: '🙈 Not confident', max: '🦁 Very confident' },
  },
  // Strength Check
  {
    id: 'q11',
    type: 'yes-no',
    category: 'strength',
    emoji: '🎵',
    text: 'Do you speak smoothly when alone or singing?',
  },
  {
    id: 'q12',
    type: 'multiple-choice',
    category: 'strength',
    emoji: '🎂',
    text: 'What\'s your age group?',
    options: ['Under 18', '18-30', '31-45', '46-60', 'Over 60'],
  },
];

export const testInfo = {
  title: 'Stuttering Risk & Pattern Predictor (SRPP™)',
  subtitle: 'Speech Anxiety & Situational Trigger Scale (SASTS)',
  description: 'A science-backed assessment that maps your triggers, risk level, and daily exercises.',
  trustLine: 'Developed from clinical practice & validated screening items used in speech-language pathology.',
  duration: '2-3 minutes',
  questions: 12,
};
