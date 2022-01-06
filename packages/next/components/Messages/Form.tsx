import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useContractCall, useContractFunction } from '@usedapp/core'

import { useSharedState } from '../../utils/SharedState'
import { getContractInfo, isId } from '../../utils/main'

export default function Form(props: Props) {
  const { id } = props
  const router = useRouter()
  const [body, setBody] = useState('')
  const { setNotification } = useSharedState()
  const [isLoading, setIsLoading] = useState(true)
  const { address, abi, contract } = getContractInfo('Messages')

  const functionName = isId(id) ? 'updateMessage' : 'createMessage'
  const { state, send } = useContractFunction(contract, functionName)

  const getMessageArgs = isId(id) ? { address, abi, method: 'getMessage', args: [id] } : null
  const message = useContractCall(getMessageArgs)

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (message?.length) {
      const [, body] = message
      setBody(body)
    }
  }, [message])

  useEffect(() => {
    if (state.status != 'None') {
      if (state.status == 'Mining') setIsLoading(true)
      if (state.status != 'Mining') {
        setIsLoading(false)
        router.push('/app/messages')
      }
      if (state.status == 'Fail' || state.status == 'Exception') {
        if (state.errorMessage) setNotification({ message: state.errorMessage, type: 'error' })
      }
    }
  }, [state, router, setIsLoading, setNotification])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!!body.trim()) {
      if (isId(id)) return send(id, body)
      return send(body)
    }
    setNotification({ message: "Body can't be empty", type: 'error' })
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setBody(event.currentTarget.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Body" value={body} onChange={handleChange} />
      <button type="submit" disabled={isLoading}>
        Save
      </button>
    </form>
  )
}

type Props = {
  id?: number
}
