import { useTransactions } from '@usedapp/core'

export default function Transactions() {
  const { transactions } = useTransactions()

  const items = transactions.map((item) => {
    return <li key={item.transaction.hash}>{item.transaction.hash}</li>
  })

  return (
    <section>
      <h2>Transactions</h2>
      {items.length ? <ol>{items}</ol> : <p>No Transactions</p>}
    </section>
  )
}
