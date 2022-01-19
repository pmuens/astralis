import { useEffect } from 'react'

import { useSharedState } from '../utils/SharedState'

export default function useLoadingHandling(items: (boolean | undefined)[]): void {
  const { setIsLoading } = useSharedState()

  const loading = items.find((item) => item !== undefined)

  useEffect(() => {
    if (loading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [loading, setIsLoading])
}
