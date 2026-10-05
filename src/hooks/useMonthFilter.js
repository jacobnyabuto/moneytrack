import { useState } from 'react'
import { getAvailableMonths, getMonthKey, formatMonthLabel } from '../utils/dateHelpers'

function useMonthFilter(transactions) {
  const [selectedMonth, setSelectedMonth] = useState('all')

  const months = getAvailableMonths(transactions)

  // If the chosen month no longer has data (for example after deleting), use "all"
  const activeMonth = months.includes(selectedMonth) ? selectedMonth : 'all'

  const monthTransactions =
    activeMonth === 'all'
      ? transactions
      : transactions.filter((t) => getMonthKey(t.date) === activeMonth)

  const periodLabel = activeMonth === 'all' ? 'All time' : formatMonthLabel(activeMonth)

  return { months, activeMonth, setSelectedMonth, monthTransactions, periodLabel }
}

export default useMonthFilter