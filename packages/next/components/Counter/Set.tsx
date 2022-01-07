import { Dispatch, SetStateAction, useEffect } from 'react'
import { TransactionStatus, useContractFunction } from '@usedapp/core'

import { getContractInfo } from '../../utils/main'
import { useSharedState } from '../../utils/SharedState'

export default function Set(props: Props) {
  const { setState } = props
  const { contract } = getContractInfo('Counter')
  const { setNotification } = useSharedState()
  const { state, send } = useContractFunction(contract, 'set')

  useEffect(() => {
    if (state) {
      setState(state)
    }
  }, [state, setState])

  function handleClick() {
    const value = prompt('Enter the new counter value')
    if (value) {
      const parsed = parseInt(value)
      if (Number.isNaN(parsed)) {
        setNotification({ message: 'Please enter a valid number', type: 'error' })
      } else {
        send(parsed)
      }
    }
  }

  return <button onClick={handleClick}>Set</button>
}

type Props = {
  setState: Dispatch<SetStateAction<TransactionStatus | undefined>>
}
