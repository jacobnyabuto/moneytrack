function SearchBar({ value, onChange }) {
  return (
    <div className="input-group">
      <span className="input-group-text">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search transactions by title"
      />
    </div>
  )
}

export default SearchBar