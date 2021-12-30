import { useState } from 'react'
import { useContractCall } from '@usedapp/core'
import { formatUnits } from '@ethersproject/units'
import { Box, Flex, Heading, ProgressBar, Skeleton } from '@modulz/design-system'

import Set from './Set'
import Increment from './Increment'
import Decrement from './Decrement'
import { getContractInfo } from '../utils/main'
import useConnectionInfo from '../hooks/useConnectionInfo'

export default function Counter() {
  const { address, abi } = getContractInfo()
  const [isLoading, setIsLoading] = useState(false)
  const { isConnected, isCorrectConnection } = useConnectionInfo()
  const [counter] = useContractCall({ address, abi, method: 'get', args: [] }) ?? []

  return (
    <Flex css={{ fd: 'column', ai: 'center' }}>
      <Heading as="h2" size="4">
        {counter ? formatUnits(counter, 0) : <Skeleton css={{ width: '$9', height: '$9' }} />}
      </Heading>
      {isConnected && isCorrectConnection && (
        <>
          <Flex css={{ mt: '$4' }}>
            <Box css={{ px: '$2' }}>
              <Increment isLoading={isLoading} setIsLoading={setIsLoading} />
            </Box>
            <Box css={{ px: '$2' }}>
              <Decrement isLoading={isLoading} setIsLoading={setIsLoading} />
            </Box>
          </Flex>
          <Box css={{ mt: '$4' }}>
            <Set isLoading={isLoading} setIsLoading={setIsLoading} />
          </Box>
          {isLoading && (
            <ProgressBar
              data-state="indeterminate"
              data-max="100"
              css={{ minWidth: '200px', height: '$1', mt: '$6' }}
            />
          )}
        </>
      )}
    </Flex>
  )
}
