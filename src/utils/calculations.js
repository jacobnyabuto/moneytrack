export function calculateTotals(transactions) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0)

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0)

  return {
    income,
    expenses,
    balance: income - expenses,
  }
}

// Returns [{ category: "Rent", total: 1100 }, ...] sorted from highest to lowest
export function getExpensesByCategory(transactions) {
  const totals = {}

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount
    })

  return Object.entries(totals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
}