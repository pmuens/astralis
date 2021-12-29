import { useNotifications } from '@usedapp/core'

export default function Notifications() {
  const { notifications } = useNotifications()

  const items = notifications.map((item) => {
    return <li key={item.id}>{item.type}</li>
  })

  return (
    <section>
      <h2>Notifications</h2>
      {items.length ? <ol>{items}</ol> : <p>No Notifications</p>}
    </section>
  )
}
