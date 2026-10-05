import { allCategories } from '../data/categories'

function FilterBar({
  typeFilter,
  categoryFilter,
  onTypeChange,
  onCategoryChange,
  onReset,
}) {
  return (
    <div className="d-flex flex-column flex-sm-row gap-2">
      <select
        className="form-select"
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value)}
        aria-label="Filter by type"
      >
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        className="form-select"
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="all">All categories</option>
        {allCategories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <button
        type="button"
        className="btn btn-outline-secondary text-nowrap"
        onClick={onReset}
      >
        <i className="bi bi-x-circle me-1"></i>
        Clear
      </button>
    </div>
  )
}

export default FilterBar