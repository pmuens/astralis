import { useEffect } from 'react'

import { useSharedState } from '../utils/SharedState'

const DISPLAY_SECONDS = 5 * 1000

export default function Notifications() {
  const { notification, resetNotification } = useSharedState()

  useEffect(() => {
    let interval: NodeJS.Timer
    if (notification) {
      interval = setInterval(() => {
        resetNotification()
      }, DISPLAY_SECONDS)
    }
    return () => clearInterval(interval)
  }, [notification, resetNotification])

  return (
    <>
      {notification && (
        <p>
          {notification.type}: {notification.message} <button onClick={() => resetNotification()}>x</button>
        </p>
      )}
    </>
  )
}
