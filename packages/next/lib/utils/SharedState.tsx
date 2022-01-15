import { useTransactions } from '@usedapp/core'
import { useContext, useState, createContext, Dispatch, SetStateAction, useEffect } from 'react'

export function useSharedState(): SharedStateContext {
  return useContext(SharedStateContext)
}

export function SharedStateProvider(props: Props) {
  const { children } = props
  const { transactions } = useTransactions()
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<Notification>()

  useEffect(() => {
    if (transactions) {
      const pending = transactions.some((item) => !item.receipt || !item.receipt.confirmations)
      if (pending) {
        setIsLoading(true)
      } else {
        setIsLoading(false)
      }
    }
  }, [transactions])

  function resetNotification(): void {
    setNotification(undefined)
  }

  return (
    <SharedStateContext.Provider
      value={{
        isLoading,
        notification,
        setIsLoading,
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
  isLoading: boolean
  notification?: Notification
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setNotification: Dispatch<SetStateAction<Notification | undefined>>
  resetNotification: () => void
}

type Props = {
  children: JSX.Element[]
}

type Notification = {
  message: string
  type: 'info' | 'success' | 'error'
}
