import Link from 'next/link'
import { useContractRead } from 'wagmi'
import { formatUnits } from '@ethersproject/units'
import { BigNumberish } from '@ethersproject/bignumber'

import { getContractInfo } from '../../lib/utils/main'
import useMulticall from '../../lib/hooks/useMulticall'
import { useSharedState } from '../../lib/utils/SharedState'
import useErrorHandling from '../../lib/hooks/useErrorHandling'
import useLoadingHandling from '../../lib/hooks/useLoadingHandling'

export default function Messages() {
  const { isLoading } = useSharedState()
  const { address, abi } = getContractInfo('Messages')

  const config = { addressOrName: address, contractInterface: abi }
  const [readResult] = useContractRead(config, 'nextId')

  const { data: readData, error: readError, loading: readLoading } = readResult

  const messagesCalls = []
  const nextId = readData as BigNumberish
  for (let i = 0; nextId && i < nextId; i++) {
    messagesCalls.push({ address, interface: abi, function: 'messages', args: [i] })
  }

  const [multicallResult] = useMulticall(messagesCalls)

  const { data: multicallData, error: multicallError, loading: multicallLoading } = multicallResult

  useErrorHandling([readError, multicallError])
  useLoadingHandling([readLoading, multicallLoading])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages = multicallData as [any[]]
  const items = messages?.reduce((accum, message) => {
    if (message?.length) {
      const [id, body, owner, createdAt, updatedAt, isEntity] = message
      if (isEntity) {
        accum?.push(
          <tr key={id}>
            <td>{formatUnits(id, 0)}</td>
            <td>{body}</td>
            <td>{owner}</td>
            <td>{formatUnits(createdAt, 0)}</td>
            <td>{formatUnits(updatedAt, 0)}</td>
            <td>{isEntity ? 'true' : 'false'}</td>
            <td>
              <Link href={`/app/messages/${encodeURIComponent(id)}`}>
                <a>Details</a>
              </Link>
            </td>
            <td>
              <Link href={`/app/messages/edit/${encodeURIComponent(id)}`}>
                <a>Edit</a>
              </Link>
            </td>
          </tr>
        )
      }
    }
    return accum
  }, [])

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : items?.length ? (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>body</th>
              <th>owner</th>
              <th>createdAt</th>
              <th>updatedAt</th>
              <th>isEntity</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      ) : (
        <p>No messages to display</p>
      )}
      <Link href="/app/messages/new">
        <a>Create message</a>
      </Link>
    </>
  )
}
