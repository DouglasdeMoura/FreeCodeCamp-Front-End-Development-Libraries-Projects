import { useEffect, useRef } from 'react'
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
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
