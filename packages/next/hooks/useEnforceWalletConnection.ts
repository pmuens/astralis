import { useEffect } from 'react'
import { useRouter } from 'next/router'

import useConnectionInfo from './useConnectionInfo'

export default function useEnforceWalletConnection(redirectUrl: string) {
  const router = useRouter()
  const { isConnected } = useConnectionInfo()

  useEffect(() => {
    if (router.isReady && !isConnected) {
      router.push(redirectUrl)
    }
  }, [isConnected, router, redirectUrl])
}
