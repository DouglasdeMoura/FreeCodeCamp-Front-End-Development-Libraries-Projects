import { useEffect, useRef, useState } from 'react'

import accurateInterval from 'accurate-interval'

/**
 * Declare a function to be executed based on a
 * time interval. Based on Dan Abramov's post
 * {@link https://overreacted.io/making-setinterval-declarative-with-react-hooks/ Making setInterval Declarative with React Hooks}
 *
 * @param callback The callback that should be executed
 * @param delay The interval to execute the callback (in miliseconds)
 */

export function useInterval(callback: () => void, delay: null | number) {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }

    if (delay !== null) {
      const interval = accurateInterval(tick, delay, {
        aligned: false,
        immediate: false,
      })
      return () => interval.clear()
    }
  }, [delay])
}

type UseCounter = [number, () => void, () => void, () => void]

export function useCounter(
  initial: number,
  topLimit?: number,
  bottomLimit?: number,
): UseCounter {
  const [counter, setCounter] = useState(initial)
  const increase = () => {
    if (!topLimit || counter < topLimit) {
      setCounter(counter + 1)
    }
  }

  const decrease = () => {
    if (!bottomLimit || counter > bottomLimit) {
      setCounter(counter - 1)
    }
  }

  const reset = () => {
    setCounter(initial)
  }

  return [counter, increase, decrease, reset]
}
