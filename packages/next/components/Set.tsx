import { useContractFunction } from '@usedapp/core'
import { useEffect, MouseEvent, Dispatch, SetStateAction } from 'react'

import { getContractInfo } from '../utils/main'
import { useSharedState } from '../utils/SharedState'

export default function Set(props: Props) {
  const { contract } = getContractInfo()
  const { isLoading, setIsLoading } = props
  const { setErrorMessage } = useSharedState()
  const { state, send } = useContractFunction(contract, 'set')

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    const value = prompt('Enter the new counter value')
    if (value) {
      const parsed = parseInt(value)
      if (Number.isNaN(parsed)) {
        setErrorMessage('Please enter a valid number')
      } else {
        send(parsed)
      }
    }
  }

  useEffect(() => {
    if (state.status == 'Mining') setIsLoading(true)
    if (state.status != 'Mining') setIsLoading(false)
    if (state.status == 'Fail' || state.status == 'Exception') {
      setErrorMessage(state.errorMessage)
    }
  }, [state, setIsLoading, setErrorMessage])

  return (
    <button onClick={handleClick} disabled={isLoading}>
      Set
    </button>
  )
}

type Props = {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}
