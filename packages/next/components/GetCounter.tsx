import { useContractCall } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'

import { getContractInfo } from '../utils/main'

export default function GetCounter() {
  const { address, abi } = getContractInfo()
  const [counter] = useContractCall({ address, abi, method: 'get', args: [] }) ?? []

  let result = <p>Loading... (check the Browser logs if it takes too long)</p>
  if (counter) {
    result = <p>Counter: {formatUnits(counter, 0)}</p>
  }

  return result
}
