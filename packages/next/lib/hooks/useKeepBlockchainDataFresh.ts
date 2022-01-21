import { KeyedMutator } from 'swr'
import { useEffect, useRef } from 'react'

import useBlockNumber from './useBlockNumber'

// Adaption of https://tinyurl.com/2p8kdtuh
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useKeepBlockchainDataFresh(mutate: KeyedMutator<any>): void {
  const mutateRef = useRef(mutate)
  useEffect(() => {
    mutateRef.current = mutate
  })
  const data = useBlockNumber()
  useEffect(() => {
    if (data) {
      mutateRef.current()
    }
  }, [data])
}
