import { jsPDF } from 'jspdf';
import { TestResult, LeadFormData } from '@/types/test';
import { getScoreLabel } from './scoring';

export function generatePDFReport(result: TestResult, userData: LeadFormData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Colors (ZLAQA Theme)
  const primaryColor: [number, number, number] = [154, 211, 21]; // #9AD315
  const blackColor: [number, number, number] = [0, 0, 0];
  const grayColor: [number, number, number] = [100, 100, 100];
  const lightGray: [number, number, number] = [240, 240, 240];

  // Helper functions
  const addLine = (startY: number, color: [number, number, number] = lightGray) => {
    doc.setDrawColor(...color);
    doc.setLineWidth(0.5);
    doc.line(margin, startY, pageWidth - margin, startY);
  };

  const addColorBar = (x: number, barY: number, width: number, height: number, percentage: number, type: 'risk' | 'emotion' | 'function') => {
    // Background
    doc.setFillColor(...lightGray);
    doc.roundedRect(x, barY, width, height, 2, 2, 'F');
    
    // Fill color based on type and percentage
    let color: [number, number, number];
    if (type === 'function') {
      color = percentage > 60 ? [34, 197, 94] : percentage > 30 ? [234, 179, 8] : [239, 68, 68];
    } else {
      color = percentage < 40 ? [34, 197, 94] : percentage < 70 ? [234, 179, 8] : [239, 68, 68];
    }
    
    doc.setFillColor(...color);
    const fillWidth = (width * percentage) / 100;
    doc.roundedRect(x, barY, fillWidth, height, 2, 2, 'F');
  };

  // ===== HEADER =====
  // Logo background
  doc.setFillColor(...primaryColor);
  doc.roundedRect(margin, y, 12, 12, 2, 2, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Z', margin + 4.5, y + 8);

  // Title
  doc.setTextColor(...blackColor);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ZLAQA', margin + 16, y + 9);
  
  // Subtitle
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  doc.text('Speech Profile Report', margin + 45, y + 9);

  // Date aligned right
  doc.setFontSize(9);
  const dateText = new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  doc.text(dateText, pageWidth - margin, y + 9, { align: 'right' });

  y += 20;
  addLine(y);
  y += 15;

  // ===== USER INFO =====
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...blackColor);
  doc.text('Patient Information', margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...grayColor);
  
  const userInfo = [
    `Name: ${userData.name}`,
    `WhatsApp: ${userData.whatsapp}`,
    userData.email ? `Email: ${userData.email}` : null,
  ].filter(Boolean);

  userInfo.forEach(info => {
    if (info) {
      doc.text(info, margin, y);
      y += 6;
    }
  });

  y += 10;
  addLine(y);
  y += 15;

  // ===== PROFILE LABEL =====
  doc.setFillColor(...primaryColor);
  doc.roundedRect(margin, y - 5, contentWidth, 22, 4, 4, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...blackColor);
  doc.text('YOUR PROFILE', margin + 8, y + 3);
  
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(result.profileLabel, margin + 8, y + 12);

  y += 30;

  // ===== SCORES SECTION =====
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...blackColor);
  doc.text('Assessment Scores', margin, y);
  y += 12;

  const scores = [
    { label: 'Risk Score (RS)', value: result.riskScore, type: 'risk' as const },
    { label: 'Emotion/Fear Score (EFS)', value: result.emotionScore, type: 'emotion' as const },
    { label: 'Function/Strength (FSS)', value: result.functionScore, type: 'function' as const },
  ];

  scores.forEach((score) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayColor);
    doc.text(score.label, margin, y);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...blackColor);
    doc.text(`${score.value}/100`, pageWidth - margin - 40, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayColor);
    const scoreLabel = getScoreLabel(score.value, score.type);
    doc.text(scoreLabel, pageWidth - margin, y, { align: 'right' });
    
    y += 5;
    addColorBar(margin, y, contentWidth - 60, 5, score.value, score.type);
    y += 14;
  });

  y += 5;
  addLine(y);
  y += 15;

  // ===== TRIGGERS =====
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...blackColor);
  doc.text('Your Top Triggers', margin, y);
  y += 10;

  result.triggers.forEach((trigger, index) => {
    doc.setFillColor(...primaryColor);
    doc.circle(margin + 3, y - 2, 3, 'F');
    doc.setTextColor(...blackColor);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}`, margin + 1.5, y);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayColor);
    doc.text(trigger, margin + 10, y);
    y += 8;
  });

  y += 7;
  addLine(y);
  y += 15;

  // ===== EXERCISES =====
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...blackColor);
  doc.text('Recommended Breathing Exercises', margin, y);
  y += 10;

  result.exercises.slice(0, 3).forEach((exercise, index) => {
    // Check if we need a new page
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    // Exercise header
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(margin, y - 4, contentWidth, 8, 2, 2, 'F');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...blackColor);
    doc.text(`${index + 1}. ${exercise.name}`, margin + 3, y + 1);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayColor);
    doc.text(`(${exercise.duration})`, margin + 3 + doc.getTextWidth(`${index + 1}. ${exercise.name}`) + 3, y + 1);
    
    y += 10;

    doc.setFontSize(9);
    doc.setTextColor(...grayColor);
    const descLines = doc.splitTextToSize(exercise.description, contentWidth - 10);
    doc.text(descLines, margin + 3, y);
    y += descLines.length * 5 + 5;

    // Steps
    exercise.steps.slice(0, 4).forEach((step, stepIndex) => {
      doc.setFontSize(8);
      doc.setTextColor(...grayColor);
      const stepText = `${stepIndex + 1}. ${step}`;
      const stepLines = doc.splitTextToSize(stepText, contentWidth - 15);
      doc.text(stepLines, margin + 8, y);
      y += stepLines.length * 4 + 2;
    });

    y += 8;
  });

  // ===== 7-DAY PLAN =====
  if (y > 220) {
    doc.addPage();
    y = 20;
  }

  addLine(y);
  y += 15;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...blackColor);
  doc.text('7-Day Starter Plan', margin, y);
  y += 10;

  const plan = [
    'Day 1-2: Practice Diaphragmatic Breathing (3 min/day)',
    'Day 3-4: Add Easy Onset exercises',
    'Day 5-6: Practice in low-stress situations',
    'Day 7: Review progress and continue daily practice',
  ];

  plan.forEach(item => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayColor);
    doc.text(`• ${item}`, margin + 3, y);
    y += 7;
  });

  // ===== FOOTER =====
  const footerY = doc.internal.pageSize.getHeight() - 30;
  
  addLine(footerY - 10);
  
  doc.setFontSize(8);
  doc.setTextColor(...grayColor);
  doc.setFont('helvetica', 'italic');
  const disclaimer = 'This report is a screening tool only and does not replace a clinical assessment by a speech-language pathologist.';
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(disclaimerLines, margin, footerY - 3);

  doc.setFont('helvetica', 'normal');
  doc.text(`© ${new Date().getFullYear()} ZLAQA - All Rights Reserved`, margin, footerY + 10);
  doc.text('admin@zlaqa.com | zlaqa.com', pageWidth - margin, footerY + 10, { align: 'right' });

  return doc;
}

export function downloadReport(result: TestResult, userData: LeadFormData) {
  const doc = generatePDFReport(result, userData);
  doc.save(`ZLAQA_Speech_Profile_${userData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
}

export function generateWhatsAppMessage(result: TestResult, userData: LeadFormData): string {
  return encodeURIComponent(`🎯 *ZLAQA Speech Profile Report*

Hi ${userData.name}! Here's your personalized speech profile:

📊 *Your Profile:* ${result.profileLabel}

*Scores:*
• Risk Score: ${result.riskScore}/100
• Emotion Score: ${result.emotionScore}/100  
• Strength Score: ${result.functionScore}/100

*Your Top Triggers:*
${result.triggers.map((t, i) => `${i + 1}. ${t}`).join('\n')}

*Recommended Exercises:*
${result.exercises.slice(0, 2).map(e => `• ${e.name}`).join('\n')}

Join our community for your full PDF report & guided program!
🔗 https://chat.whatsapp.com/GJdRe8ZhIHBHwT3TiadtkL/`);
}
