import { useState } from 'react'
import { useContractCall } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'

import Set from './Set'
import Increment from './Increment'
import Decrement from './Decrement'
import { getContractInfo } from '../utils/main'
import useConnectionInfo from '../hooks/useConnectionInfo'

export default function Counter() {
  const { address, abi } = getContractInfo()
  const [isLoading, setIsLoading] = useState(false)
  const { isConnected, isCorrectConnection } = useConnectionInfo()
  const [counter] = useContractCall({ address, abi, method: 'get', args: [] }) ?? []

  return (
    <>
      <b>{counter ? formatUnits(counter, 0) : 'Loading... (check the logs if it takes too long)'}</b>
      {isConnected && isCorrectConnection && (
        <>
          {isLoading && <p>Loading...</p>}
          <Increment isLoading={isLoading} setIsLoading={setIsLoading} />
          <Decrement isLoading={isLoading} setIsLoading={setIsLoading} />
          <Set isLoading={isLoading} setIsLoading={setIsLoading} />
        </>
      )}
    </>
  )
}
