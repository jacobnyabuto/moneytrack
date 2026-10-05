import { NavLink, Link } from 'react-router-dom'
import { Collapse } from 'bootstrap'

function closeMenu() {
  const menu = document.getElementById('mainNav')

  // Only close it if it is currently open (the "show" class is present)
  if (menu && menu.classList.contains('show')) {
    Collapse.getOrCreateInstance(menu).hide()
  }
}

function Navbar({ theme, onToggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <nav className="navbar navbar-expand-lg bg-success navbar-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
          <i className="bi bi-wallet2 me-2"></i>
          MoneyTrack
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={closeMenu}>
                <i className="bi bi-speedometer2 me-1"></i>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/transactions" onClick={closeMenu}>
                <i className="bi bi-list-ul me-1"></i>
                Transactions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add" onClick={closeMenu}>
                <i className="bi bi-plus-circle me-1"></i>
                Add
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/reports" onClick={closeMenu}>
                <i className="bi bi-bar-chart me-1"></i>
                Reports
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <button
                type="button"
                className="btn btn-sm btn-outline-light"
                onClick={onToggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon-stars'}`}></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar