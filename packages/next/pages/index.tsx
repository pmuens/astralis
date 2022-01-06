import Link from 'next/link'
import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'

import Hero from '../components/Hero'

const Index: NextPage = () => {
  return (
    <>
      <NextSeo title="Home" description="Welcome to the Next.js Template for EVM-based dApps." />

      <Hero
        heading="Next.js Template for EVM-based dApps"
        lead="Welcome to the Next.js Template for EVM-based dApps."
      />

      <hr />

      <Link href="/app">
        <a>Enter App</a>
      </Link>
    </>
  )
}

export default Index
