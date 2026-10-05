import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import AddTransactionPage from './pages/AddTransactionPage'
import EditTransactionPage from './pages/EditTransactionPage'
import ReportsPage from './pages/ReportsPage'
import NotFoundPage from './pages/NotFoundPage'
import useTheme from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <Layout theme={theme} onToggleTheme={toggleTheme}>
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/add" element={<AddTransactionPage />} />
          <Route path="/edit/:id" element={<EditTransactionPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </Layout>
  )
}

export default App