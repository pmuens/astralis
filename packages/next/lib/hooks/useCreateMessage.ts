import { useEffect } from 'react'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

import { getContractInfo } from '../utils/main'
import useErrorHandling from './useErrorHandling'
import { useSharedState } from '../utils/SharedState'
import useLoadingHandling from './useLoadingHandling'

export default function useCreateMessage(body: string | undefined) {
  const { setTxHash } = useSharedState()
  const { address, abi } = getContractInfo('Messages')
  const config = { addressOrName: address, contractInterface: abi }

  const [writeResult, write] = useContractWrite(config, 'createMessage', {
    args: [body]
  })

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

  return [{ data: waitData, loading: writeLoading || waitLoading }, write] as const
}
