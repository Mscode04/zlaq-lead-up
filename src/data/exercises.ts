import { BreathingExercise, ProfileType } from '@/types/test';

export const breathingExercises: BreathingExercise[] = [
  {
    id: 'diaphragmatic',
    name: 'Diaphragmatic Breathing',
    description: 'Deep belly breathing to reduce tension and calm your nervous system.',
    duration: '3-5 minutes',
    steps: [
      'Sit comfortably with one hand on your chest and one on your belly',
      'Breathe in slowly through your nose for 4 seconds',
      'Feel your belly rise (not your chest)',
      'Hold for 2 seconds',
      'Exhale slowly through your mouth for 6 seconds',
      'Repeat 5-10 times'
    ],
    benefit: 'Reduces physical tension before speaking'
  },
  {
    id: 'box-breathing',
    name: 'Box Breathing (4-4-4-4)',
    description: 'A calming technique used by Navy SEALs to manage stress.',
    duration: '4 minutes',
    steps: [
      'Breathe in for 4 seconds',
      'Hold your breath for 4 seconds',
      'Breathe out for 4 seconds',
      'Hold empty for 4 seconds',
      'Repeat 4 cycles'
    ],
    benefit: 'Calms anxiety before important conversations'
  },
  {
    id: 'easy-onset',
    name: 'Easy Onset Breathing',
    description: 'Start words with gentle airflow to reduce blocks.',
    duration: '5 minutes',
    steps: [
      'Take a gentle breath',
      'Start with a soft "h" sound (like a sigh)',
      'Let the first word flow out gently',
      'Practice: "Hhhhello, Hhhhow are you?"',
      'Gradually reduce the "h" sound'
    ],
    benefit: 'Helps start words smoothly'
  },
  {
    id: 'prolonged-speech',
    name: 'Prolonged Speech Practice',
    description: 'Stretch your sounds to increase fluency.',
    duration: '5-10 minutes',
    steps: [
      'Take a breath',
      'Speak very slowly, stretching each sound',
      'Example: "Heeellooo, myyy naaame iiiis..."',
      'Gradually increase to normal speed',
      'Practice daily with simple sentences'
    ],
    benefit: 'Increases overall fluency'
  },
  {
    id: 'pausing',
    name: 'Strategic Pausing',
    description: 'Use natural pauses to reset and gain control.',
    duration: '3 minutes',
    steps: [
      'Read a paragraph aloud',
      'Pause briefly after each phrase (1-2 seconds)',
      'Take a small breath during pauses',
      'Continue speaking calmly',
      'Practice in real conversations'
    ],
    benefit: 'Gives you control in conversations'
  },
  {
    id: 'voluntary-stuttering',
    name: 'Voluntary Stuttering',
    description: 'Intentionally stutter to reduce fear and gain control.',
    duration: '5 minutes',
    steps: [
      'Choose a safe practice environment',
      'Intentionally repeat a sound: "M-m-my name is..."',
      'Stay relaxed during the repetition',
      'Notice it becomes less scary with practice',
      'Use this to desensitize yourself'
    ],
    benefit: 'Reduces fear of stuttering'
  },
  {
    id: 'relaxation',
    name: 'Progressive Muscle Relaxation',
    description: 'Release tension in speech muscles.',
    duration: '10 minutes',
    steps: [
      'Tense your jaw muscles for 5 seconds, then release',
      'Tense your tongue by pressing it to the roof of your mouth, then release',
      'Tense your throat muscles gently, then release',
      'Tense your shoulder muscles, then release',
      'Feel the difference between tense and relaxed'
    ],
    benefit: 'Releases muscle tension before speaking'
  },
  {
    id: 'mindful-speaking',
    name: 'Mindful Speaking',
    description: 'Focus on the present moment while speaking.',
    duration: '5 minutes',
    steps: [
      'Close your eyes and take 3 deep breaths',
      'Notice any tension in your body',
      'Speak a sentence slowly while staying aware',
      'Don\'t judge yourself if you stutter',
      'Focus on the message, not the words'
    ],
    benefit: 'Reduces performance anxiety'
  }
];

// Get recommended exercises based on profile type
export function getRecommendedExercises(profileType: ProfileType, scores: { risk: number; emotion: number; function: number }): BreathingExercise[] {
  const exercises: BreathingExercise[] = [];
  
  // Always include diaphragmatic breathing
  exercises.push(breathingExercises.find(e => e.id === 'diaphragmatic')!);
  
  switch (profileType) {
    case 'emotional-tension':
      // High anxiety - focus on calming and confidence
      exercises.push(breathingExercises.find(e => e.id === 'box-breathing')!);
      exercises.push(breathingExercises.find(e => e.id === 'mindful-speaking')!);
      if (scores.emotion > 60) {
        exercises.push(breathingExercises.find(e => e.id === 'voluntary-stuttering')!);
      }
      break;
      
    case 'motor-tension':
      // Physical tension - focus on relaxation and easy onset
      exercises.push(breathingExercises.find(e => e.id === 'easy-onset')!);
      exercises.push(breathingExercises.find(e => e.id === 'relaxation')!);
      exercises.push(breathingExercises.find(e => e.id === 'prolonged-speech')!);
      break;
      
    case 'avoidance-dominant':
      // Avoidance pattern - focus on desensitization and confidence
      exercises.push(breathingExercises.find(e => e.id === 'voluntary-stuttering')!);
      exercises.push(breathingExercises.find(e => e.id === 'mindful-speaking')!);
      exercises.push(breathingExercises.find(e => e.id === 'pausing')!);
      break;
      
    case 'motor-severe':
      // Severe motor issues - comprehensive approach
      exercises.push(breathingExercises.find(e => e.id === 'easy-onset')!);
      exercises.push(breathingExercises.find(e => e.id === 'prolonged-speech')!);
      exercises.push(breathingExercises.find(e => e.id === 'relaxation')!);
      exercises.push(breathingExercises.find(e => e.id === 'pausing')!);
      break;
      
    case 'low-risk':
    default:
      // Mild - maintenance exercises
      exercises.push(breathingExercises.find(e => e.id === 'box-breathing')!);
      exercises.push(breathingExercises.find(e => e.id === 'pausing')!);
      break;
  }
  
  // Remove duplicates and limit to 4 exercises
  const uniqueExercises = [...new Map(exercises.map(e => [e.id, e])).values()];
  return uniqueExercises.slice(0, 4);
}
