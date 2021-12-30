import { Box, Flex, Paragraph, Separator } from '@modulz/design-system'

export default function Footer() {
  return (
    <Box as="footer" css={{ py: '$9' }}>
      <Flex align="center" direction="column">
        <Separator css={{ mb: '$6' }} size="2" />
        <Paragraph>Copyright {new Date().getFullYear()}, All Rights Reserved</Paragraph>
      </Flex>
    </Box>
  )
}
