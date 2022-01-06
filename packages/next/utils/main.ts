/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Interface } from '@ethersproject/abi'
import { formatUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'

// Adaption of https://ethereum.stackexchange.com/a/97885
export function roundValue(value: BigNumber, digits: number): BigNumber {
  return value.sub(value.mod(Math.pow(10, digits - 4)))
}

export function formatValue(value: BigNumber, digits: number): string {
  return formatUnits(roundValue(value, digits), digits)
}

export function getContractInfo(name: ContractName): ContractInfo {
  let address = process.env.NEXT_PUBLIC_COUNTER_CONTRACT_ADDRESS!
  let abi = new Interface(JSON.parse(process.env.NEXT_PUBLIC_COUNTER_CONTRACT_ABI!))
  if (name === 'Messages') {
    address = process.env.NEXT_PUBLIC_MESSAGES_CONTRACT_ADDRESS!
    abi = new Interface(JSON.parse(process.env.NEXT_PUBLIC_MESSAGES_CONTRACT_ABI!))
  }
  const contract = new Contract(address, abi)
  return {
    address,
    abi,
    contract
  }
}

type ContractName = 'Counter' | 'Messages'

type ContractInfo = {
  address: string
  abi: Interface
  contract: Contract
}
