import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Box, Flex, Separator } from '@modulz/design-system'

import Hero from '../components/Hero'
import Info from '../components/Info'
import Counter from '../components/Counter'
import Notifications from '../components/Notifications'
import Transactions from '../components/Transactions'
import ConnectionCheck from '../components/ConnectionCheck'

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="Home" description="Welcome to the Next.js Template for EVM-based dApps." />

      <Flex justify="center" css={{ ta: 'center', pt: '$3', '@bp2': { pt: '$6' } }}>
        <Hero />
      </Flex>

      <Flex justify="center" css={{ py: '$6', '@bp2': { py: '$8' } }}>
        <Separator size="1" />
      </Flex>

      <Flex justify="center">
        <ConnectionCheck />
      </Flex>

      <Flex as="section" justify="center">
        <Counter />
      </Flex>

      <Flex justify="center" css={{ py: '$6', '@bp2': { py: '$8' } }}>
        <Separator size="1" />
      </Flex>

      <Flex
        as="section"
        direction="column"
        align="center"
        css={{ '@bp2': { fd: 'row', ai: 'flex-start', jc: 'space-between' } }}
      >
        <Transactions />
        <Box css={{ my: '$4', '@bp2': { my: 0 } }} />
        <Info />
        <Box css={{ my: '$4', '@bp2': { my: 0 } }} />
        <Notifications />
      </Flex>
    </>
  )
}

export default Home
