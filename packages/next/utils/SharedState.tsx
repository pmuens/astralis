import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react'

export function useSharedState(): SharedStateContext {
  return useContext(SharedStateContext)
}

export function SharedStateProvider(props: Props) {
  const { children } = props
  const [errorMessage, setErrorMessage] = useState<string>()

  function resetErrorMessage(): void {
    setErrorMessage(undefined)
  }

  return (
    <SharedStateContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        resetErrorMessage
      }}
    >
      {children}
    </SharedStateContext.Provider>
  )
}

const SharedStateContext = createContext<SharedStateContext>({} as SharedStateContext)

type SharedStateContext = {
  errorMessage?: string
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>
  resetErrorMessage: () => void
}

type Props = {
  children: JSX.Element
}
