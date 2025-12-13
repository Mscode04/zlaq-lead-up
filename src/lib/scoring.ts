import { Answer, TestResult, ProfileType, TierType } from '@/types/test';
import { getRecommendedExercises } from '@/data/exercises';

export function calculateScores(answers: Answer[], hasStuttering?: boolean | null): TestResult {
  const getAnswer = (id: string) => answers.find(a => a.questionId === id);

  if (hasStuttering === false) {
    // Communication assessment for non-stuttering users
    return calculateCommunicationScores(answers);
  }

  // Default stuttering assessment
  return calculateStutteringScores(answers);
}

function calculateStutteringScores(answers: Answer[]): TestResult {
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

function calculateCommunicationScores(answers: Answer[]): TestResult {
  const getAnswer = (id: string) => answers.find(a => a.questionId === id);

  // Communication Risk Score - based on challenges and anxiety
  let riskScore = 0;
  const c1 = getAnswer('c1');
  if (c1?.value === 'Speaking too fast') riskScore += 25;
  else if (c1?.value === 'Difficulty finding words') riskScore += 20;
  else if (c1?.value === 'Soft voice volume') riskScore += 15;
  else if (c1?.value === 'Poor eye contact') riskScore += 15;
  else if (c1?.value === 'Nervousness in groups') riskScore += 20;

  const c2 = getAnswer('c2');
  if (c2?.value !== undefined) {
    riskScore += Math.round((Number(c2.value) / 10) * 25); // Speaking too fast normalized
  }

  const c4 = getAnswer('c4');
  if (c4?.value !== undefined) {
    riskScore += Math.round((Number(c4.value) / 10) * 30); // Anxiety normalized
  }

  riskScore = Math.min(100, riskScore);

  // Communication Emotion Score - anxiety and avoidance
  let emotionScore = 0;
  if (c4?.value !== undefined) {
    emotionScore += Math.round((Number(c4.value) / 10) * 40);
  }

  const c5 = getAnswer('c5');
  if (c5?.value === true) emotionScore += 30; // Avoidance

  const c1Emotion = getAnswer('c1');
  if (c1Emotion?.value === 'Nervousness in groups') emotionScore += 30;

  emotionScore = Math.min(100, emotionScore);

  // Communication Function Score - confidence and skills
  let functionScore = 0;
  const c6 = getAnswer('c6');
  if (c6?.value !== undefined) {
    functionScore += Math.round((Number(c6.value) / 10) * 50); // Confidence
  }

  const c7 = getAnswer('c7');
  if (c7?.value === 'Speaking slower') functionScore += 20;
  else if (c7?.value === 'Better preparation') functionScore += 15;
  else if (c7?.value === 'Confidence building') functionScore += 15;

  const c8 = getAnswer('c8');
  if (c8?.value === true) functionScore += 15; // Wants improvement

  functionScore = Math.min(100, functionScore);

  // Determine Communication Profile Type
  let profileType: ProfileType;
  let profileLabel: string;

  const mainChallenge = c1?.value as string;
  if (emotionScore >= 60) {
    profileType = 'emotional-tension';
    profileLabel = 'Communication Anxiety — Needs Confidence Building';
  } else if (mainChallenge === 'Speaking too fast') {
    profileType = 'motor-tension';
    profileLabel = 'Fast Speech Pattern — Needs Pacing Techniques';
  } else if (mainChallenge === 'Difficulty finding words') {
    profileType = 'avoidance-dominant';
    profileLabel = 'Word-Finding Challenges — Needs Organization Skills';
  } else if (functionScore < 40) {
    profileType = 'motor-severe';
    profileLabel = 'Multiple Communication Challenges — Comprehensive Support';
  } else {
    profileType = 'low-risk';
    profileLabel = 'Good Communication Skills — Minor Refinements';
  }

  // Identify top triggers from ranking question
  const c3 = getAnswer('c3');
  const triggers = Array.isArray(c3?.value) 
    ? (c3.value as string[]).slice(0, 3).map(t => t.replace(/^[^\s]+\s/, '')) // Remove emoji prefix
    : ['Phone conversations', 'Presentations', 'Group discussions'];

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
