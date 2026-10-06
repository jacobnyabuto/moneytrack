import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  // React calls this when a child throws an error while rendering
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  // A good place to log the error (later you could send it to a monitoring service)
  componentDidCatch(error, info) {
    console.error('MoneyTrack crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-5">
          <i className="bi bi-exclamation-triangle display-1 text-danger"></i>
          <h1 className="h2 fw-bold mt-3">Something went wrong</h1>
          <p className="text-muted">
            An unexpected error happened. Your saved data is safe.
          </p>
          <a href={import.meta.env.BASE_URL} className="btn btn-success">
            <i className="bi bi-house me-1"></i>
            Reload MoneyTrack
          </a>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary