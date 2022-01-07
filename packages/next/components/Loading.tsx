import { useSharedState } from '../utils/SharedState'

export default function Loading() {
  const { isLoading } = useSharedState()

  return <>{isLoading && <span>Loading...</span>}</>
}
