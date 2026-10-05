export function formatCurrency(amount) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

// "2025-01-15" -> "Jan 15, 2025"
export function formatDate(date) {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}