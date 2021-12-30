import { useContractFunction } from '@usedapp/core'
import { useState, useEffect, MouseEvent, Dispatch, SetStateAction, FormEvent, ChangeEvent } from 'react'
import { Button, Dialog, DialogContent, Flex, Heading, Paragraph, TextField } from '@modulz/design-system'

import { getContractInfo } from '../utils/main'
import { useSharedState } from '../utils/SharedState'

export default function Set(props: Props) {
  const { contract } = getContractInfo()
  const { isLoading, setIsLoading } = props
  const [counter, setCounter] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const { setErrorMessage } = useSharedState()
  const { state, send } = useContractFunction(contract, 'set')

  function resetState() {
    setIsOpen(false)
    setCounter(0)
  }

  function handleOpen(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setIsOpen(true)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    const { value } = event.currentTarget
    if (Number.isInteger(parseInt(value))) {
      setCounter(parseInt(value))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(counter)
    send(counter)
    resetState()
  }

  function handleCancel(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    resetState()
  }

  function handleOnOpenChange(open: boolean) {
    setIsOpen(open)
    resetState()
  }

  useEffect(() => {
    if (state.status == 'Mining') setIsLoading(true)
    if (state.status != 'Mining') setIsLoading(false)
    if (state.status == 'Fail' || state.status == 'Exception') {
      setErrorMessage(state.errorMessage)
      console.error(state.errorMessage)
    }
  }, [state, setIsLoading, setErrorMessage])

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
        <DialogContent>
          <Heading as="h6" css={{ fontWeight: 500, mb: '$3' }}>
            Set Counter Value
          </Heading>
          <Paragraph>Set the counter to a number.</Paragraph>
          <form onSubmit={handleSubmit}>
            <TextField type="number" value={counter} onChange={handleChange} css={{ mt: '$3' }} />
            <Flex justify="end" css={{ gap: '$3', mt: '$3' }}>
              <Button ghost onClick={handleCancel} css={{ '&:hover': { cursor: 'pointer' } }}>
                Cancel
              </Button>
              <Button type="submit" css={{ '&:hover': { cursor: 'pointer' } }}>
                Save
              </Button>
            </Flex>
          </form>
        </DialogContent>
      </Dialog>
      <Button onClick={handleOpen} disabled={isLoading} size="3" css={{ '&:hover': { cursor: 'pointer' } }}>
        Set
      </Button>
    </>
  )
}

type Props = {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}
