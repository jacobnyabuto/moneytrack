import { useState } from 'react'
import { formatCurrency } from '../utils/formatters'



function BudgetProgress({ budget, spent, periodLabel, onSaveBudget }) {
  const [isEditing, setIsEditing] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  function startEditing() {
    setInput(budget > 0 ? String(budget) : '')
    setError('')
    setIsEditing(true)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const value = Number(input)
    if (input === '' || value <= 0) {
      setError('Budget must be greater than 0.')
      return
    }

    onSaveBudget(value)
    setIsEditing(false)
  }

  function handleRemove() {
    onSaveBudget(0)
    setIsEditing(false)
  }

  // ---------- View 1: edit form ----------
  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="card shadow-sm" noValidate>
        <div className="card-body">
          <h2 className="h5 fw-bold mb-3">Monthly Budget</h2>

          <label htmlFor="budget" className="form-label">
            Maximum spending per month
          </label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              id="budget"
              type="number"
              step="0.01"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              placeholder="e.g. 2000"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          <div className="mt-3 d-flex flex-wrap gap-2">
            <button type="submit" className="btn btn-success">
              <i className="bi bi-check-circle me-1"></i>
              Save Budget
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            {budget > 0 && (
              <button
                type="button"
                className="btn btn-outline-danger ms-sm-auto"
                onClick={handleRemove}
              >
                Remove budget
              </button>
            )}
          </div>
        </div>
      </form>
    )
  }

  // ---------- View 2: no budget set ----------
  if (budget === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-body d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
          <div>
            <h2 className="h5 fw-bold mb-1">Monthly Budget</h2>
            <div className="text-muted small">
              Set a spending limit and we'll warn you before you go over it.
            </div>
          </div>
          <button type="button" className="btn btn-success" onClick={startEditing}>
            <i className="bi bi-piggy-bank me-1"></i>
            Set budget
          </button>
        </div>
      </div>
    )
  }

  // ---------- View 3: progress ----------
  // A budget exists, but "All time" is selected, so there is no single month to compare
  if (spent === null) {
    return (
      <div className="card shadow-sm">
        <div className="card-body d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
          <div>
            <h2 className="h5 fw-bold mb-1">Monthly Budget: {formatCurrency(budget)}</h2>
            <div className="text-muted small">
              Choose a specific month above to see how you're doing.
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={startEditing}
          >
            <i className="bi bi-pencil me-1"></i>
            Edit
          </button>
        </div>
      </div>
    )
  }

  const percent = (spent / budget) * 100
  const remaining = budget - spent

  let status = 'success'
  if (percent >= 100) {
    status = 'danger'
  } else if (percent >= 80) {
    status = 'warning'
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h2 className="h5 fw-bold mb-0">Monthly Budget</h2>
            <div className="text-muted small">{periodLabel}</div>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={startEditing}
          >
            <i className="bi bi-pencil me-1"></i>
            Edit
          </button>
        </div>

        <div className="d-flex justify-content-between small mb-1">
          <span>
            <strong>{formatCurrency(spent)}</strong> spent of {formatCurrency(budget)}
          </span>
          <span className="fw-semibold">{Math.round(percent)}%</span>
        </div>

        <div
          className="progress"
          role="progressbar"
          aria-label="Budget used"
          aria-valuenow={Math.round(percent)}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ height: '12px' }}
        >
          <div
            className={`progress-bar bg-${status}`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          ></div>
        </div>

        {status === 'success' && (
          <div className="text-muted small mt-2">
            {formatCurrency(remaining)} left to spend this month.
          </div>
        )}

        {status === 'warning' && (
          <div className="alert alert-warning mt-3 mb-0 py-2" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Careful! You've used {Math.round(percent)}% of your budget. Only{' '}
            {formatCurrency(remaining)} left.
          </div>
        )}

        {status === 'danger' && (
          <div className="alert alert-danger mt-3 mb-0 py-2" role="alert">
            <i className="bi bi-x-octagon me-2"></i>
            Over budget by {formatCurrency(Math.abs(remaining))}.
          </div>
        )}
      </div>
    </div>
  )
}

export default BudgetProgress