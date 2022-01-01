export default function Hero(props: Props) {
  const { heading, lead } = props
  return (
    <>
      <h1>{heading}</h1>
      <p>{lead}</p>
    </>
  )
}

type Props = {
  heading: string
  lead: string
}
