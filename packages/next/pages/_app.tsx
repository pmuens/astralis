/* eslint-disable @typescript-eslint/no-non-null-assertion */

import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'
import { Config, DAppProvider } from '@usedapp/core'
import type { AppProps } from 'next/app'

import Head from '../components/Head'
import Layout from '../components/Layout'
import Notification from '../components/Notification'
import { SharedStateProvider } from '../utils/SharedState'
import ConnectionCheck from '../components/ConnectionCheck'

function App({ Component, pageProps }: AppProps) {
  const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!)
  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!

  const config: Config = {
    readOnlyChainId: CHAIN_ID,
    readOnlyUrls: { [CHAIN_ID]: RPC_URL }
  }

  return (
    <>
      <DefaultSeo
        title="Next.js Template for EVM-based dApps"
        description="The Next.js Template for EVM-based dApps."
        titleTemplate="%s - Next.js Template for EVM-based dApps"
      />
      <SharedStateProvider>
        <DAppProvider config={config}>
          <Head />
          <Layout>
            <Notification />
            <ConnectionCheck />
            <Component {...pageProps} />
          </Layout>
        </DAppProvider>
      </SharedStateProvider>
    </>
  )
}

export default App
