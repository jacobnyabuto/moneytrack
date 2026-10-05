import { useState } from 'react'
import { incomeCategories, expenseCategories } from '../data/categories'
import { getToday } from '../utils/dateHelpers'


function TransactionForm({
  onSave,
  initialData,
  heading = 'Add Transaction',
  submitLabel = 'Add Transaction',
  onCancel,
}) {
  const isEditing = Boolean(initialData)

  const [title, setTitle] = useState(initialData?.title ?? '')
  const [amount, setAmount] = useState(initialData ? String(initialData.amount) : '')
  const [type, setType] = useState(initialData?.type ?? 'expense')
  const [category, setCategory] = useState(initialData?.category ?? 'Food')
  const [date, setDate] = useState(initialData?.date ?? getToday())
  const [errors, setErrors] = useState({})

  const categoryOptions = type === 'income' ? incomeCategories : expenseCategories

  function handleTypeChange(e) {
    const newType = e.target.value
    setType(newType)
    setCategory(newType === 'income' ? incomeCategories[0] : expenseCategories[0])
  }

  function validate() {
    const newErrors = {}

    const trimmedTitle = title.trim()
    if (trimmedTitle === '') {
      newErrors.title = 'Please enter a title.'
    } else if (trimmedTitle.length > 60) {
      newErrors.title = 'Title must be 60 characters or fewer.'
    }

    const numericAmount = Number(amount)
    if (amount === '' || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      newErrors.amount = 'Amount must be greater than 0.'
    } else if (numericAmount > 1000000000) {
      newErrors.amount = 'Amount is too large.'
    }

    if (date === '') {
      newErrors.date = 'Please choose a date.'
    }

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const savedTransaction = {
      // When editing we keep the original id. When adding we create a new one.
      id: isEditing ? initialData.id : Date.now(),
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date,
    }

    onSave(savedTransaction)

    // Only clear the form when adding. When editing, the page navigates away.
    if (!isEditing) {
      setTitle('')
      setAmount('')
      setType('expense')
      setCategory('Food')
      setDate(getToday())
      setErrors({})
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card shadow-sm" noValidate>
      <div className="card-body">
        <h2 className="h5 fw-bold mb-3">{heading}</h2>

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              id="title"
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              placeholder="e.g. Grocery Shopping"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="type" className="form-label">Type</label>
            <select
              id="type"
              className="form-select"
              value={type}
              onChange={handleTypeChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              id="date"
              type="date"
              className={`form-control ${errors.date ? 'is-invalid' : ''}`}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="btn btn-success">
            <i className={`bi ${isEditing ? 'bi-check-circle' : 'bi-plus-circle'} me-1`}></i>
            {submitLabel}
          </button>

          {onCancel && (
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default TransactionForm