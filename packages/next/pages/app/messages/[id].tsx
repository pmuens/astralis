import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useContractCall } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'

import { getContractInfo, isId } from '../../../utils/main'

const Show: NextPage = () => {
  const router = useRouter()
  const [id, setId] = useState<number | undefined>()
  const { address, abi } = getContractInfo('Messages')

  const getMessageArgs = isId(id) ? { address, abi, method: 'getMessage', args: [id] } : null
  const message = useContractCall(getMessageArgs)

  useEffect(() => {
    if (router.isReady) {
      setId(parseInt(router.query.id as string))
    }
  }, [router])

  let body
  let owner
  let createdAt
  let updatedAt
  let isEntity
  if (message?.length) {
    ;[, body, owner, createdAt, updatedAt, isEntity] = message
  }

  return (
    <>
      <NextSeo title={`Message "${id}"`} description={`Show message "${id}" details.`} />

      <h1>Message &quot;{id}&quot; details</h1>

      {!message ? (
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
