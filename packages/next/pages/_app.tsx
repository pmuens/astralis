/* eslint-disable @typescript-eslint/no-non-null-assertion */

import '../styles/globals.css'
import { providers } from 'ethers'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { Provider as WagmiProvider } from 'wagmi'

import Head from '../components/Head'
import Layout from '../components/Layout'
import Notifications from '../components/Notifications'
import ConnectionCheck from '../components/ConnectionCheck'
import { SharedStateProvider } from '../lib/utils/SharedState'

function App({ Component, pageProps }: AppProps) {
  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!
  const provider = () => new providers.JsonRpcProvider(RPC_URL)

  return (
    <>
      <DefaultSeo
        title="Next.js Template for EVM-based dApps"
        description="The Next.js Template for EVM-based dApps."
        titleTemplate="%s - Next.js Template for EVM-based dApps"
      />
      <WagmiProvider provider={provider}>
        <SharedStateProvider>
          <Head />
          <Layout>
            <Notifications />
            <ConnectionCheck />
            <Component {...pageProps} />
          </Layout>
        </SharedStateProvider>
      </WagmiProvider>
    </>
  )
}

export default App
