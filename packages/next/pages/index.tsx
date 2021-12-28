import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Home" description="Welcome to the Next.js Template for EVM-based dApps." />
      <section>
        <h1>Next.js Template for EVM-based dApps</h1>
        <p>Welcome to the Next.js Template for EVM-based dApps.</p>
      </section>
    </>
  )
}

export default Home
