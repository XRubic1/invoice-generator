/**
 * Formats a number as line-item amount (e.g. $2.250,00).
 * @param {number|string} value
 * @returns {string}
 */
export function formatLineAmount(value) {
  const num = parseAmount(value);
  if (Number.isNaN(num)) return '';
  const [whole, cents = '00'] = num.toFixed(2).split('.');
  const withThousands = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `$${withThousands},${cents}`;
}

/**
 * Formats a number as US total (e.g. $2,250.00).
 * @param {number|string} value
 * @returns {string}
 */
export function formatTotal(value) {
  const num = parseAmount(value);
  if (Number.isNaN(num)) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(num);
}

/**
 * Parses currency input to a number.
 * @param {number|string} value
 * @returns {number}
 */
export function parseAmount(value) {
  if (typeof value === 'number') return value;
  const raw = String(value).trim().replace(/[$\s]/g, '');
  if (!raw) return NaN;
  if (raw.includes(',') && raw.includes('.')) {
    return parseFloat(raw.replace(/\./g, '').replace(',', '.'));
  }
  if (raw.includes(',')) {
    const parts = raw.split(',');
    if (parts[1]?.length === 2) return parseFloat(`${parts[0].replace(/\./g, '')}.${parts[1]}`);
    return parseFloat(raw.replace(/,/g, ''));
  }
  return parseFloat(raw.replace(/,/g, ''));
}

/**
 * Formats date as MM/DD/YYYY for the PDF.
 * @param {string} isoDate - YYYY-MM-DD from input[type=date]
 * @returns {string}
 */
export function formatInvoiceDate(isoDate) {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-');
  return `${m}/${d}/${y}`;
}

/**
 * Splits debtor address into up to two lines for the PDF.
 * @param {string} address
 * @returns {string[]}
 */
export function splitAddress(address) {
  if (!address?.trim()) return ['', ''];
  const parts = address
    .split(/[\n,]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length <= 2) {
    return [parts[0] || '', parts.slice(1).join(', ') || ''];
  }
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(', '), parts.slice(mid).join(', ')];
}
