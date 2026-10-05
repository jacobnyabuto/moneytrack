import { downloadCsv } from '../utils/exportCsv'

function ExportButton({ transactions, filename }) {
  const isEmpty = transactions.length === 0

  return (
    <button
      type="button"
      className="btn btn-outline-success text-nowrap"
      onClick={() => downloadCsv(transactions, filename)}
      disabled={isEmpty}
    >
      <i className="bi bi-download me-1"></i>
      Export CSV
    </button>
  )
}

export default ExportButton