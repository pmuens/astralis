import { useContractFunction } from '@usedapp/core'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { getContractInfo } from '../../utils/main'
import { useSharedState } from '../../utils/SharedState'

export default function Decrement(props: Props) {
  const { isLoading, setIsLoading } = props
  const { contract } = getContractInfo()
  const { setErrorMessage } = useSharedState()
  const { state, send } = useContractFunction(contract, 'decrement')

  useEffect(() => {
    if (state.status == 'Mining') setIsLoading(true)
    if (state.status != 'Mining') setIsLoading(false)
    if (state.status == 'Fail' || state.status == 'Exception') {
      setErrorMessage(state.errorMessage)
    }
  }, [state, setIsLoading, setErrorMessage])

  return (
    <button onClick={() => send()} disabled={isLoading}>
      -
    </button>
  )
}

type Props = {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}
