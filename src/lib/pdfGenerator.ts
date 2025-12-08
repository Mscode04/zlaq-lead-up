import { jsPDF } from 'jspdf';
import { TestResult, LeadFormData } from '@/types/test';
import { getScoreLabel } from './scoring';

export function generatePDFReport(result: TestResult, userData: LeadFormData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Premium Colors
  const primary: [number, number, number] = [154, 211, 21]; // #9AD315
  const dark: [number, number, number] = [30, 30, 30];
  const text: [number, number, number] = [80, 80, 80];
  const light: [number, number, number] = [245, 245, 245];

  // ===== HEADER =====
  doc.setFillColor(...light);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  doc.setFillColor(...primary);
  doc.roundedRect(margin, 15, 10, 10, 2, 2, 'F');
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text('ZLAQA', margin + 14, 23);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...text);
  doc.text('Speech Profile Report', margin + 14, 28);

  // Date
  doc.setFontSize(8);
  const dateText = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  doc.text(dateText, pageWidth - margin, 23, { align: 'right' });
  
  y = 60;

  // ===== USER & PROFILE SECTION =====
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text(userData.name, margin, y);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...text);
  doc.text(`WhatsApp: ${userData.whatsapp}`, margin, y + 6);
  
  // Profile Badge
  doc.setFillColor(...primary);
  doc.roundedRect(pageWidth - margin - 50, y - 4, 50, 14, 3, 3, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text(result.profileLabel, pageWidth - margin - 25, y + 4, { align: 'center' });
  
  y += 25;

  // ===== SCORES SECTION =====
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text('Assessment Scores', margin, y);
  y += 12;

  const scores = [
    { label: 'Risk Score', value: result.riskScore, type: 'risk' as const },
    { label: 'Emotion Score', value: result.emotionScore, type: 'emotion' as const },
    { label: 'Function Score', value: result.functionScore, type: 'function' as const },
  ];

  scores.forEach((score) => {
    // Label
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...text);
    doc.text(score.label, margin, y);
    
    // Value
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...dark);
    doc.text(`${score.value}/100`, pageWidth - margin - 30, y, { align: 'right' });
    
    y += 5;
    
    // Progress bar
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y, contentWidth - 35, 4, 'F');
    
    let barColor: [number, number, number];
    if (score.type === 'function') {
      barColor = score.value > 60 ? [34, 197, 94] : score.value > 30 ? [234, 179, 8] : [239, 68, 68];
    } else {
      barColor = score.value < 40 ? [34, 197, 94] : score.value < 70 ? [234, 179, 8] : [239, 68, 68];
    }
    
    doc.setFillColor(...barColor);
    doc.rect(margin, y, ((contentWidth - 35) * score.value) / 100, 4, 'F');
    
    y += 10;
  });

  y += 5;

  // ===== TRIGGERS =====
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text('Your Main Triggers', margin, y);
  y += 10;

  result.triggers.slice(0, 4).forEach((trigger, index) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...text);
    doc.text(`${index + 1}. ${trigger}`, margin + 3, y);
    y += 6;
  });

  y += 8;

  // ===== EXERCISES =====
  if (y > 220) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text('Recommended Exercises', margin, y);
  y += 10;

  result.exercises.slice(0, 3).forEach((exercise, index) => {
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    // Exercise title
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primary);
    doc.text(`${index + 1}. ${exercise.name}`, margin, y);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...text);
    doc.text(`(${exercise.duration})`, margin + 50, y);
    
    y += 6;

    // Description
    doc.setFontSize(8);
    const descLines = doc.splitTextToSize(exercise.description, contentWidth - 6);
    doc.text(descLines, margin + 3, y);
    y += descLines.length * 4 + 3;

    // Steps (max 3)
    exercise.steps.slice(0, 3).forEach((step, stepIndex) => {
      const stepText = `${stepIndex + 1}. ${step}`;
      const stepLines = doc.splitTextToSize(stepText, contentWidth - 15);
      doc.setFontSize(7.5);
      doc.text(stepLines, margin + 6, y);
      y += stepLines.length * 3.5 + 1;
    });

    y += 5;
  });

  // ===== 7-DAY PLAN =====
  if (y > 210) {
    doc.addPage();
    y = 20;
  } else {
    y += 8;
  }

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...dark);
  doc.text('Quick Start Plan', margin, y);
  y += 10;

  const plan = [
    'Day 1: Diaphragmatic Breathing (3 min)',
    'Day 2-3: Daily practice (5 min)',
    'Day 4-7: Add second exercise',
  ];

  plan.forEach(item => {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...text);
    doc.text(`• ${item}`, margin + 3, y);
    y += 5;
  });

  // ===== FOOTER =====
  const footerY = doc.internal.pageSize.getHeight() - 20;
  
  doc.setFontSize(7);
  doc.setTextColor(...text);
  doc.setFont('helvetica', 'italic');
  doc.text('Screening tool only • Not a clinical diagnosis', margin, footerY);
  doc.text('© ZLAQA', pageWidth - margin, footerY, { align: 'right' });

  return doc;
}

export function downloadReport(result: TestResult, userData: LeadFormData) {
  const doc = generatePDFReport(result, userData);
  doc.save(`ZLAQA_Profile_${userData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
}

export function generateWhatsAppMessage(result: TestResult, userData: LeadFormData): string {
  return encodeURIComponent(`🎯 *ZLAQA Speech Profile*

Hi ${userData.name}!

*Your Profile:* ${result.profileLabel}

*Scores:*
RS: ${result.riskScore}/100
ES: ${result.emotionScore}/100  
FS: ${result.functionScore}/100

*Top Triggers:*
${result.triggers.slice(0, 3).map((t, i) => `${i + 1}. ${t}`).join('\n')}

Get full report & join community:
https://chat.whatsapp.com/GJdRe8ZhIHBHwT3TiadtkL/`);
}
