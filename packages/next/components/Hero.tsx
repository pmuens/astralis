import { Box, Heading, Paragraph } from '@modulz/design-system'

export default function Hero() {
  return (
    <Box>
      <Heading
        size="4"
        css={{
          mb: '$3'
        }}
      >
        Next.js Template for EVM-based dApps
      </Heading>
      <Paragraph size="2">Welcome to the Next.js Template for EVM-based dApps.</Paragraph>
    </Box>
  )
}
