import { Container } from '@modulz/design-system'

export default function Main({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Container as="main" size={{ '@initial': '2', '@bp1': '3' }}>
      {children}
    </Container>
  )
}
