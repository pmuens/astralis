import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

import Form from '../../../../components/Messages/Form'
import { useSharedState } from '../../../../lib/utils/SharedState'
import { getContractInfo, isId } from '../../../../lib/utils/main'
import useErrorHandling from '../../../../lib/hooks/useErrorHandling'
import useLoadingHandling from '../../../../lib/hooks/useLoadingHandling'
import useEnforceWalletConnection from '../../../../lib/hooks/useEnforceWalletConnection'

const Edit: NextPage = () => {
  useEnforceWalletConnection('/app/messages')

  const router = useRouter()
  const [id, setId] = useState<number | undefined>()
  const { address, abi } = getContractInfo('Messages')
  const [confirmations, setConfirmations] = useState(0)
  const { isLoading, setTxHash, setIsLoading } = useSharedState()

  const config = { addressOrName: address, contractInterface: abi }
  const writeArgs = useMemo(() => isId(id) && [id], [id])
  const [writeResult, write] = useContractWrite(config, 'removeMessage', { args: writeArgs })

  const [waitResult] = useWaitForTransaction({ hash: writeResult.data?.hash })

  const { data: writeData, error: writeError, loading: writeLoading } = writeResult
  const { data: waitData, error: waitError, loading: waitLoading } = waitResult

  useErrorHandling([writeError, waitError])
  useLoadingHandling([writeLoading, waitLoading])

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
      setId(parseInt(router.query.id as string))
    }
  }, [router, setIsLoading])

  useEffect(() => {
    if (router.isReady && confirmations > 0) {
      router.push('/app/messages')
    }
  }, [router, confirmations])

  return (
    <>
      <NextSeo title={`Edit message "${id}"`} description={`Edit message "${id}" details.`} />

      <h1>Edit message &quot;{id}&quot; details</h1>

      {isId(id) && <Form id={id} />}

      <button onClick={() => write()} disabled={isLoading}>
        Delete Message
      </button>
    </>
  )
}

export default Edit
