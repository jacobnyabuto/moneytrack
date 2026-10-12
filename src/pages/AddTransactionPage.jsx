import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TransactionForm from '../components/TransactionForm'
import SmartEntry from '../components/SmartEntry'
import useTransactions from '../hooks/useTransactions'

function AddTransactionPage() {
  const { addTransaction } = useTransactions()
  const navigate = useNavigate()

  const [prefill, setPrefill] = useState(null)
  const [formVersion, setFormVersion] = useState(0)

  function handleParsed(transaction) {
    setPrefill(transaction)
    // Changing the key makes React build a fresh form with the new starting values
    setFormVersion((version) => version + 1)
  }

  function handleAdd(newTransaction) {
    addTransaction(newTransaction)
    navigate('/transactions')
  }

  return (
    <>
      <h1 className="h3 fw-bold mb-4">Add Transaction</h1>

      <div className="mb-4">
        <SmartEntry onParsed={handleParsed} />
      </div>

      {prefill && (
        <div className="alert alert-info py-2" role="status">
          <i className="bi bi-info-circle me-2"></i>
          Filled in by AI. Please check every field before saving.
        </div>
      )}

      <TransactionForm key={formVersion} prefill={prefill} onSave={handleAdd} />
    </>
  )
}

export default AddTransactionPage