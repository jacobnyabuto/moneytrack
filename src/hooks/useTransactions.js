import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

function useTransactions() {
  const context = useContext(TransactionContext)

  if (context === null) {
    throw new Error('useTransactions must be used inside a TransactionProvider')
  }

  return context
}

export default useTransactions