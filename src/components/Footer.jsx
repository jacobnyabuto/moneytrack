function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-body-tertiary border-top py-3 mt-auto">
      <div className="container text-center text-muted small">
        &copy; {currentYear} MoneyTrack. Built with React, Vite and Bootstrap.
      </div>
    </footer>
  )
}

export default Footer