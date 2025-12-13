import { Question } from '@/types/test';

export const testQuestions: Question[] = [
  // Initial Screening
  {
    id: 'q0',
    type: 'yes-no',
    category: 'screening',
    emoji: '🗣️',
    text: 'Do you have stuttering?',
  },
];

// Questions for users who have stuttering
export const stutteringQuestions: Question[] = [
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

// Questions for users who don't have stuttering
export const communicationQuestions: Question[] = [
  {
    id: 'c1',
    type: 'multiple-choice',
    category: 'communication',
    emoji: '🗣️',
    text: 'What\'s your main communication challenge?',
    options: [
      'Speaking too fast',
      'Difficulty finding words',
      'Soft voice volume',
      'Poor eye contact',
      'Nervousness in groups',
      'Other'
    ],
  },
  {
    id: 'c2',
    type: 'slider',
    category: 'communication',
    emoji: '⏱️',
    text: 'How often do you feel rushed when speaking?',
    sliderMin: 0,
    sliderMax: 10,
    sliderLabels: { min: 'Never', max: 'Always' },
  },
  {
    id: 'c3',
    type: 'rank',
    category: 'communication',
    emoji: '📊',
    text: 'Rank your most challenging situations:',
    options: [
      '📞 Phone conversations',
      '🎤 Presentations',
      '👥 Group discussions',
      '💼 Job interviews',
      '👋 Meeting new people',
    ],
  },
  {
    id: 'c4',
    type: 'slider',
    category: 'communication',
    emoji: '😰',
    text: 'How anxious do you feel before speaking?',
    sliderMin: 0,
    sliderMax: 10,
    sliderLabels: { min: 'Calm', max: 'Very anxious' },
  },
  {
    id: 'c5',
    type: 'yes-no',
    category: 'communication',
    emoji: '🚫',
    text: 'Do you avoid certain words or topics?',
  },
  {
    id: 'c6',
    type: 'slider',
    category: 'communication',
    emoji: '💪',
    text: 'How confident are you in your communication?',
    sliderMin: 0,
    sliderMax: 10,
    sliderLabels: { min: 'Not confident', max: 'Very confident' },
  },
  {
    id: 'c7',
    type: 'multiple-choice',
    category: 'communication',
    emoji: '🎯',
    text: 'What would help you most?',
    options: [
      'Speaking slower',
      'Better preparation',
      'Confidence building',
      'Voice training',
      'Practice techniques'
    ],
  },
  {
    id: 'c8',
    type: 'yes-no',
    category: 'communication',
    emoji: '📚',
    text: 'Would you like communication improvement tips?',
  },
];

export const testInfo = {
  title: 'Communication Assessment Tool',
  subtitle: 'Personalized Communication & Stuttering Analysis',
  description: 'A comprehensive assessment that identifies your communication patterns and provides tailored recommendations.',
  trustLine: 'Developed from clinical practice & validated screening methods used in speech-language pathology.',
  duration: '2-3 minutes',
  questions: 12,
};
