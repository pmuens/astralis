/* eslint-disable @typescript-eslint/no-non-null-assertion */

import '../styles/globals.css'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Config, DAppProvider } from '@usedapp/core'
import { DesignSystemProvider, darkTheme, globalCss } from '@modulz/design-system'

import Head from '../components/Head'
import Alert from '../components/Alert'
import Layout from '../components/Layout'
import { SharedStateProvider } from '../utils/SharedState'

const globalStyles = globalCss({
  body: {
    backgroundColor: '$loContrast'
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

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
        <DesignSystemProvider>
          <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            value={{ light: 'light-theme', dark: darkTheme.className }}
            defaultTheme="system"
          >
            <DAppProvider config={config}>
              <Alert />
              <Head />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </DAppProvider>
          </ThemeProvider>
        </DesignSystemProvider>
      </SharedStateProvider>
    </>
  )
}

export default MyApp
