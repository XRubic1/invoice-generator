import InvoiceForm from './components/InvoiceForm.jsx';
import { useInvoiceForm } from './hooks/useInvoiceForm.js';

export default function App() {
  const { form, updateField, handleDownload, error, loading } = useInvoiceForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl animate-fade-up">
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Invoice Generator
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Fill in the fields below, then download a completed invoice based on your template.
          </p>
        </header>

        <main className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition hover:shadow-xl sm:p-8">
          <InvoiceForm
            form={form}
            updateField={updateField}
            onDownload={handleDownload}
            error={error}
            loading={loading}
          />
        </main>

        <p className="mt-6 text-center text-xs text-slate-500 sm:text-left">
          Line amount uses European-style formatting ($2.250,00). Total uses US format ($2,250.00).
        </p>
      </div>
    </div>
  );
}
