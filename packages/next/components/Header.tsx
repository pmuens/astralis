import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useEthers, shortenAddress, useGasPrice } from '@usedapp/core'

import Logo from './Logo'
import Loading from './Loading'
import { formatValue } from '../utils/main'
import { useSharedState } from '../utils/SharedState'

export default function Header() {
  const router = useRouter()
  const gasPrice = useGasPrice()
  const { setNotification } = useSharedState()
  const { account, error, activateBrowserWallet, deactivate } = useEthers()

  useEffect(() => {
    if (error) {
      const { message } = error
      setNotification({ message, type: 'error' })
    }
  }, [error, setNotification])

  return (
    <header>
      <Link href="/" passHref>
        <a>
          <span
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              border: 0
            }}
          >
            Next.js Template
          </span>
          <Logo />
        </a>
      </Link>
      <nav>
        {router.pathname.includes('app') ? (
          <>
            {account ? (
              <>
                <Loading />
                <span>{shortenAddress(account)}</span>
                <button onClick={() => deactivate()}>Disconnect</button>
              </>
            ) : (
              <button onClick={() => activateBrowserWallet()}>Connect Wallet</button>
            )}
            {gasPrice && <span>{formatValue(gasPrice, 9)} gwei</span>}
            <Link href="/app">App</Link>
            <Link href="/app/counter">
              <a>Counter</a>
            </Link>
            <Link href="/app/messages">
              <a>Messages</a>
            </Link>
          </>
        ) : (
          <Link href="/app">
            <a>Enter App</a>
          </Link>
        )}
      </nav>
    </header>
  )
}
