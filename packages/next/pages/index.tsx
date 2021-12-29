import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import Info from '../components/Info'
import Notifications from '../components/Notifications'
import Transactions from '../components/Transactions'
import GetCounter from '../components/GetCounter'
import IncrementCounter from '../components/IncrementCounter'
import DecrementCounter from '../components/DecrementCounter'
import SetCounter from '../components/SetCounter'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Home" description="Welcome to the Next.js Template for EVM-based dApps." />
      <section>
        <h1>Next.js Template for EVM-based dApps</h1>
        <p>Welcome to the Next.js Template for EVM-based dApps.</p>

        <Info />

        <GetCounter />
        <IncrementCounter />
        <DecrementCounter />
        <SetCounter />

        <Notifications />
        <Transactions />
      </section>
    </>
  )
}

export default Home
