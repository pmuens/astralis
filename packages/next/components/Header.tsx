import Link from 'next/link'
import { useEffect } from 'react'
import { useEthers, shortenAddress } from '@usedapp/core'

export default function Header() {
  const { account, error, activateBrowserWallet, deactivate } = useEthers()

  useEffect(() => {
    if (error) {
      alert('An Error occurred. Check the Browser logs for more info.')
      console.error(error)
    }
  }, [error])

  return (
    <header>
      <div>
        <Link href="/">
          <a>
            <span>Next.js Template for EVM-based dApps</span>
          </a>
        </Link>
        <nav>
          {account ? (
            <>
              <span>{shortenAddress(account)}</span>
              <button onClick={() => deactivate()}>Disconnect</button>
            </>
          ) : (
            <button onClick={() => activateBrowserWallet()}>Connect</button>
          )}
        </nav>
      </div>
    </header>
  )
}
