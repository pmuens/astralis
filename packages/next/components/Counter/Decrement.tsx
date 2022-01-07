import { Dispatch, SetStateAction, useEffect } from 'react'
import { TransactionStatus, useContractFunction } from '@usedapp/core'

import { getContractInfo } from '../../utils/main'

export default function Decrement(props: Props) {
  const { setState } = props
  const { contract } = getContractInfo('Counter')
  const { state, send } = useContractFunction(contract, 'decrement')

  useEffect(() => {
    if (state) {
      setState(state)
    }
  }, [state, setState])

  function handleClick() {
    send()
    setState(state)
  }

  return <button onClick={handleClick}>-</button>
}

type Props = {
  setState: Dispatch<SetStateAction<TransactionStatus | undefined>>
}
