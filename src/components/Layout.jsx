import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children, theme, onToggleTheme }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <main className="container py-4 flex-grow-1">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout