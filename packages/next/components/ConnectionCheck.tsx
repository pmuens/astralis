import useConnectionInfo from '../lib/hooks/useConnectionInfo'

export default function ConnectionCheck() {
  const { isConnected, isCorrectConnection, readChainName, writeChainName } = useConnectionInfo()

  return (
    <>
      {isConnected && !isCorrectConnection && (
        <p>
          You are connected to <u>{writeChainName}</u> rather than <u>{readChainName}</u>
        </p>
      )}
    </>
  )
}
