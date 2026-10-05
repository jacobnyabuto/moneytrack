import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <i className="bi bi-emoji-frown display-1 text-muted"></i>
      <h1 className="h2 fw-bold mt-3">Page not found</h1>
      <p className="text-muted">The page you are looking for doesn't exist.</p>
      <Link to="/" className="btn btn-success">
        <i className="bi bi-house me-1"></i>
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFoundPage