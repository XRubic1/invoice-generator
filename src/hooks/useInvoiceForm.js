import { useCallback, useState } from 'react';
import { generateInvoicePdf, downloadPdf } from '../utils/pdfGenerator.js';

const defaultForm = {
  carrierName: '',
  invoiceNumber: '',
  date: new Date().toISOString().slice(0, 10),
  debtorName: '',
  debtorAddress: '',
  loadNumber: '',
  amount: '',
  total: '',
};

/**
 * Manages invoice form state and PDF download.
 * @returns {object} form state and handlers
 */
export function useInvoiceForm() {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = useCallback((name, value) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'amount' && !prev.total) {
        next.total = value;
      }
      return next;
    });
    setError('');
  }, []);

  const handleDownload = useCallback(async () => {
    if (!form.carrierName?.trim()) {
      setError('Carrier name is required.');
      return;
    }
    if (!form.invoiceNumber?.trim()) {
      setError('Invoice number is required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const pdfBytes = await generateInvoicePdf(form);
      const filename = `Invoice_${form.invoiceNumber}.pdf`;
      downloadPdf(pdfBytes, filename);
    } catch (err) {
      setError(err.message || 'Failed to generate invoice.');
    } finally {
      setLoading(false);
    }
  }, [form]);

  return { form, updateField, handleDownload, error, loading };
}
