import Link from 'next/link'
import { formatUnits } from '@ethersproject/units'
import { useContractCall, useContractCalls } from '@usedapp/core'

import { getContractInfo } from '../../utils/main'

export default function Messages() {
  const { address, abi } = getContractInfo('Messages')
  const [nextId] = useContractCall({ address, abi, method: 'nextId', args: [] }) ?? []

  const messagesCalls = []
  for (let i = 0; nextId && i < nextId; i++) {
    messagesCalls.push({ address, abi, method: 'messages', args: [i] })
  }

  const messages = useContractCalls(messagesCalls) ?? []

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
      {items?.length ? (
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
