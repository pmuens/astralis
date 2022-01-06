import Link from 'next/link'
import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'

import Info from '../../components/Info'
import Transactions from '../../components/Transactions'
import Notifications from '../../components/Notifications'

const Index: NextPage = () => {
  return (
    <>
      <NextSeo title="App" description="Welcome to the dApp." />

      <nav>
        <ul>
          <li>
            <Link href="/app/counter">
              <a>Counter App</a>
            </Link>
          </li>
          <li>
            <Link href="/app/messages">
              <a>Messages App</a>
            </Link>
          </li>
        </ul>
      </nav>

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

export default Index
