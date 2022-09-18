import { useRef, useState } from 'react'

import { Button } from '../../components/button'
import {
  useBoolean,
  useInterval,
  useTimeLeft,
  useTimersLength,
} from './twenty-five-plus-five-clock.hooks'

import { addSeconds } from 'date-fns'

const BREAK_LENGTH = 5 // minutes
const SESSION_LENGTH = 25 // minutes
const TOP_LIMIT = 60
const BOTTOM_LIMIT = 1

export const TwentyFivePlusFiveClock: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const { breakLength, sessionLength } = useTimersLength(
    BREAK_LENGTH,
    SESSION_LENGTH,
    TOP_LIMIT,
    BOTTOM_LIMIT,
  )
  const { value: isRunning, toggle: toggleRunning } = useBoolean()

  const [state, setState] = useState<'Session' | 'Break'>('Session')
  const [time, setTime] = useState<Date>()
  const [start, setStart] = useState<Date>()

  const timeLeft = useTimeLeft({
    breakLength: breakLength.counter,
    sessionLength: sessionLength.counter,
    start,
    state,
    time,
    onZero: () => {
      const now = new Date()
      audioRef?.current?.play()
      setState(state === 'Break' ? 'Session' : 'Break')
      setStart(now)
      setTime(now)
    },
  })

  useInterval(
    () => {
      setTime((time) => {
        const newTime = time ? addSeconds(time, 1) : addSeconds(start!, 1)

        return newTime
      })
    },
    isRunning ? 1000 : null,
  )

  const resetTime = () => {
    const now = new Date()
    setStart(now)
    setTime(now)
    setState('Session')
  }

  const handleStartStop = () => {
    toggleRunning()

    if (!start) {
      resetTime()
    }
  }

  return (
    <div>
      <Button
        id="start_stop"
        data-testid="play-pause"
        onClick={handleStartStop}
      >
        Play/Pause
      </Button>

      <Button
        id="reset"
        onClick={() => {
          breakLength.reset()
          sessionLength.reset()
          toggleRunning()
          resetTime()
          if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
          }
        }}
      >
        Reset
      </Button>

      <TimerLengthControl
        length={breakLength.counter}
        title="Break Length"
        id="break"
        onDecreaseClick={breakLength.decrease}
        onIncreaseClick={breakLength.increase}
      />

      <TimerLengthControl
        length={sessionLength.counter}
        title="Session Length"
        id="session"
        onDecreaseClick={sessionLength.decrease}
        onIncreaseClick={sessionLength.increase}
      />

      <p id="timer-label">{state}</p>
      <p id="time-left" data-testid="time-left">
        {timeLeft}
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

type TimerLengthControlProps = {
  onIncreaseClick: () => void
  onDecreaseClick: () => void
  title: string
  id: string
  length: number
}

const TimerLengthControl: React.FC<TimerLengthControlProps> = ({
  length,
  title,
  id,
  onDecreaseClick,
  onIncreaseClick,
}) => (
  <>
    <h2 id={`${id}-label`}>{title}</h2>
    <p id={`${id}-length`} data-testid={`${id}-length`}>
      {length}
    </p>
    <Button
      id={`${id}-decrement`}
      data-testid={`${id}-decrement`}
      onClick={onDecreaseClick}
    >
      Decrease
    </Button>
    <Button
      id={`${id}-increment`}
      data-testid={`${id}-increment`}
      onClick={onIncreaseClick}
    >
      Increase
    </Button>
  </>
)
