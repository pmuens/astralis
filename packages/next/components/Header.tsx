import Link from 'next/link'
import { useEffect } from 'react'
import { useEthers, shortenAddress } from '@usedapp/core'

import Logo from './Logo'
import { useSharedState } from '../utils/SharedState'

export default function Header() {
  const { setErrorMessage } = useSharedState()
  const { account, error, activateBrowserWallet, deactivate } = useEthers()

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message)
    }
  }, [error, setErrorMessage])

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
        {account ? (
          <>
            <span>{shortenAddress(account)}</span>
            <button onClick={() => deactivate()}>Disconnect</button>
          </>
        ) : (
          <button onClick={() => activateBrowserWallet()}>Connect Wallet</button>
        )}
      </nav>
    </header>
  )
}
