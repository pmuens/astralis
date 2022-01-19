import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAccount, useConnect } from 'wagmi'

import Logo from './Logo'
import Loading from './Loading'
import { shortenAddress } from '../lib/utils/main'
import useErrorHandling from '../lib/hooks/useErrorHandling'
import useLoadingHandling from '../lib/hooks/useLoadingHandling'

export default function Header() {
  const router = useRouter()
  const [connectResult, connect] = useConnect()
  const [accountResult, disconnect] = useAccount()

  const { data: connectData, error: connectError, loading: connectLoading } = connectResult
  const { data: accountData, error: accountError, loading: accountLoading } = accountResult

  useErrorHandling([connectError, accountError])
  useLoadingHandling([connectLoading, accountLoading])

  const address = accountData?.address
  const { connectors } = connectData
  const injected = connectors[0]

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
            {address ? (
              <>
                <Loading />
                <span>{shortenAddress(address)}</span>
                <button onClick={() => disconnect()}>Disconnect</button>
              </>
            ) : (
              <button onClick={() => connect(injected)}>Connect Wallet</button>
            )}
            <Link href="/app">App</Link>
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
