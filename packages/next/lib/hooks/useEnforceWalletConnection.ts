import { useEffect } from 'react'
import { useRouter } from 'next/router'

import useConnectionInfo from './useConnectionInfo'
import { useSharedState } from '../utils/SharedState'

export default function useEnforceWalletConnection(redirectUrl: string) {
  const router = useRouter()
  const { isConnected } = useConnectionInfo()
  const { setNotification } = useSharedState()

  useEffect(() => {
    if (router.isReady && !isConnected) {
      setNotification({ message: 'You need to connect your Wallet to continue', type: 'info' })
      router.push(redirectUrl)
    }
  }, [isConnected, router, redirectUrl, setNotification])
}
