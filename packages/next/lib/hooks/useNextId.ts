import useSWR from 'swr'
import { BigNumberish } from 'ethers'
import { useContractRead } from 'wagmi'

import { DataType } from '../utils/constants'
import { getContractInfo } from '../utils/main'
import useErrorHandling from './useErrorHandling'
import useLoadingHandling from './useLoadingHandling'
import useKeepBlockchainDataFresh from './useKeepBlockchainDataFresh'

export default function useNextId(suspense = false): BigNumberish | undefined {
  const { address, abi } = getContractInfo('Messages')
  const config = { addressOrName: address, contractInterface: abi }

  const [{ data, error, loading }, read] = useContractRead(config, 'nextId')

  const result = useSWR([DataType.MessageId], read, { suspense })

  useKeepBlockchainDataFresh(result.mutate)

  useErrorHandling([error, result.error])
  useLoadingHandling([loading, result.isValidating])

  if (data) return data as BigNumberish
  if (result.data && result.data.data) return result.data.data as BigNumberish
  return undefined
}
