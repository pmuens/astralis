import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'

import Messages from '../../../components/Messages'
import useConnectionInfo from '../../../lib/hooks/useConnectionInfo'

const Index: NextPage = () => {
  const { isConnected, isCorrectConnection } = useConnectionInfo()
  return (
    <>
      <NextSeo title="Messages App" description="Welcome to the Messages App." />

      <section>
        <h1>Messages</h1>
        {!isConnected || (isConnected && isCorrectConnection) ? (
          <Messages />
        ) : (
          <p>
            Please connect to the correct network to continue (check the logs if you did and still see this message)
          </p>
        )}
      </section>
    </>
  )
}

export default Index
