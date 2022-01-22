import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Form from '../../../../components/Messages/Form'
import { useSharedState } from '../../../../lib/utils/SharedState'
import useRemoveMessage from '../../../../lib/hooks/messages/useRemoveMessage'
import useEnforceWalletConnection from '../../../../lib/hooks/useEnforceWalletConnection'

const Edit: NextPage = () => {
  useEnforceWalletConnection('/app/messages')

  const router = useRouter()
  const [id, setId] = useState<number | undefined>()
  const { isLoading, setIsLoading } = useSharedState()
  const [, write] = useRemoveMessage(id)

  useEffect(() => {
    if (!router.isReady) {
      setIsLoading(true)
    } else if (router.isReady) {
      setIsLoading(false)
      setId(parseInt(router.query.id as string))
    }
  }, [router, setIsLoading])

  async function handleClick() {
    await write()
    router.push('/app/messages')
  }

  return (
    <>
      <NextSeo title={`Edit message "${id}"`} description={`Edit message "${id}" details.`} />

      <h1>Edit message &quot;{id}&quot; details</h1>

      <Form id={id} />

      <button onClick={handleClick} disabled={isLoading}>
        Delete Message
      </button>
    </>
  )
}

export default Edit
