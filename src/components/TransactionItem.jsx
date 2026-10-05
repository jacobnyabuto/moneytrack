import { Link } from 'react-router-dom'
import { formatCurrency, formatDate } from '../utils/formatters'

function TransactionItem({ transaction, onDelete }) {
  const { id, title, amount, type, category, date } = transaction

  const isIncome = type === 'income'

  function handleDeleteClick() {
    const confirmed = window.confirm(`Delete "${title}"?`)
    if (confirmed) {
      onDelete(id)
    }
  }

  return (
    <li className="list-group-item d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center gap-2">
      <div className="min-w-0">
        <div className="fw-semibold text-break">{title}</div>
        <div className="small text-muted">
          <span className="badge text-bg-secondary me-2">{category}</span>
          {formatDate(date)}
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between justify-content-sm-end flex-shrink-0">
        <div className={`fw-bold me-3 ${isIncome ? 'text-success' : 'text-danger'}`}>
          {isIncome ? '+' : '-'}
          {formatCurrency(amount)}
        </div>

        <div className="d-flex">
          <Link
            to={`/edit/${id}`}
            className="btn btn-sm btn-outline-primary me-2"
            aria-label={`Edit ${title}`}
          >
            <i className="bi bi-pencil"></i>
          </Link>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={handleDeleteClick}
            aria-label={`Delete ${title}`}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </li>
  )
}

export default TransactionItem