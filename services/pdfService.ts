
import { jsPDF } from 'jspdf';
import { ChatSession, Message } from '../types';

export const generateSessionPDF = (session: ChatSession) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Watermark: CONFIDENTIAL
  doc.setTextColor(220, 220, 220);
  doc.setFontSize(50);
  doc.setFont('helvetica', 'bold');
  doc.saveGraphicsState();
  // Set transparency for watermark
  const gState = new (doc as any).GState({ opacity: 0.08 });
  doc.setGState(gState);
  
  // Rotating and repeating watermark
  for (let i = 0; i < 4; i++) {
    doc.text('CONFIDENTIAL', 40, 60 + (i * 70), { angle: 45 });
    doc.text('CONFIDENTIAL', 120, 60 + (i * 70), { angle: 45 });
  }
  doc.restoreGraphicsState();

  // Header Section with Logo Area
  doc.setFillColor(0, 229, 255); // Neon Blue
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(26);
  doc.setFont('courier', 'bold');
  doc.text('CIPHER_X AI', 20, 25);
  
  doc.setFontSize(10);
  doc.setFont('courier', 'normal');
  doc.text('INTELLIGENCE PROTOCOL LOG // SESSION_EXPORT', 20, 32);

  // Metadata Section
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('REPORT GENERATED:', 20, 50);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date().toLocaleString(), 65, 50);
  
  doc.setFont('helvetica', 'bold');
  doc.text('SESSION IDENTIFIER:', 20, 56);
  doc.setFont('helvetica', 'normal');
  doc.text(session.id, 65, 56);

  doc.setFont('helvetica', 'bold');
  doc.text('SESSION SUBJECT:', 20, 62);
  doc.setFont('helvetica', 'normal');
  doc.text(session.title || 'Untitled Session', 65, 62);

  // Summary Line
  doc.setDrawColor(0, 229, 255);
  doc.setLineWidth(0.5);
  doc.line(20, 70, pageWidth - 20, 70);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 110, 150);
  doc.text('EXECUTIVE TRANSCRIPT SUMMARY', 20, 80);

  // Content rendering
  let cursorY = 90;
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);

  doc.setFontSize(10);
  
  session.messages.forEach((msg: Message) => {
    // Check for page break
    if (cursorY > pageHeight - 30) {
      doc.addPage();
      // Re-apply watermark on new page
      doc.setTextColor(220, 220, 220);
      doc.setFontSize(50);
      doc.saveGraphicsState();
      doc.setGState(gState);
      for (let i = 0; i < 4; i++) {
        doc.text('CONFIDENTIAL', 40, 60 + (i * 70), { angle: 45 });
        doc.text('CONFIDENTIAL', 120, 60 + (i * 70), { angle: 45 });
      }
      doc.restoreGraphicsState();
      cursorY = 20;
    }

    // Sender Label
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(msg.role === 'user' ? 0 : 0, msg.role === 'user' ? 0 : 176, msg.role === 'user' ? 0 : 255);
    const label = msg.role === 'user' ? `[USER] @ ${new Date(msg.timestamp).toLocaleTimeString()}:` : `[CIPHER_X_AI] @ ${new Date(msg.timestamp).toLocaleTimeString()}:`;
    doc.text(label, margin, cursorY);
    cursorY += 6;

    // Message Body
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    const textLines = doc.splitTextToSize(msg.content, maxWidth);
    doc.text(textLines, margin, cursorY);
    cursorY += (textLines.length * 5) + 8;
  });

  // Footer branding on all pages
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`SECURITY_LOG_PAGE_${i}_OF_${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text('CipherX AI Proprietary Systems (c) 2025 Wally Nthani', 20, pageHeight - 10);
  }

  const filename = `CipherX_Intelligence_Report_${session.id.slice(-6)}.pdf`;
  doc.save(filename);
};
