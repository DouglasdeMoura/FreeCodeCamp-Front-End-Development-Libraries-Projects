import { useRef, useState } from 'react'

import { Button } from '../../components/button'
import { useInterval } from './twenty-five-plus-five-clock.hooks'

import accurateInterval from 'accurate-interval'
import { addSeconds, addMinutes, intervalToDuration } from 'date-fns'

const BREAK_LENGTH = 5 // minutes
const SESSION_LENGTH = 25 // minutes
const TOP_LIMIT = 60
const BOTTOM_LIMIT = 1

export const TwentyFivePlusFiveClock: React.FC = () => {
  const [breakLength, setBreakLength] = useState(BREAK_LENGTH)
  const [sessionLength, setSessionLength] = useState(SESSION_LENGTH)
  const [time, setTime] = useState<Date>()
  const [start, setStart] = useState<Date>()
  const [isRunning, setIsRunning] = useState(false)
  const [state, setState] = useState<'Session' | 'Break'>('Session')
  const audioRef = useRef<HTMLAudioElement>(null)

  const now = new Date()

  const end = start
    ? addMinutes(start, state === 'Session' ? sessionLength : breakLength)
    : addMinutes(now, state === 'Session' ? sessionLength : breakLength)

  const timeLeft =
    time && end
      ? intervalToDuration({ start: time, end })
      : intervalToDuration({ start: now, end })

  if (
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    accurateInterval(
      () => {
        audioRef?.current?.play()
        setState(state === 'Break' ? 'Session' : 'Break')
        setStart(now)
        setTime(now)
      },
      1000,
      { aligned: true, immediate: false },
    )
  }

  const getFormattedTimeLeft = () => {
    const minutes =
      timeLeft?.hours === 1
        ? 60
        : timeLeft?.minutes?.toString().padStart(2, '0')
    const seconds = timeLeft?.seconds?.toString().padStart(2, '0')

    return `${minutes}:${seconds}`
  }

  const handleReset = () => {
    if (breakLength !== BREAK_LENGTH) {
      setBreakLength(BREAK_LENGTH)
    }

    if (sessionLength !== SESSION_LENGTH) {
      setSessionLength(SESSION_LENGTH)
    }

    setStart(undefined)
    setTime(undefined)
    setIsRunning(false)
    setState('Session')

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const handleBreakDecrement = () => {
    if (breakLength > BOTTOM_LIMIT) {
      setBreakLength(breakLength - 1)
    }
  }

  const handleBreakIncrement = () => {
    if (breakLength < TOP_LIMIT) {
      setBreakLength(breakLength + 1)
    }
  }

  const handleSessionDecrement = () => {
    if (sessionLength > BOTTOM_LIMIT) {
      setSessionLength(sessionLength - 1)
    }
  }

  const handleSessionIncrement = () => {
    if (sessionLength < TOP_LIMIT) {
      setSessionLength(sessionLength + 1)
    }
  }

  const handleStartStop = () => {
    setIsRunning(!isRunning)

    if (!start) {
      const now = new Date()

      setStart(now)
      setTime(now)
    }
  }

  useInterval(
    () => {
      setTime((time) => {
        const newTime = time ? addSeconds(time, 1) : addSeconds(start!, 1)

        return newTime
      })
    },
    isRunning ? 1000 : null,
  )

  return (
    <div>
      <Button
        id="start_stop"
        data-testid="play-pause"
        onClick={handleStartStop}
      >
        Play/Pause
      </Button>

      <Button id="reset" onClick={handleReset}>
        Reset
      </Button>

      <h2 id="break-label">Break Length</h2>
      <p id="break-length" data-testid="break-length">
        {breakLength}
      </p>
      <Button
        id="break-decrement"
        data-testid="break-decrement"
        onClick={handleBreakDecrement}
      >
        Decrease
      </Button>
      <Button
        id="break-increment"
        data-testid="break-increment"
        onClick={handleBreakIncrement}
      >
        Increase
      </Button>

      <h2 id="session-label">Session Length</h2>
      <p id="session-length" data-testid="session-length">
        {sessionLength}
      </p>
      <Button
        id="session-decrement"
        data-testid="session-decrement"
        onClick={handleSessionDecrement}
      >
        Decrease
      </Button>
      <Button
        id="session-increment"
        data-testid="session-increment"
        onClick={handleSessionIncrement}
      >
        Increase
      </Button>

      <p id="timer-label">{state}</p>
      <p id="time-left" data-testid="time-left">
        {getFormattedTimeLeft()}
      </p>

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        id="beep"
        preload="auto"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  )
}
