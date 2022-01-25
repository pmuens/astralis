import useSWR from 'swr'
import { useBlockNumber as useBlockNumber_ } from 'wagmi'

import { DataType } from './types'
import useErrorHandling from './useErrorHandling'
import useLoadingHandling from './useLoadingHandling'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const REFRESH_INTERVAL = parseInt(process.env.NEXT_PUBLIC_REFRESH_INTERVAL!)

export default function useBlockNumber(): number | undefined {
  const [{ error, loading }, getBlockNumber] = useBlockNumber_()

  const result = useSWR([DataType.BlockNumber], getBlockNumber, { refreshInterval: REFRESH_INTERVAL })

  useErrorHandling([error, result.error])
  useLoadingHandling([loading, result.isValidating])

  if (result.data && result.data.data) return result.data.data
  return result.data?.data
}
