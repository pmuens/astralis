import { chain, useAccount, useNetwork } from 'wagmi'

import useErrorHandling from './useErrorHandling'
import useLoadingHandling from './useLoadingHandling'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!)

export default function useConnectionInfo(): ConnectionInfo {
  const [networkResult] = useNetwork()
  const [accountResult] = useAccount()

  const { data: networkData, error: networkError, loading: networkLoading } = networkResult
  const { data: accountData, error: accountError, loading: accountLoading } = accountResult

  useErrorHandling([networkError, accountError])
  useLoadingHandling([networkLoading, accountLoading])

  const chainId = networkData.chain?.id

  const readChainId = CHAIN_ID
  const writeChainId = chainId

  const readChain = Object.values(chain).find((value) => value.id === readChainId)
  const writeChain = Object.values(chain).find((value) => value.id === writeChainId)

  const chainName = networkData.chain?.name

  const readChainName = readChain?.name
  const writeChainName = writeChain?.name

  const isConnected = !!accountData?.address
  const isCorrectConnection = !!(readChainId && writeChainId && readChainId === writeChainId)

  return {
    chainId,
    chainName,
    readChainId,
    readChainName,
    writeChainId,
    writeChainName,
    isConnected,
    isCorrectConnection
  }
}

type ConnectionInfo = {
  chainId?: number
  chainName?: string
  readChainId: number
  readChainName?: string
  writeChainId?: number
  writeChainName?: string
  isConnected: boolean
  isCorrectConnection: boolean
}
