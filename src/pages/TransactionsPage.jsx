import { useState } from 'react'
import TransactionList from '../components/TransactionList'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import SortSelect from '../components/SortSelect'
import MonthPicker from '../components/MonthPicker'
import Pagination from '../components/Pagination'
import EmptyState from '../components/EmptyState'
import useTransactions from '../hooks/useTransactions'
import { getAvailableMonths, getMonthKey } from '../utils/dateHelpers'
import ExportButton from '../components/ExportButton'

const PAGE_SIZE = 8

function TransactionsPage() {
  const { transactions, deleteTransaction } = useTransactions()

  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const [currentPage, setCurrentPage] = useState(1)

  const months = getAvailableMonths(transactions)
  const activeMonth = months.includes(selectedMonth) ? selectedMonth : 'all'

  function handleSearchChange(value) {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  function handleTypeChange(value) {
    setTypeFilter(value)
    setCurrentPage(1)
  }

  function handleCategoryChange(value) {
    setCategoryFilter(value)
    setCurrentPage(1)
  }

  function handleMonthChange(value) {
    setSelectedMonth(value)
    setCurrentPage(1)
  }

  function handleSortChange(value) {
    setSortBy(value)
    setCurrentPage(1)
  }

  function handleResetFilters() {
    setSearchTerm('')
    setTypeFilter('all')
    setCategoryFilter('all')
    setSelectedMonth('all')
    setSortBy('date-desc')
    setCurrentPage(1)
  }

  // 1. Filter
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || t.type === typeFilter
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter
    const matchesMonth = activeMonth === 'all' || getMonthKey(t.date) === activeMonth

    return matchesSearch && matchesType && matchesCategory && matchesMonth
  })

  // 2. Sort (filter() already made a new array, so sorting it is safe)
  const sortedTransactions = filteredTransactions.sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return a.date.localeCompare(b.date)
      case 'amount-desc':
        return b.amount - a.amount
      case 'amount-asc':
        return a.amount - b.amount
      default:
        return b.date.localeCompare(a.date)
    }
  })

  // 3. Paginate
  const totalPages = Math.max(1, Math.ceil(sortedTransactions.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const visibleTransactions = sortedTransactions.slice(startIndex, startIndex + PAGE_SIZE)

  return (
    <>
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 fw-bold mb-0">Transactions</h1>
            <ExportButton transactions={sortedTransactions} />
        </div>

      <div className="row g-2 mb-2">
        <div className="col-12 col-lg-6">
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <MonthPicker
            value={activeMonth}
            months={months}
            onChange={handleMonthChange}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <SortSelect value={sortBy} onChange={handleSortChange} />
        </div>
      </div>

      <div className="mb-3">
        <FilterBar
          typeFilter={typeFilter}
          categoryFilter={categoryFilter}
          onTypeChange={handleTypeChange}
          onCategoryChange={handleCategoryChange}
          onReset={handleResetFilters}
        />
      </div>

      <p className="text-muted small">
        Showing {visibleTransactions.length} of {sortedTransactions.length} matching
        transactions (page {safePage} of {totalPages})
      </p>

      {sortedTransactions.length === 0 ? (
        <EmptyState
          icon="bi-search"
          title="No transactions found"
          message="Try a different search or clear the filters."
        />
      ) : (
        <>
          <TransactionList
            transactions={visibleTransactions}
            onDelete={deleteTransaction}
          />
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </>
  )
}

export default TransactionsPage