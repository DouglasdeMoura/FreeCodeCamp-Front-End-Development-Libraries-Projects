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
    (setState: React.Dispatch<React.SetStateAction<number>>, type: State) =>
    () => {
      setState((currentState) =>
        currentState < TOP_LIMIT ? currentState + 1 : TOP_LIMIT,
      )

      if (type === state) {
        setTimeLeft((currentState) => currentState + toSeconds(1))
      }
    }

  const decrease =
    (setState: React.Dispatch<React.SetStateAction<number>>, type: State) =>
    () => {
      setState((currentState) =>
        currentState > BOTTOM_LIMIT ? currentState - 1 : BOTTOM_LIMIT,
      )

      if (type === state) {
        setTimeLeft((currentState) =>
          Math.floor(currentState / 60) > 1
            ? currentState - toSeconds(1)
            : currentState,
        )
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
    <div className="rounded bg-slate-300 p-4">
      <div className="mb-4">
        <p id="timer-label" className="text-sm text-slate-600">
          {state}
        </p>
        <p
          id="time-left"
          data-testid="time-left"
          className="text-4xl font-bold text-slate-900"
        >
          {toTimeString(timeLeft)}
        </p>
      </div>
      <div className="mb-4 flex justify-between gap-4 border-b  border-b-slate-400 pb-4">
        <Button
          id="start_stop"
          data-testid="play-pause"
          onClick={() => setWhen((currentState) => !currentState)}
          variant="primary"
        >
          Play/Pause
        </Button>

        <Button id="reset" onClick={reset} variant="secondary">
          Reset
        </Button>
      </div>

      <TimerLengthControl
        length={breakTime}
        title="Break Length"
        id="break"
        onDecreaseClick={decrease(setBreakTime, 'Break')}
        onIncreaseClick={increase(setBreakTime, 'Break')}
      />

      <TimerLengthControl
        length={sessionTime}
        title="Session Length"
        id="session"
        onDecreaseClick={decrease(setSessionTime, 'Session')}
        onIncreaseClick={increase(setSessionTime, 'Session')}
      />

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
  <div className="mb-4 flex items-center justify-between gap-4 border-b border-b-slate-400 pb-4">
    <div>
      <h2 id={`${id}-label`} className="text-sm text-slate-600">
        {title}
      </h2>
      <p>
        <span
          id={`${id}-length`}
          data-testid={`${id}-length`}
          className="font-bold"
        >
          {length}
        </span>
        <span className="text-sm font-normal text-slate-600">minutes</span>
      </p>
    </div>
    <div className="flex justify-between gap-4">
      <div>
        <Button
          id={`${id}-decrement`}
          data-testid={`${id}-decrement`}
          onClick={onDecreaseClick}
          variant="secondary"
        >
          Decrease
        </Button>
      </div>
      <div>
        <Button
          id={`${id}-increment`}
          data-testid={`${id}-increment`}
          onClick={onIncreaseClick}
          variant="secondary"
        >
          Increase
        </Button>
      </div>
    </div>
  </div>
)
