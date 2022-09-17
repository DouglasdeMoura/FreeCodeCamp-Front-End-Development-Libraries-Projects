import { useState } from 'react'

import { Button } from '../../components/button'

const BREAK_LENGTH = 5 // minutes
const SESSION_LENGTH = 25 // minutes

export const TwentyFivePlusFiveClock: React.FC = () => {
  const [breakLength, setBreakLength] = useState(BREAK_LENGTH)
  const [sessionLength, setSessionLength] = useState(SESSION_LENGTH)

  return (
    <div>
      <Button id="start_stop" data-testid="play-pause">
        Play/Pause
      </Button>

      <Button
        id="reset"
        onClick={() => {
          if (breakLength !== BREAK_LENGTH) {
            setBreakLength(BREAK_LENGTH)
          }

          if (sessionLength !== SESSION_LENGTH) {
            setBreakLength(SESSION_LENGTH)
          }
        }}
      >
        Reset
      </Button>

      <h2 id="break-label">Break Length</h2>
      <p id="break-length" data-testid="break-length">
        {breakLength}
      </p>
      <Button
        id="break-decrement"
        data-testid="break-decrement"
        onClick={() => {
          setBreakLength(breakLength - 1)
        }}
      >
        Decrease
      </Button>
      <Button id="break-increment" data-testid="break-increment">
        Increase
      </Button>

      <h2 id="session-label">Session Length</h2>
      <p id="session-length">{sessionLength}</p>
      <Button id="session-decrement" data-testid="session-decrement">
        Decrease
      </Button>
      <Button id="session-increment" data-testid="session-increment">
        Increase
      </Button>

      <p id="timer-label">Session</p>
      <p id="time-left">{sessionLength}:00</p>
    </div>
  )
}