import { Button } from '@modulz/design-system'
import { useContractFunction } from '@usedapp/core'
import { useEffect, Dispatch, SetStateAction } from 'react'

import { getContractInfo } from '../utils/main'
import { useSharedState } from '../utils/SharedState'

export default function Increment(props: Props) {
  const { isLoading, setIsLoading } = props
  const { contract } = getContractInfo()
  const { setErrorMessage } = useSharedState()
  const { state, send } = useContractFunction(contract, 'increment')

  useEffect(() => {
    if (state.status == 'Mining') setIsLoading(true)
    if (state.status != 'Mining') setIsLoading(false)
    if (state.status == 'Fail' || state.status == 'Exception') {
      setErrorMessage(state.errorMessage)
      console.error(state.errorMessage)
    }
  }, [state, setIsLoading, setErrorMessage])

  return (
    <Button onClick={() => send()} disabled={isLoading} size="3" css={{ '&:hover': { cursor: 'pointer' } }}>
      +
    </Button>
  )
}

type Props = {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}
