import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import {
  formatInvoiceDate,
  formatLineAmount,
  formatTotal,
  splitAddress,
} from './formatters.js';

/** Text positions from the filled template (PDF bottom-left origin). */
const POSITIONS = {
  carrierName: { x: 19.4, y: 773.8, size: 10 },
  invoiceNumber: { x: 481.3, y: 773.0, size: 10 },
  date: { x: 494.6, y: 755.0, size: 10 },
  billTo: { x: 49.5, y: 675.3, size: 10 },
  loadPo: { x: 478.7, y: 674.8, size: 10 },
  addressLine1: { x: 49.5, y: 656.8, size: 10 },
  addressLine2: { x: 49.5, y: 644.0, size: 10 },
  amount: { x: 494.4, y: 563.7, size: 10 },
  total: { x: 499.1, y: 89.7, size: 9 },
};

/**
 * Fills the empty invoice PDF with form data and returns bytes for download.
 * @param {object} data - Invoice field values
 * @returns {Promise<Uint8Array>}
 */
export async function generateInvoicePdf(data) {
  const response = await fetch('/EmptyInvoice.pdf');
  if (!response.ok) {
    throw new Error('Could not load invoice template.');
  }

  const templateBytes = await response.arrayBuffer();
  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPage(0);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const color = rgb(0, 0, 0);

  const [addr1, addr2] = splitAddress(data.debtorAddress);
  const amount = data.amount || data.total;
  const total = data.total || data.amount;

  const fields = [
    { text: data.carrierName, pos: POSITIONS.carrierName, bold: true },
    { text: data.invoiceNumber ? `Invoice #: ${data.invoiceNumber}` : '', pos: POSITIONS.invoiceNumber },
    {
      text: data.date ? `Date: ${formatInvoiceDate(data.date)}` : '',
      pos: POSITIONS.date,
    },
    { text: data.debtorName ? `Bill To: ${data.debtorName}` : '', pos: POSITIONS.billTo },
    { text: data.loadNumber ? `Po: ${data.loadNumber}` : '', pos: POSITIONS.loadPo },
    { text: addr1, pos: POSITIONS.addressLine1 },
    { text: addr2, pos: POSITIONS.addressLine2 },
    { text: amount ? formatLineAmount(amount) : '', pos: POSITIONS.amount },
    { text: total ? formatTotal(total) : '', pos: POSITIONS.total },
  ];

  for (const { text, pos, bold } of fields) {
    if (!text?.trim()) continue;
    page.drawText(text, {
      x: pos.x,
      y: pos.y,
      size: pos.size,
      font: bold ? fontBold : font,
      color,
    });
  }

  return pdfDoc.save();
}

/**
 * Triggers a browser download of the generated PDF.
 * @param {Uint8Array} pdfBytes
 * @param {string} filename
 */
export function downloadPdf(pdfBytes, filename) {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
