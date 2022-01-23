import { utils } from 'ethers'
import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'
import { BigNumberish } from 'ethers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import useMessage from '../../../lib/hooks/messages/useMessage'
import { useSharedState } from '../../../lib/utils/SharedState'

const { formatUnits } = utils

const Show: NextPage = () => {
  const router = useRouter()
  const { setIsLoading } = useSharedState()
  const [id, setId] = useState<number | undefined>()
  const message = useMessage(id)

  useEffect(() => {
    if (!router.isReady) {
      setIsLoading(true)
    } else if (router.isReady) {
      setIsLoading(false)
      setId(parseInt(router.query.id as string))
    }
  }, [router, setIsLoading])

  const msg: Record<string, string> = {}
  if (message) {
    msg.body = message[1] as string
    msg.owner = message[2] as string
    msg.createdAt = formatUnits(message[3] as BigNumberish, 0)
    msg.updatedAt = formatUnits(message[4] as BigNumberish, 0)
    msg.isEntity = (message[5] as boolean) ? 'true' : ('false' as string)
  }

  return (
    <>
      <NextSeo title={`Message "${id}"`} description={`Show message "${id}" details.`} />

      <h1>Message &quot;{id}&quot; details</h1>
      {Object.keys(msg).length && (
        <ul>
          <li>{id}</li>
          <li>{msg.body}</li>
          <li>{msg.owner}</li>
          <li>{msg.createdAt}</li>
          <li>{msg.updatedAt}</li>
          <li>{msg.isEntity}</li>
        </ul>
      )}
    </>
  )
}

export default Show
