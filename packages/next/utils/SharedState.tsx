import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react'

export function useSharedState(): SharedStateContext {
  return useContext(SharedStateContext)
}

export function SharedStateProvider(props: Props) {
  const { children } = props
  const [notification, setNotification] = useState<Notification>()

  function resetNotification(): void {
    setNotification(undefined)
  }

  return (
    <SharedStateContext.Provider
      value={{
        notification,
        setNotification,
        resetNotification
      }}
    >
      {children}
    </SharedStateContext.Provider>
  )
}

const SharedStateContext = createContext<SharedStateContext>({} as SharedStateContext)

type SharedStateContext = {
  notification?: Notification
  setNotification: Dispatch<SetStateAction<Notification | undefined>>
  resetNotification: () => void
}

type Props = {
  children: JSX.Element
}

type Notification = {
  message: string
  type: 'info' | 'success' | 'error'
}
