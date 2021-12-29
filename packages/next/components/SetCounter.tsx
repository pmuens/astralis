import { useState, useEffect, MouseEvent } from 'react'
import { useEthers, useContractFunction } from '@usedapp/core'

import { getContractInfo } from '../utils/main'

export default function SetCounter() {
  const { account } = useEthers()
  const { contract } = getContractInfo()
  const [isLoading, setIsLoading] = useState(false)
  const [counter, setCounter] = useState<number>()
  const { state, send } = useContractFunction(contract, 'set')

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    const value = prompt('Enter the new counter value')
    if (value) {
      const parsed = parseInt(value)
      if (Number.isNaN(parsed)) {
        alert('Please enter a valid number')
      } else {
        setCounter(parsed)
      }
    } else {
      alert('Please enter a value')
    }
  }

  useEffect(() => {
    if (state.status == 'Mining') setIsLoading(true)
    if (state.status != 'Mining') setIsLoading(false)
    if (state.status == 'Fail' || state.status == 'Exception') {
      alert('An Error occurred. Check the Browser logs for more info.')
      console.error(state.errorMessage)
    }
  }, [state])

  useEffect(() => {
    if (Number.isInteger(counter)) {
      send(counter)
      setCounter(undefined)
    }
  }, [send, counter])

  return (
    <>
      {account && (
        <button onClick={handleClick} disabled={isLoading}>
          {isLoading ? 'Mining...' : 'Set Counter'}
        </button>
      )}
    </>
  )
}
