import { useEthers, getChainName } from '@usedapp/core'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!)

export default function useConnectionInfo(): ConnectionInfo {
  const { chainId, account } = useEthers()

  const readChainId = CHAIN_ID
  const writeChainId = chainId

  const chainName = chainId && getChainName(chainId)
  const readChainName = getChainName(readChainId)
  const writeChainName = writeChainId && getChainName(writeChainId)

  const isConnected = !!account
  const isCorrectConnection = !!(readChainId && writeChainId && readChainId == writeChainId)

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
  readChainName: string
  writeChainId?: number
  writeChainName?: string
  isConnected: boolean
  isCorrectConnection: boolean
}
