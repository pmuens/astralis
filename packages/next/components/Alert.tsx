import { useEffect } from 'react'

import { useSharedState } from '../utils/SharedState'

export default function Alert() {
  const { notification, resetNotification } = useSharedState()

  useEffect(() => {
    if (notification) {
      alert(notification.message)
      resetNotification()
    }
  }, [notification, resetNotification])

  return <></>
}
