function SortSelect({ value, onChange }) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Sort transactions"
    >
      <option value="date-desc">Newest first</option>
      <option value="date-asc">Oldest first</option>
      <option value="amount-desc">Highest amount</option>
      <option value="amount-asc">Lowest amount</option>
    </select>
  )
}

export default SortSelect