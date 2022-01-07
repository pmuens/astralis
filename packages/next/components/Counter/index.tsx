import { useState } from 'react'
import { formatUnits } from '@ethersproject/units'
import { TransactionStatus, useContractCall } from '@usedapp/core'

import Set from './Set'
import Increment from './Increment'
import Decrement from './Decrement'
import { getContractInfo } from '../../utils/main'
import useTransactionErrorHandling from '../../hooks/useTransactionErrorHandling'

export default function Counter() {
  const { address, abi } = getContractInfo('Counter')
  const [state, setState] = useState<TransactionStatus>()
  const [counter] = useContractCall({ address, abi, method: 'get', args: [] }) ?? []
  useTransactionErrorHandling(state)

  return (
    <>
      <b>{counter ? formatUnits(counter, 0) : 'Loading... (check the logs if it takes too long)'}</b>
      <>
        <Increment setState={setState} />
        <Decrement setState={setState} />
        <Set setState={setState} />
      </>
    </>
  )
}
