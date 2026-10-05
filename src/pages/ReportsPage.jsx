import SummaryCard from '../components/SummaryCard'
import MonthPicker from '../components/MonthPicker'
import CategoryChart from '../components/CategoryChart'
import EmptyState from '../components/EmptyState'
import useTransactions from '../hooks/useTransactions'
import useMonthFilter from '../hooks/useMonthFilter'
import { CHART_COLORS } from '../data/chartColors'
import { calculateTotals, getExpensesByCategory } from '../utils/calculations'
import { formatCurrency } from '../utils/formatters'

function ReportsPage() {
  const { transactions } = useTransactions()
  const { months, activeMonth, setSelectedMonth, monthTransactions, periodLabel } =
    useMonthFilter(transactions)

  const { income, expenses, balance } = calculateTotals(monthTransactions)
  const categoryData = getExpensesByCategory(monthTransactions)

  return (
    <>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-0">Reports</h1>
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

      <h2 className="h5 fw-bold mb-3">Spending by Category</h2>

      {categoryData.length === 0 ? (
        <EmptyState
          icon="bi-pie-chart"
          title="No expenses to show"
          message="There are no expenses for this period."
        />
      ) : (
        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div style={{ maxWidth: '380px' }} className="mx-auto">
                  <CategoryChart data={categoryData} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th className="text-end">Amount</th>
                      <th className="text-end">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.map((item, index) => (
                      <tr key={item.category}>
                        <td>
                          <span
                            className="d-inline-block rounded-circle me-2"
                            style={{
                              width: '12px',
                              height: '12px',
                              backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                            }}
                          ></span>
                          {item.category}
                        </td>
                        <td className="text-end">{formatCurrency(item.total)}</td>
                        <td className="text-end">
                          {((item.total / expenses) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ReportsPage