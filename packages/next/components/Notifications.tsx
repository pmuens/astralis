import { useNotifications } from '@usedapp/core'
import { Box, Heading, Paragraph } from '@modulz/design-system'

export default function Notifications() {
  const { notifications } = useNotifications()

  const items = notifications.map((item) => {
    return (
      <li key={item.id}>
        <Paragraph>{prettifyText(item.type)}</Paragraph>
      </li>
    )
  })

  return (
    <Box>
      <Heading as="h2" size="2" css={{ mb: '$2' }}>
        Notifications
      </Heading>
      {items.length ? (
        <ol style={{ margin: 0, padding: 0, listStyleType: 'none' }}>{items}</ol>
      ) : (
        <Paragraph css={{ textAlign: 'center' }}>-</Paragraph>
      )}
    </Box>
  )
}

function prettifyText(text: string): string {
  let result
  result = text.charAt(0).toLowerCase() + text.slice(1)
  result = result.replace(/([A-Z])/g, ' $1')
  result = result.charAt(0).toUpperCase() + result.slice(1)
  return result
}
