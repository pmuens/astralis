import { useContractFunction } from '@usedapp/core'
import { useEffect, Dispatch, SetStateAction } from 'react'

import { getContractInfo } from '../../utils/main'
import { useSharedState } from '../../utils/SharedState'

export default function Increment(props: Props) {
  const { isLoading, setIsLoading } = props
  const { setNotification } = useSharedState()
  const { contract } = getContractInfo('Counter')
  const { state, send } = useContractFunction(contract, 'increment')

  useEffect(() => {
    if (state.status == 'Mining') setIsLoading(true)
    if (state.status != 'Mining') setIsLoading(false)
    if (state.status == 'Fail' || state.status == 'Exception') {
      if (state.errorMessage) setNotification({ message: state.errorMessage, type: 'error' })
    }
  }, [state, setIsLoading, setNotification])

  return (
    <button onClick={() => send()} disabled={isLoading}>
      +
    </button>
  )
}

type Props = {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}
