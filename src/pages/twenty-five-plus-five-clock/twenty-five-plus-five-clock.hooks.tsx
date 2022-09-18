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

function useCounter(
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

export function useTimersLength(
  breakLength: number,
  sessionLength: number,
  topLimit: number,
  bottomLimit: number,
) {
  const [breakLen, increaseBreakLen, decreaseBreakLen, resetBreakLen] =
    useCounter(breakLength, topLimit, bottomLimit)

  const [sessionLen, increaseSessionLen, decreaseSessionLen, resetSessionLen] =
    useCounter(sessionLength, topLimit, bottomLimit)

  return {
    breakLength: {
      counter: breakLen,
      increase: increaseBreakLen,
      decrease: decreaseBreakLen,
      reset: resetBreakLen,
    },
    sessionLength: {
      counter: sessionLen,
      increase: increaseSessionLen,
      decrease: decreaseSessionLen,
      reset: resetSessionLen,
    },
  }
}
