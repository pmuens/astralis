import { useState, useEffect } from 'react'
import { useEthers, useContractFunction } from '@usedapp/core'

import { getContractInfo } from '../utils/main'

export default function IncrementCounter() {
  const { account } = useEthers()
  const { contract } = getContractInfo()
  const [isLoading, setIsLoading] = useState(false)
  const { state, send } = useContractFunction(contract, 'increment')

  useEffect(() => {
    if (state.status == 'Mining') setIsLoading(true)
    if (state.status != 'Mining') setIsLoading(false)
    if (state.status == 'Fail' || state.status == 'Exception') {
      alert('An Error occurred. Check the Browser logs for more info.')
      console.error(state.errorMessage)
    }
  }, [state])

  return (
    <>
      {account && (
        <button onClick={() => send()} disabled={isLoading}>
          {isLoading ? 'Mining...' : 'Increment'}
        </button>
      )}
    </>
  )
}
