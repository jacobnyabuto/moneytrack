function escapeCsvValue(value) {
  let text = String(value)

  // Prevent spreadsheet formulas from running (e.g. a title like "=1+1")
  if (/^[=+\-@]/.test(text)) {
    text = `'${text}`
  }

  // Wrap in quotes if the text contains a comma, quote, or line break
  if (/[",\n\r]/.test(text)) {
    text = `"${text.replace(/"/g, '""')}"`
  }

  return text
}

export function transactionsToCsv(transactions) {
  const header = ['Date', 'Title', 'Type', 'Category', 'Amount']

  const rows = transactions.map((t) => [
    t.date,
    t.title,
    t.type,
    t.category,
    t.amount.toFixed(2),
  ])

  return [header, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n')
}

export function downloadCsv(transactions, filename = 'moneytrack-transactions.csv') {
  const csv = transactionsToCsv(transactions)

  // \uFEFF is the BOM so Excel reads the file as UTF-8
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}