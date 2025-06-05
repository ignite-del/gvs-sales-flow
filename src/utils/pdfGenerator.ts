
import jsPDF from 'jspdf';

interface LineItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

interface DocumentData {
  id: string;
  type: 'quote' | 'invoice';
  customer: string;
  contact: string;
  email?: string;
  phone?: string;
  address?: string;
  date: string;
  validUntil?: string;
  dueDate?: string;
  lineItems: LineItem[];
  notes?: string;
  paymentTerms?: string;
}

export const generatePDF = (data: DocumentData) => {
  const pdf = new jsPDF();
  
  // Company Header
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('GVS', 20, 30);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Sales Platform', 20, 40);
  
  // Document Title
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  const title = data.type === 'quote' ? 'QUOTATION' : 'INVOICE';
  pdf.text(title, 150, 30);
  
  // Document Details
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`${data.type === 'quote' ? 'Quote' : 'Invoice'} #: ${data.id}`, 150, 40);
  pdf.text(`Date: ${data.date}`, 150, 50);
  
  if (data.type === 'quote' && data.validUntil) {
    pdf.text(`Valid Until: ${data.validUntil}`, 150, 60);
  }
  
  if (data.type === 'invoice' && data.dueDate) {
    pdf.text(`Due Date: ${data.dueDate}`, 150, 60);
  }
  
  // Customer Information
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Bill To:', 20, 70);
  
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.customer, 20, 80);
  pdf.text(data.contact, 20, 90);
  if (data.email) pdf.text(data.email, 20, 100);
  if (data.phone) pdf.text(data.phone, 20, 110);
  if (data.address) {
    const addressLines = data.address.split('\n');
    addressLines.forEach((line, index) => {
      pdf.text(line, 20, 120 + (index * 10));
    });
  }
  
  // Line Items Header
  const startY = 150;
  pdf.setFont('helvetica', 'bold');
  pdf.text('Product/Service', 20, startY);
  pdf.text('Qty', 100, startY);
  pdf.text('Unit Price', 125, startY);
  pdf.text('Discount', 155, startY);
  pdf.text('Total', 180, startY);
  
  // Line Items
  pdf.setFont('helvetica', 'normal');
  let currentY = startY + 15;
  let grandTotal = 0;
  
  data.lineItems.forEach((item) => {
    pdf.text(item.productName, 20, currentY);
    pdf.text(item.quantity.toString(), 100, currentY);
    pdf.text(`$${item.unitPrice.toFixed(2)}`, 125, currentY);
    pdf.text(`${item.discount}%`, 155, currentY);
    pdf.text(`$${item.total.toFixed(2)}`, 180, currentY);
    grandTotal += item.total;
    currentY += 10;
  });
  
  // Grand Total
  pdf.setFont('helvetica', 'bold');
  pdf.text('Grand Total:', 155, currentY + 10);
  pdf.text(`$${grandTotal.toFixed(2)}`, 180, currentY + 10);
  
  // Payment Terms
  if (data.paymentTerms) {
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Payment Terms: ${data.paymentTerms}`, 20, currentY + 30);
  }
  
  // Notes
  if (data.notes) {
    pdf.setFont('helvetica', 'bold');
    pdf.text('Notes:', 20, currentY + 50);
    pdf.setFont('helvetica', 'normal');
    const noteLines = data.notes.split('\n');
    noteLines.forEach((line, index) => {
      pdf.text(line, 20, currentY + 60 + (index * 10));
    });
  }
  
  // Download the PDF
  const fileName = `${data.type}-${data.id}.pdf`;
  pdf.save(fileName);
};
