const fields = [
  { name: 'carrierName', label: 'Carrier name', placeholder: 'TESLA TRANSPORTATION GROUP LLC', required: true },
  { name: 'invoiceNumber', label: 'Invoice #', placeholder: '30047278', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'debtorName', label: 'Debtor (Bill To)', placeholder: 'JONES MOTOR CO' },
  { name: 'debtorAddress', label: 'Debtor address', placeholder: 'PO BOX 137 - TRIUMPH!, SPRING CITY, PA, 19475', multiline: true },
  { name: 'loadNumber', label: 'Load # (PO)', placeholder: 'J6478429' },
  { name: 'amount', label: 'Amount', placeholder: '2250', type: 'text' },
  { name: 'total', label: 'Total', placeholder: '2250', type: 'text' },
];

/**
 * Invoice data entry form.
 */
export default function InvoiceForm({ form, updateField, onDownload, error, loading }) {
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        onDownload();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ name, label, placeholder, type = 'text', required, multiline }) => (
          <div
            key={name}
            className={multiline ? 'sm:col-span-2' : ''}
          >
            <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
              {label}
              {required && <span className="text-red-500"> *</span>}
            </label>
            {multiline ? (
              <textarea
                id={name}
                name={name}
                rows={3}
                value={form[name]}
                onChange={(e) => updateField(name, e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={(e) => updateField(name, e.target.value)}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? 'Generating…' : 'Download invoice PDF'}
      </button>
    </form>
  );
}
