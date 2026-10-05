function EmptyState({ icon = 'bi-inbox', title, message }) {
  return (
    <div className="text-center text-muted py-5 border rounded bg-body-tertiary">
      <i className={`bi ${icon} display-4`}></i>
      <h3 className="h5 mt-3">{title}</h3>
      <p className="mb-0">{message}</p>
    </div>
  )
}

export default EmptyState