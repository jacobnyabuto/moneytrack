const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

// "2025-02-31" matches the pattern but is not a real date, so we check both
function isValidDate(date) {
  if (typeof date !== 'string' || !DATE_PATTERN.test(date)) {
    return false
  }

  const [year, month, day] = date.split('-').map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day))

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  )
}

export function isValidTransaction(t) {
  return (
    typeof t === 'object' &&
    t !== null &&
    Number.isFinite(t.id) &&
    typeof t.title === 'string' &&
    t.title.trim() !== '' &&
    Number.isFinite(t.amount) &&
    t.amount > 0 &&
    (t.type === 'income' || t.type === 'expense') &&
    typeof t.category === 'string' &&
    t.category !== '' &&
    isValidDate(t.date)
  )
}

// Anything that is not an array becomes an empty list.
// Invalid items inside an array are dropped.
export function sanitizeTransactions(value) {
  if (!Array.isArray(value)) {
    return []
  }
  return value.filter(isValidTransaction)
}

// A budget must be a positive number. 0 means "no budget".
export function sanitizeBudget(value) {
  return Number.isFinite(value) && value > 0 ? value : 0
}

export function sanitizeTheme(value) {
  return value === 'dark' ? 'dark' : 'light'
}