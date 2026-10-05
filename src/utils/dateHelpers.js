// "2025-01-15" -> "2025-01"
export function getMonthKey(date) {
  return date.slice(0, 7)
}

// Unique month keys from the transactions, newest first
export function getAvailableMonths(transactions) {
  const uniqueMonths = new Set(transactions.map((t) => getMonthKey(t.date)))
  return [...uniqueMonths].sort().reverse()
}

// "2025-01" -> "January 2025"
export function formatMonthLabel(monthKey) {
  return new Date(`${monthKey}-01T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

// Today's date in the user's LOCAL time zone, as "YYYY-MM-DD"
export function getToday() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}