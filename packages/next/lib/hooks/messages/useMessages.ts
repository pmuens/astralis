import useSWR from 'swr'

import { DataType } from './types'
import useNextId from './useNextId'
import useMulticall from '../useMulticall'
import { getContractInfo } from '../../utils/main'
import useErrorHandling from '../useErrorHandling'
import useLoadingHandling from '../useLoadingHandling'
import useKeepBlockchainDataFresh from '../useKeepBlockchainDataFresh'

export default function useMessage(suspense = false): [unknown[]] | undefined {
  const nextId = useNextId()
  const { address, abi } = getContractInfo('Messages')

  const calls = []
  for (let i = 0; nextId && i < nextId; i++) {
    calls.push({
      address,
      interface: abi,
      function: 'messages',
      args: [i]
    })
  }

  const skip = !calls.length
  const [{ data, error, loading }, read] = useMulticall(calls, { skip })

  const shouldFetch = calls.length
  const result = useSWR(shouldFetch ? [DataType.Messages] : null, read, { suspense })

  useKeepBlockchainDataFresh(result.mutate)

  useErrorHandling([error, result.error])
  useLoadingHandling([loading, result.isValidating])

  if (data) return data as [unknown[]]
  if (result.data && result.data.data) return result.data.data as [unknown[]]
  return undefined
}
