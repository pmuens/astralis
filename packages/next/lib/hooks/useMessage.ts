import useSWR from 'swr'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

import { DataType } from '../utils/constants'
import useErrorHandling from './useErrorHandling'
import useLoadingHandling from './useLoadingHandling'
import { getContractInfo, isId } from '../utils/main'
import useKeepBlockchainDataFresh from './useKeepBlockchainDataFresh'

export default function useMessage(id: number | undefined, suspense = false): unknown[] | undefined {
  const { address, abi } = getContractInfo('Messages')
  const config = { addressOrName: address, contractInterface: abi }

  const skip = !isId(id)
  const args = useMemo(() => isId(id) && [id], [id])
  const [{ data, error, loading }, read] = useContractRead(config, 'getMessage', {
    args,
    skip
  })

  const shouldFetch = isId(id)
  const result = useSWR(shouldFetch ? [{ args }, DataType.Message] : null, read, { suspense })

  useKeepBlockchainDataFresh(result.mutate)

  useErrorHandling([error, result.error])
  useLoadingHandling([loading, result.isValidating])

  if (data) return data as unknown[]
  if (result.data && result.data.data) return result.data.data as unknown[]
  return undefined
}
