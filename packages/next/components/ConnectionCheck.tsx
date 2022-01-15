import useConnectionInfo from '../lib/hooks/useConnectionInfo'

export default function ConnectionCheck() {
  const { isCorrectConnection, readChainName, writeChainName } = useConnectionInfo()
  return (
    <>
      {!isCorrectConnection && (
        <p>
          You are connected to <u>{writeChainName}</u> rather than <u>{readChainName}</u>
        </p>
      )}
    </>
  )
}
