import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContractRead } from 'wagmi'
import { formatUnits } from '@ethersproject/units'
import { useEffect, useMemo, useState } from 'react'

import { useSharedState } from '../../../lib/utils/SharedState'
import { getContractInfo, isId } from '../../../lib/utils/main'
import useErrorHandling from '../../../lib/hooks/useErrorHandling'
import useLoadingHandling from '../../../lib/hooks/useLoadingHandling'

const Show: NextPage = () => {
  const router = useRouter()
  const [id, setId] = useState<number | undefined>()
  const { isLoading, setIsLoading } = useSharedState()
  const { address, abi } = getContractInfo('Messages')

  const skip = !isId(id)
  const args = useMemo(() => isId(id) && [id], [id])
  const config = { addressOrName: address, contractInterface: abi }
  const [{ data, error, loading }] = useContractRead(config, 'getMessage', {
    args,
    skip
  })

  useErrorHandling([error])
  useLoadingHandling([loading])

  useEffect(() => {
    if (!router.isReady) {
      setIsLoading(true)
    } else if (router.isReady) {
      setIsLoading(false)
      setId(parseInt(router.query.id as string))
    }
  }, [router, setIsLoading])

  let body
  let owner
  let createdAt
  let updatedAt
  let isEntity
  if (data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = data as any[]
    if (message.length) {
      ;[, body, owner, createdAt, updatedAt, isEntity] = message
    }
  }

  return (
    <>
      <NextSeo title={`Message "${id}"`} description={`Show message "${id}" details.`} />

      <h1>Message &quot;{id}&quot; details</h1>
      {isLoading || !data ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <li>{id}</li>
          <li>{body}</li>
          <li>{owner}</li>
          <li>{createdAt && formatUnits(createdAt, 0)}</li>
          <li>{updatedAt && formatUnits(updatedAt, 0)}</li>
          <li>{isEntity ? 'true' : 'false'}</li>
        </ul>
      )}
    </>
  )
}

export default Show
