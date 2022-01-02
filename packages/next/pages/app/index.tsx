import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'

import Info from '../../components/Info'
import Counter from '../../components/Counter'
import Notifications from '../../components/Notifications'
import Transactions from '../../components/Transactions'
import ConnectionCheck from '../../components/ConnectionCheck'

const App: NextPage = () => {
  return (
    <>
      <NextSeo title="App" description="Welcome to the dApp." />

      <ConnectionCheck />

      <section>
        <h2>Counter</h2>
        <Counter />
      </section>

      <hr />

      <section>
        <h2>Notifications</h2>
        <Notifications />
      </section>

      <section>
        <h2>Connection Information</h2>
        <Info />
      </section>

      <section>
        <h2>Transactions</h2>
        <Transactions />
      </section>
    </>
  )
}

export default App
