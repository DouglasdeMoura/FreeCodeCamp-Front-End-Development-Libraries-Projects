import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import accurateInterval from 'accurate-interval'
import { addMinutes, intervalToDuration } from 'date-fns'

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

type UseBoolean = {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

export function useBoolean(defaultValue?: boolean): UseBoolean {
  const [value, setValue] = useState(!!defaultValue)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((x) => !x), [])

  return { value, setValue, setTrue, setFalse, toggle }
}

type UseTimeArgs = {
  start?: Date
  time?: Date
  sessionLength: number
  breakLength: number
  state: 'Session' | 'Break'
  onZero?: () => void
}

export function useTimeLeft({
  breakLength,
  sessionLength,
  start,
  time,
  state,
  onZero,
}: UseTimeArgs) {
  if (!start || !time) {
    return `${sessionLength}:00`
  }

  const now = new Date()
  const end = start
    ? addMinutes(start, state === 'Session' ? sessionLength : breakLength)
    : addMinutes(now, state === 'Session' ? sessionLength : breakLength)

  const timeLeft =
    time && end
      ? intervalToDuration({ start: time, end })
      : intervalToDuration({ start: now, end })

  const getFormattedTimeLeft = () => {
    const minutes =
      timeLeft?.hours === 1
        ? 60
        : timeLeft?.minutes?.toString().padStart(2, '0')
    const seconds = timeLeft?.seconds?.toString().padStart(2, '0')

    return `${minutes}:${seconds}`
  }

  if (
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    accurateInterval(() => onZero?.(), 1000, {
      aligned: false,
      immediate: false,
    })
  }

  return getFormattedTimeLeft()
}
