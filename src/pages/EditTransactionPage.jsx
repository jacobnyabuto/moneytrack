import { useParams, useNavigate, Link } from 'react-router-dom'
import TransactionForm from '../components/TransactionForm'
import EmptyState from '../components/EmptyState'
import useTransactions from '../hooks/useTransactions'

function EditTransactionPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { transactions, updateTransaction } = useTransactions()

  // The URL gives us a string, but our ids are numbers
  const transaction = transactions.find((t) => t.id === Number(id))

  function handleUpdate(updatedTransaction) {
    updateTransaction(updatedTransaction)
    navigate('/transactions')
  }

  if (!transaction) {
    return (
      <>
        <EmptyState
          icon="bi-exclamation-circle"
          title="Transaction not found"
          message="It may have been deleted, or the link is wrong."
        />
        <div className="text-center mt-3">
          <Link to="/transactions" className="btn btn-success">
            Back to Transactions
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <h1 className="h3 fw-bold mb-4">Edit Transaction</h1>
      <TransactionForm
        key={transaction.id}
        initialData={transaction}
        heading="Update details"
        submitLabel="Save Changes"
        onSave={handleUpdate}
        onCancel={() => navigate('/transactions')}
      />
    </>
  )
}

export default EditTransactionPage