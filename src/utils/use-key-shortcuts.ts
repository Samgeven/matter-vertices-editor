import { useCallback, useEffect } from 'react'
import { resetLineAction, setToolChain, setZoom } from '../model/events'
import { $toolChain } from '../model/store'
import { useStore } from 'effector-react'

export const useKeyShortcuts = () => {
  const selectedTool = useStore($toolChain)
  const spaceDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== ' ' || selectedTool[1] === 'hand') {
        return
      }

      setToolChain('hand')
    },
    [selectedTool]
  )

  const spaceUpHandler = useCallback((e: KeyboardEvent) => {
    if (e.key !== ' ') {
      return
    }
    setToolChain('line')
  }, [])

  const ctrlzHandler = useCallback((e: KeyboardEvent) => {
    if (!(e.ctrlKey && e.code === 'KeyZ')) {
      return
    }

    resetLineAction()
  }, [])

  const ctrlZeroHandler = useCallback((e: KeyboardEvent) => {
    if (!(e.ctrlKey && e.code === 'Digit0')) {
      return
    }

    setZoom(100)
  }, [])

  useEffect(() => {
    const keyDownHandlers = [spaceDownHandler, ctrlzHandler, ctrlZeroHandler]
    keyDownHandlers.forEach((el) => {
      document.addEventListener('keydown', el)
    })

    document.addEventListener('keyup', spaceUpHandler)
    return () => {
      keyDownHandlers.forEach((el) => {
        document.removeEventListener('keydown', el)
      })
      document.removeEventListener('keyup', spaceUpHandler)
    }
  }, [spaceDownHandler, spaceUpHandler, ctrlzHandler, ctrlZeroHandler])
}
