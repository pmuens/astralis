import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'

import { useSharedState } from '../../lib/utils/SharedState'
import { getContractInfo, isId } from '../../lib/utils/main'
import useErrorHandling from '../../lib/hooks/useErrorHandling'
import useLoadingHandling from '../../lib/hooks/useLoadingHandling'

export default function Form(props: Props) {
  const { id } = props
  const router = useRouter()
  const [body, setBody] = useState('')
  const { address, abi } = getContractInfo('Messages')
  const [confirmations, setConfirmations] = useState(0)
  const { isLoading, setIsLoading, setNotification, setTxHash } = useSharedState()

  const config = { addressOrName: address, contractInterface: abi }

  const readArgs = useMemo(() => isId(id) && [id], [id])
  const [readResult] = useContractRead(config, 'getMessage', {
    args: readArgs,
    skip: !isId(id)
  })

  const writeArgs = useMemo(() => (isId(id) ? [id, body] : [body]), [id, body])
  const [writeResult, write] = useContractWrite(config, isId(id) ? 'updateMessage' : 'createMessage', {
    args: writeArgs
  })

  const [waitResult] = useWaitForTransaction({ hash: writeResult.data?.hash })

  const { data: readData, error: readError, loading: readLoading } = readResult
  const { data: writeData, error: writeError, loading: writeLoading } = writeResult
  const { data: waitData, error: waitError, loading: waitLoading } = waitResult

  useErrorHandling([readError, writeError, waitError])
  useLoadingHandling([readLoading, writeLoading, waitLoading])

  useEffect(() => {
    if (!readLoading && readData?.length) {
      const [, body] = readData
      setBody(body as string)
    }
  }, [readLoading, readData])

  useEffect(() => {
    if (!writeLoading && writeData) {
      setTxHash(writeData.hash)
    }
  }, [writeLoading, writeData, setTxHash])

  useEffect(() => {
    if (!waitLoading && waitData) {
      setConfirmations(waitData.confirmations)
    }
  }, [waitLoading, waitData])

  useEffect(() => {
    if (!router.isReady) {
      setIsLoading(true)
    } else if (router.isReady) {
      setIsLoading(false)
    }
  }, [router, setIsLoading])

  useEffect(() => {
    if (router.isReady && confirmations > 0) {
      router.push('/app/messages')
    }
  }, [router, confirmations])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!!body.trim()) return write()
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
