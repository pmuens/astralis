import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { isId } from '../../lib/utils/main'
import useMessage from '../../lib/hooks/messages/useMessage'
import { useSharedState } from '../../lib/utils/SharedState'
import useCreateMessage from '../../lib/hooks/messages/useCreateMessage'
import useUpdateMessage from '../../lib/hooks/messages/useUpdateMessage'

export default function Form(props: Props) {
  const { id } = props
  const router = useRouter()
  const [body, setBody] = useState('')
  const { isLoading, setIsLoading, setNotification } = useSharedState()

  const message = useMessage(id)
  const [, create] = useCreateMessage(body)
  const [, update] = useUpdateMessage(id, body)

  useEffect(() => {
    if (message && message.length) {
      const [, body] = message
      setBody(body as string)
    }
  }, [message])

  useEffect(() => {
    if (!router.isReady) {
      setIsLoading(true)
    } else if (router.isReady) {
      setIsLoading(false)
    }
  }, [router, setIsLoading])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!!body.trim()) {
      if (!isId(id)) {
        await create()
      } else {
        await update()
      }
      router.push('/app/messages')
      return
    }
    setNotification({ message: "Body can't be empty", type: 'error' })
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setBody(event.currentTarget.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Body" value={body} onChange={handleChange} />
      <button type="submit" disabled={isLoading}>
        Save
      </button>
    </form>
  )
}

type Props = {
  id?: number
}
