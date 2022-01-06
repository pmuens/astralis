import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'

import Counter from '../../../components/Counter'
import useConnectionInfo from '../../../hooks/useConnectionInfo'

const Index: NextPage = () => {
  const { isConnected, isCorrectConnection } = useConnectionInfo()
  return (
    <>
      <NextSeo title="Counter App" description="Welcome to the Counter App." />

      <section>
        <h1>Counter</h1>
        {!isConnected || (isConnected && isCorrectConnection) ? (
          <Counter />
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
