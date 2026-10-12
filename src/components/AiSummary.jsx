import { useState } from 'react'
import { fetchSummary, isAiAvailable } from '../utils/api'

function AiSummary({ periodLabel, income, expenses, budget, categories }) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isAiAvailable) {
    return null
  }

  async function handleGenerate() {
    setLoading(true)
    setError('')

    try {
      // Only totals leave the browser, never individual transactions
      const data = await fetchSummary({
        periodLabel,
        income,
        expenses,
        budget,
        categories: categories.map((item) => ({
          category: item.category,
          total: item.total,
        })),
      })
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card shadow-sm border-success">
      <div className="card-body">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
          <div>
            <h2 className="h5 fw-bold mb-1">
              <i className="bi bi-stars text-success me-2"></i>
              AI summary
            </h2>
            <div className="text-muted small">
              A short written review of your spending for {periodLabel}.
            </div>
          </div>

          <button
            type="button"
            className="btn btn-success text-nowrap"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                Writing...
              </>
            ) : result ? (
              'Regenerate'
            ) : (
              'Generate AI summary'
            )}
          </button>
        </div>

        {error && (
          <div className="alert alert-danger py-2 mt-3 mb-0" role="alert">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-3">
            <p className="mb-2">{result.summary}</p>

            {result.tips.length > 0 && (
              <ul className="mb-0">
                {result.tips.map((tip, index) => (
                  <li key={`${index}-${tip}`}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="text-muted small mt-3">
          <i className="bi bi-shield-lock me-1"></i>
          Only your category totals are sent to an AI service (Google Gemini). AI can make
          mistakes, and this is general information, not financial advice.
        </div>
      </div>
    </div>
  )
}

export default AiSummary