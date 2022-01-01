import { useNotifications } from '@usedapp/core'

export default function Notifications() {
  const { notifications } = useNotifications()

  const items = notifications.map((item) => {
    return (
      <li key={item.id}>
        <p>{prettifyText(item.type)}</p>
      </li>
    )
  })

  return items.length ? <ol>{items}</ol> : <p>-</p>
}

function prettifyText(text: string): string {
  let result
  result = text.charAt(0).toLowerCase() + text.slice(1)
  result = result.replace(/([A-Z])/g, ' $1')
  result = result.charAt(0).toUpperCase() + result.slice(1)
  return result
}
