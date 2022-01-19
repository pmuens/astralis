import { useWaitForTransaction } from 'wagmi'
import { useContext, useState, createContext, Dispatch, SetStateAction, useEffect } from 'react'

export function useSharedState(): SharedStateContext {
  return useContext(SharedStateContext)
}

export function SharedStateProvider(props: Props) {
  const { children } = props
  const [txHash, setTxHash] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<Notification>()

  const [{ data: txData }] = useWaitForTransaction({ hash: txHash })
  const confirmations = (txData && txData.confirmations) || 0

  useEffect(() => {
    if (txHash) {
      setIsLoading(true)
      if (confirmations > 0) {
        setIsLoading(false)
      }
    }
  }, [txHash, confirmations])

  function resetNotification(): void {
    setNotification(undefined)
  }

  return (
    <SharedStateContext.Provider
      value={{
        isLoading,
        notification,
        setTxHash,
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
  setTxHash: Dispatch<SetStateAction<string | undefined>>
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
