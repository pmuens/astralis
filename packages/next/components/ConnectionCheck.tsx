import { Alert, Paragraph } from '@modulz/design-system'

import useConnectionInfo from '../hooks/useConnectionInfo'

export default function ConnectionCheck() {
  const { isCorrectConnection, readChainName, writeChainName } = useConnectionInfo()
  return (
    <>
      {!isCorrectConnection && (
        <Alert variant="red" css={{ mb: '$4' }}>
          <Paragraph variant="red" css={{ fontSize: '$2' }}>
            You are connected to <u>{writeChainName}</u> while you should be connected to <u>{readChainName}</u>
          </Paragraph>
        </Alert>
      )}
    </>
  )
}
