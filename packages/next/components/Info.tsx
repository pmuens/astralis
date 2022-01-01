import { shortenAddress, useEtherBalance, useEthers, useGasPrice } from '@usedapp/core'

import { formatValue } from '../utils/main'
import useConnectionInfo from '../hooks/useConnectionInfo'

export default function Info() {
  const gasPrice = useGasPrice()
  const { account } = useEthers()
  const { chainName } = useConnectionInfo()
  const etherBalance = useEtherBalance(account)

  return (
    <>
      {chainName && (
        <p>
          Connected to <u>{chainName}</u>
          {account && (
            <>
              {' '}
              with <u>{shortenAddress(account)}</u>
            </>
          )}
        </p>
      )}

      {gasPrice && (
        <p>
          Gas price is <u>{formatValue(gasPrice, 9)}</u> gwei
        </p>
      )}

      {account && etherBalance && (
        <p>
          Account has <u>{formatValue(etherBalance, 18)}</u> ETH
        </p>
      )}
    </>
  )
}
