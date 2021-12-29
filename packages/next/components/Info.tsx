import { getChainName, useEtherBalance, useEthers, useGasPrice } from '@usedapp/core'

import { formatValue } from '../utils/main'

export default function Info() {
  const { chainId, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  const gasPrice = useGasPrice()

  return (
    <section>
      <h2>Connection Information</h2>
      {chainId && <p>Chain: {getChainName(chainId)}</p>}
      {chainId && <p>Chain ID: {chainId}</p>}
      {gasPrice && <p>Gas Price: {formatValue(gasPrice, 9)} gwei</p>}
      {etherBalance && <p>ETH Balance: {formatValue(etherBalance, 18)}</p>}
    </section>
  )
}
