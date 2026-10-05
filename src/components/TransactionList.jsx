import TransactionItem from './TransactionItem'

function TransactionList({ transactions, onDelete }) {
  return (
    <ul className="list-group shadow-sm">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TransactionList