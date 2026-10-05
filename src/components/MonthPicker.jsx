import { formatMonthLabel } from '../utils/dateHelpers'

function MonthPicker({ value, months, onChange }) {
  return (
    <div className="input-group">
      <span className="input-group-text">
        <i className="bi bi-calendar3"></i>
      </span>
      <select
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter by month"
      >
        <option value="all">All time</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {formatMonthLabel(month)}
          </option>
        ))}
      </select>
    </div>
  )
}

export default MonthPicker