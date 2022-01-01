import { useEffect } from 'react'

import { useSharedState } from '../utils/SharedState'

export default function Alert() {
  const { errorMessage, resetErrorMessage } = useSharedState()

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage)
      resetErrorMessage()
    }
  }, [errorMessage, resetErrorMessage])

  return <></>
}
