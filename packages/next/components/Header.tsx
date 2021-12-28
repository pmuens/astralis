import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div>
        <Link href="/">
          <a>
            <span>Next.js Template for EVM-based dApps</span>
          </a>
        </Link>
        <nav>
          <Link href="/first-link">
            <a>First Link</a>
          </Link>
          <Link href="/second-link">
            <a>Second Link</a>
          </Link>
          <Link href="/third-link">
            <a>Third Link</a>
          </Link>
        </nav>
      </div>
    </header>
  )
}
