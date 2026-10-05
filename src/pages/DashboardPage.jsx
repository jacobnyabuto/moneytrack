import { Link } from 'react-router-dom'
import SummaryCard from '../components/SummaryCard'
import BudgetProgress from '../components/BudgetProgress'
import TransactionList from '../components/TransactionList'
import EmptyState from '../components/EmptyState'
import MonthPicker from '../components/MonthPicker'
import useTransactions from '../hooks/useTransactions'
import useMonthFilter from '../hooks/useMonthFilter'
import { calculateTotals } from '../utils/calculations'

function DashboardPage() {
  const { transactions, deleteTransaction, budget, setBudget } = useTransactions()
  const { months, activeMonth, setSelectedMonth, monthTransactions, periodLabel } =
    useMonthFilter(transactions)

  const { income, expenses, balance } = calculateTotals(monthTransactions)

  const recentTransactions = [...monthTransactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  // A budget only makes sense for one month, so "All time" gives null
  const spentForBudget = activeMonth === 'all' ? null : expenses

  return (
    <>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-0">Dashboard</h1>
          <div className="text-muted small">Showing: {periodLabel}</div>
        </div>
        <div style={{ minWidth: '220px' }}>
          <MonthPicker value={activeMonth} months={months} onChange={setSelectedMonth} />
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <SummaryCard title="Balance" amount={balance} icon="bi-wallet2" color="primary" />
        </div>
        <div className="col-12 col-md-4">
          <SummaryCard title="Income" amount={income} icon="bi-arrow-up-circle" color="success" />
        </div>
        <div className="col-12 col-md-4">
          <SummaryCard title="Expenses" amount={expenses} icon="bi-arrow-down-circle" color="danger" />
        </div>
      </div>

      <div className="mb-4">
        <BudgetProgress
          budget={budget}
          spent={spentForBudget}
          periodLabel={periodLabel}
          onSaveBudget={setBudget}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 fw-bold mb-0">Recent Transactions</h2>
        <Link to="/transactions" className="btn btn-sm btn-outline-success">
          View all
        </Link>
      </div>

      {recentTransactions.length === 0 ? (
        <EmptyState
          icon="bi-wallet2"
          title="No transactions yet"
          message="Add your first transaction to get started."
        />
      ) : (
        <TransactionList
          transactions={recentTransactions}
          onDelete={deleteTransaction}
        />
      )}
    </>
  )
}

export default DashboardPage