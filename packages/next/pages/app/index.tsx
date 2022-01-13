import Link from 'next/link'
import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'

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
    </>
  )
}

export default Index
