import Header from './Header'
import Main from './Main'
import Footer from './Footer'

export default function Layout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}
