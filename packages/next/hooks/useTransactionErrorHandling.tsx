import { useEffect } from 'react'
import { TransactionStatus } from '@usedapp/core'

import { useSharedState } from '../utils/SharedState'

export default function useTransactionErrorHandling(state?: TransactionStatus) {
  const { setNotification } = useSharedState()

  useEffect(() => {
    if (state && (state.status == 'Fail' || state.status == 'Exception') && state.errorMessage) {
      setNotification({ message: state.errorMessage, type: 'error' })
    }
  }, [state, setNotification])
}
