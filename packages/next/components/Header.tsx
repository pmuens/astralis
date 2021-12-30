import NextLink from 'next/link'
import { useEffect } from 'react'
import { useEthers, shortenAddress } from '@usedapp/core'
import { Box, Button, Flex, Status, Text } from '@modulz/design-system'

import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import { useSharedState } from '../utils/SharedState'

export default function Header() {
  const { setErrorMessage } = useSharedState()
  const { account, error, activateBrowserWallet, deactivate } = useEthers()

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message)
      console.error(error)
    }
  }, [error, setErrorMessage])

  return (
    <Flex as="header" css={{ py: '$4', px: '$4', jc: 'space-between', position: 'relative', zIndex: 1 }}>
      <NextLink href="/" passHref>
        <Box as="a" css={{ color: '$hiContrast', display: 'inline-flex', '&:focus': { boxShadow: 'none' } }}>
          <Text
            as="span"
            css={{
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
            Template
          </Text>
          <Logo />
        </Box>
      </NextLink>
      <Flex as="nav" css={{ ai: 'center' }}>
        {account ? (
          <>
            <Status variant="green" css={{ mr: '$2' }} />
            <Text as="span" css={{ mr: '$2' }}>
              {shortenAddress(account)}
            </Text>
            <Button onClick={() => deactivate()} css={{ mr: '$5', '&:hover': { cursor: 'pointer' } }}>
              Disconnect
            </Button>
          </>
        ) : (
          <>
            <Status variant="red" css={{ mr: '$2' }} />
            <Button onClick={() => activateBrowserWallet()} css={{ mr: '$5', '&:hover': { cursor: 'pointer' } }}>
              Connect Wallet
            </Button>
          </>
        )}
        <ThemeToggle />
      </Flex>
    </Flex>
  )
}
