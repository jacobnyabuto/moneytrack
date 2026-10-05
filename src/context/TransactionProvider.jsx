import { TransactionContext } from './TransactionContext'
import useLocalStorage from '../hooks/useLocalStorage'
import initialTransactions from '../data/transactions'
import { sanitizeTransactions, sanitizeBudget } from '../utils/validators'

function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage(
    'moneytrack-transactions',
    initialTransactions,
    sanitizeTransactions
  )

  // 0 means "no budget set yet"
  const [budget, setBudget] = useLocalStorage(
    'moneytrack-budget',
    0,
    sanitizeBudget
  )

  function addTransaction(newTransaction) {
    setTransactions((prev) => [newTransaction, ...prev])
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  function updateTransaction(updatedTransaction) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    )
  }

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    budget,
    setBudget,
  }

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}

export default TransactionProvider