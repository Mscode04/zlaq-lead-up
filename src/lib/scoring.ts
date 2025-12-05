import { Answer, TestResult, ProfileType, TierType } from '@/types/test';
import { getRecommendedExercises } from '@/data/exercises';

export function calculateScores(answers: Answer[]): TestResult {
  const getAnswer = (id: string) => answers.find(a => a.questionId === id);

  // Risk Score (RS) - family history, early onset, severity proxies
  let riskScore = 0;
  const q1 = getAnswer('q1');
  if (q1?.value === true) riskScore += 20; // Family history
  
  const q2 = getAnswer('q2');
  if (q2?.value === 'Before age 8') riskScore += 20; // Childhood onset
  
  const q4 = getAnswer('q4');
  if (q4?.value !== undefined) {
    riskScore += Math.round((Number(q4.value) / 10) * 30); // Physical tension normalized to 0-30
  }
  
  const q5 = getAnswer('q5');
  if (q5?.value === true) riskScore += 15; // Physical behaviors
  
  const q7 = getAnswer('q7');
  if (q7?.value === true) riskScore += 10; // Avoidance
  
  riskScore = Math.min(100, riskScore);

  // Emotion / Fear Score (EFS) - anxiety + avoidance + impact
  let emotionScore = 0;
  const q6 = getAnswer('q6');
  if (q6?.value !== undefined) {
    emotionScore += Math.round((Number(q6.value) / 10) * 40); // Fear slider scaled to 0-40
  }
  
  const q8 = getAnswer('q8');
  if (q8?.value !== undefined) {
    emotionScore += Math.round((Number(q8.value) / 10) * 20); // Anxiety slider scaled to 0-20
  }
  
  if (q7?.value === true) emotionScore += 20; // Avoidance
  
  const q9 = getAnswer('q9');
  if (q9?.value === true) emotionScore += 20; // Impact
  
  emotionScore = Math.min(100, emotionScore);

  // Function / Strength Score (FSS) - protective factors (higher is better)
  let functionScore = 0;
  const q11 = getAnswer('q11');
  if (q11?.value === true) functionScore += 30; // Fluent when alone
  
  const q10 = getAnswer('q10');
  if (q10?.value !== undefined) {
    functionScore += Math.round((Number(q10.value) / 10) * 40); // Confidence slider scaled to 0-40
  }
  
  if (q5?.value === false) functionScore += 30; // No physical behaviors
  
  functionScore = Math.min(100, functionScore);

  // Determine Profile Type
  let profileType: ProfileType;
  let profileLabel: string;

  if (riskScore >= 60 && emotionScore >= 50) {
    profileType = 'emotional-tension';
    profileLabel = 'Emotional-Tension Stuttering — Moderate to High Risk';
  } else if (riskScore >= 60 && functionScore >= 50) {
    profileType = 'motor-tension';
    profileLabel = 'Motor-Tension with Good Compensators';
  } else if (emotionScore >= 60 && functionScore < 40) {
    profileType = 'avoidance-dominant';
    profileLabel = 'Avoidance-Dominant Pattern';
  } else if (riskScore >= 70 && functionScore < 30) {
    profileType = 'motor-severe';
    profileLabel = 'Motor-Dominant Severe';
  } else {
    profileType = 'low-risk';
    profileLabel = 'Low Risk / Mild Pattern';
  }

  // Identify top triggers from ranking question
  const q3 = getAnswer('q3');
  const triggers = Array.isArray(q3?.value) 
    ? (q3.value as string[]).slice(0, 3).map(t => t.replace(/^[^\s]+\s/, '')) // Remove emoji prefix
    : ['Phone calls', 'Public speaking', 'Introductions'];

  // Get recommended exercises based on profile
  const exercises = getRecommendedExercises(profileType, {
    risk: riskScore,
    emotion: emotionScore,
    function: functionScore
  });

  return {
    riskScore,
    emotionScore,
    functionScore,
    profileType,
    profileLabel,
    triggers,
    exercises,
  };
}

export function getTier(riskScore: number, emotionScore: number): TierType {
  const avgRisk = (riskScore + emotionScore) / 2;
  
  if (avgRisk < 30) return 'Explorer';
  if (avgRisk < 50) return 'Challenger';
  if (avgRisk < 70) return 'Responder';
  return 'Founder';
}

export function getScoreColor(score: number, inverted = false): string {
  if (inverted) {
    // For function score, higher is better
    if (score >= 60) return 'bg-score-low';
    if (score >= 40) return 'bg-score-medium';
    return 'bg-score-high';
  }
  // For risk and emotion, lower is better
  if (score < 40) return 'bg-score-low';
  if (score < 60) return 'bg-score-medium';
  return 'bg-score-high';
}

export function getScoreLabel(score: number, type: 'risk' | 'emotion' | 'function'): string {
  if (type === 'function') {
    if (score >= 60) return 'Strong';
    if (score >= 40) return 'Moderate';
    return 'Needs Support';
  }
  if (score < 40) return 'Low';
  if (score < 60) return 'Moderate';
  return 'High';
}
