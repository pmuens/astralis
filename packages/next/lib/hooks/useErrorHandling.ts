import { useEffect } from 'react'

import { useSharedState } from '../utils/SharedState'

export default function useErrorHandling(errors: (Error | undefined)[]): void {
  const { setNotification } = useSharedState()

  const error = errors.find((item) => item !== undefined)

  useEffect(() => {
    if (error) {
      const { message } = error
      message && setNotification({ message, type: 'error' })
    }
  }, [error, setNotification])
}
