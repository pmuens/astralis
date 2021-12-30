import { Box, Heading, Paragraph } from '@modulz/design-system'
import { shortenAddress, useEtherBalance, useEthers, useGasPrice } from '@usedapp/core'

import { formatValue } from '../utils/main'
import useConnectionInfo from '../hooks/useConnectionInfo'

export default function Info() {
  const gasPrice = useGasPrice()
  const { account } = useEthers()
  const { chainName } = useConnectionInfo()
  const etherBalance = useEtherBalance(account)

  return (
    <Box>
      <Heading as="h2" size="2" css={{ mb: '$2' }}>
        Connection Information
      </Heading>
      {chainName && (
        <Paragraph>
          Connected to <u>{chainName}</u>
          {account && (
            <>
              {' '}
              with <u>{shortenAddress(account)}</u>
            </>
          )}
        </Paragraph>
      )}

      {gasPrice && (
        <Paragraph>
          Gas price is <u>{formatValue(gasPrice, 9)}</u> gwei
        </Paragraph>
      )}

      {account && etherBalance && (
        <Paragraph>
          Account has <u>{formatValue(etherBalance, 18)}</u> ETH
        </Paragraph>
      )}
    </Box>
  )
}
