import { useTransactions } from '@usedapp/core'

export default function Transactions() {
  const { transactions } = useTransactions()

  const items = transactions.map((item) => {
    const hash = item.transaction.hash
    let status = 'Pending'
    if (item.receipt?.confirmations) {
      status = 'Approved'
    }
    return (
      <li key={hash}>
        <p>
          {status} {shortenHash(hash)}
        </p>
      </li>
    )
  })

  return items.length ? <ol>{items}</ol> : <p>-</p>
}

function shortenHash(hash: string): string {
  const start = hash.slice(0, 6)
  const end = hash.slice(-4)
  return `${start}...${end}`
}
