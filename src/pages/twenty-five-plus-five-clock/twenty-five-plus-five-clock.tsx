import { useRef, useState } from 'react'

import { Button } from '../../components/button'

import { useIntervalWhen } from 'rooks'

const BREAK_LENGTH = 5 // minutes
const SESSION_LENGTH = 25 // minutes
const TOP_LIMIT = 60 // minutes
const BOTTOM_LIMIT = 1 // minute

const toSeconds = (minutes: number) => minutes * 60

const toTimeString = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`
}

type State = 'Session' | 'Break'

export const TwentyFivePlusFiveClock: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [timeLeft, setTimeLeft] = useState(toSeconds(SESSION_LENGTH))
  const [sessionTime, setSessionTime] = useState(SESSION_LENGTH)
  const [breakTime, setBreakTime] = useState(BREAK_LENGTH)
  const [state, setState] = useState<State>('Session')
  const [when, setWhen] = useState(false)

  useIntervalWhen(
    () => {
      setTimeLeft((currentTimeLeft) => {
        if (currentTimeLeft === 0) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
          }

          return state === 'Session'
            ? toSeconds(breakTime)
            : toSeconds(sessionTime)
        }

        return currentTimeLeft - 1
      })

      if (timeLeft === 0) {
        setState((currentState) =>
          currentState === 'Session' ? 'Break' : 'Session',
        )
      }
    },
    1000,
    when,
  )

  const increase =
    (
      setState: React.Dispatch<React.SetStateAction<number>>,
      n: number,
      type: State,
    ) =>
    () => {
      if (n < TOP_LIMIT) {
        setState((currentState) => currentState + 1)

        if (type === state) {
          setTimeLeft((currentState) => currentState + toSeconds(1))
        }
      }
    }

  const decrease =
    (
      setState: React.Dispatch<React.SetStateAction<number>>,
      n: number,
      type: State,
    ) =>
    () => {
      if (n > BOTTOM_LIMIT) {
        setState((currentState) => currentState - 1)

        if (type === state) {
          setTimeLeft((currentState) => currentState - toSeconds(1))
        }
      }
    }

  const reset = () => {
    setTimeLeft(toSeconds(SESSION_LENGTH))
    setSessionTime(SESSION_LENGTH)
    setBreakTime(BREAK_LENGTH)
    setState('Session')
    setWhen(false)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return (
    <div>
      <Button
        id="start_stop"
        data-testid="play-pause"
        onClick={() => setWhen((currentState) => !currentState)}
      >
        Play/Pause
      </Button>

      <Button id="reset" onClick={reset}>
        Reset
      </Button>

      <TimerLengthControl
        length={breakTime}
        title="Break Length"
        id="break"
        onDecreaseClick={decrease(setBreakTime, breakTime, 'Break')}
        onIncreaseClick={increase(setBreakTime, breakTime, 'Break')}
      />

      <TimerLengthControl
        length={sessionTime}
        title="Session Length"
        id="session"
        onDecreaseClick={decrease(setSessionTime, sessionTime, 'Session')}
        onIncreaseClick={increase(setSessionTime, sessionTime, 'Session')}
      />

      <p id="timer-label">{state}</p>
      <p id="time-left" data-testid="time-left">
        {toTimeString(timeLeft)}
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
