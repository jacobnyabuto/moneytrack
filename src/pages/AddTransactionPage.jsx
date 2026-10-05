import { useNavigate } from 'react-router-dom'
import TransactionForm from '../components/TransactionForm'
import useTransactions from '../hooks/useTransactions'

function AddTransactionPage() {
  const { addTransaction } = useTransactions()
  const navigate = useNavigate()

  function handleAdd(newTransaction) {
    addTransaction(newTransaction)
    navigate('/transactions')
  }

  return (
    <>
      <h1 className="h3 fw-bold mb-4">Add Transaction</h1>
      <TransactionForm onSave={handleAdd} />
    </>
  )
}

export default AddTransactionPage