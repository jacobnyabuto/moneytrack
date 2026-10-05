import { formatCurrency } from '../utils/formatters'

function SummaryCard({ title, amount, icon, color }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body d-flex align-items-center">
        <div className={`fs-1 me-3 text-${color}`}>
          <i className={`bi ${icon}`}></i>
        </div>
        <div>
          <div className="text-muted small">{title}</div>
          <div className={`fs-4 fw-bold text-${color}`}>{formatCurrency(amount)}</div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard