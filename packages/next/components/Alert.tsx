import { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  Button,
  Flex,
  Heading,
  Paragraph
} from '@modulz/design-system'

import { useSharedState } from '../utils/SharedState'

export default function Alert() {
  const { errorMessage, resetErrorMessage } = useSharedState()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (errorMessage) {
      setIsOpen(true)
    }
  }, [errorMessage])

  function handleOnOpenChange(open: boolean) {
    setIsOpen(open)
    resetErrorMessage()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle asChild>
          <Heading as="h6" css={{ fontWeight: 500, mb: '$3' }}>
            An Error Occurred
          </Heading>
        </AlertDialogTitle>
        <AlertDialogDescription asChild>
          <Paragraph>{errorMessage}</Paragraph>
        </AlertDialogDescription>
        <Flex justify="end" css={{ mt: '$3' }}>
          <AlertDialogAction asChild>
            <Button css={{ cursor: 'pointer' }}>Close</Button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialog>
  )
}
