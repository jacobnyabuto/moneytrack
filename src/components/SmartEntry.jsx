import { useState } from 'react'
import { parseTransactionText, isAiAvailable } from '../utils/api'

function SmartEntry({ onParsed }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isAiAvailable) {
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const trimmed = text.trim()
    if (trimmed === '') {
      setError('Type a sentence first, for example: Paid 45 for lunch yesterday')
      return
    }

    setLoading(true)
    setError('')

    try {
      const transaction = await parseTransactionText(trimmed)
      onParsed(transaction)
      setText('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card shadow-sm border-success" noValidate>
      <div className="card-body">
        <h2 className="h5 fw-bold mb-1">
          <i className="bi bi-stars text-success me-2"></i>
          Smart entry
        </h2>
        <p className="text-muted small mb-3">
          Describe a transaction in your own words and AI will fill in the form below.
        </p>

        <div className="input-group">
          <input
            type="text"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="e.g. Paid 45 for lunch yesterday"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={200}
            disabled={loading}
            aria-label="Describe your transaction"
          />
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                Thinking...
              </>
            ) : (
              'Fill form'
            )}
          </button>
        </div>

        {error && (
          <div className="text-danger small mt-2" role="alert">
            {error}
          </div>
        )}

        <div className="text-muted small mt-2">
          <i className="bi bi-shield-lock me-1"></i>
          Your sentence is sent to an AI service (Google Gemini). Don't type private details.
        </div>
      </div>
    </form>
  )
}

export default SmartEntry