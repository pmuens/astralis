import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'

import Form from '../../../components/Messages/Form'
import useEnforceWalletConnection from '../../../lib/hooks/useEnforceWalletConnection'

const New: NextPage = () => {
  useEnforceWalletConnection('/app/messages')

  return (
    <>
      <NextSeo title="New message" description="Create a new message." />

      <h1>Create a new message</h1>
      <Form />
    </>
  )
}

export default New
