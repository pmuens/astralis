import { useTransactions } from '@usedapp/core'
import { Badge, Box, Flex, Heading, Paragraph } from '@modulz/design-system'

export default function Transactions() {
  const { transactions } = useTransactions()

  const items = transactions.map((item) => {
    const hash = item.transaction.hash
    let status = <Badge variant="pink">Pending</Badge>
    if (item.receipt?.confirmations) {
      status = <Badge variant="green">Approved</Badge>
    }
    return (
      <li key={hash}>
        <Flex align="center">
          {status} <Paragraph css={{ ml: '$1' }}>{shortenHash(hash)}</Paragraph>
        </Flex>
      </li>
    )
  })

  return (
    <Box>
      <Heading as="h2" size="2" css={{ mb: '$2' }}>
        Transactions
      </Heading>
      {items.length ? (
        <ol style={{ margin: 0, padding: 0, listStyleType: 'none' }}>{items}</ol>
      ) : (
        <Paragraph css={{ textAlign: 'center' }}>-</Paragraph>
      )}
    </Box>
  )
}

function shortenHash(hash: string): string {
  const start = hash.slice(0, 6)
  const end = hash.slice(-4)
  return `${start}...${end}`
}
