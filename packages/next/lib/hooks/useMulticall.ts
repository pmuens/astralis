import { ContractInterface } from 'ethers'
import { useCallback, useEffect, useState } from 'react'

import { multicall } from '../utils/multicall'

export default function useMulticall(input: Input[], { skip, strict }: Config = {}) {
  const [state, setState] = useState<State>({ loading: false })

  // See https://twitter.com/dan_abramov/status/1104414272753487872
  const input_ = JSON.stringify(input)

  const read = useCallback(async () => {
    try {
      setState((x) => ({ ...x, loading: true }))
      const response = await multicall(input, strict)
      setState((x) => ({ ...x, loading: false, response }))
      return { data: response, error: undefined }
    } catch (error_) {
      const error = <Error>error_
      setState((x) => ({ ...x, error, loading: false }))
      return { data: undefined, error }
    }
  }, [strict, input_]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (skip) return

    let didCancel = false
    if (didCancel) return
    read()

    return () => {
      didCancel = true
    }
  }, [read, skip])

  return [
    {
      data: state.response,
      error: state.error,
      loading: state.loading
    },
    read
  ] as const
}

type Input = {
  address: string
  interface: ContractInterface
  function: string
  args?: unknown[]
}

type Config = {
  skip?: boolean
  strict?: boolean
}

type State = {
  response?: unknown[]
  error?: Error
  loading?: boolean
}
