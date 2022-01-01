import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import Hero from '../components/Hero'
import Info from '../components/Info'
import Counter from '../components/Counter'
import Notifications from '../components/Notifications'
import Transactions from '../components/Transactions'
import ConnectionCheck from '../components/ConnectionCheck'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Home" description="Welcome to the Next.js Template for EVM-based dApps." />

      <Hero
        heading="Next.js Template for EVM-based dApps"
        lead="Welcome to the Next.js Template for EVM-based dApps."
      />

      <hr />

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

export default Home
