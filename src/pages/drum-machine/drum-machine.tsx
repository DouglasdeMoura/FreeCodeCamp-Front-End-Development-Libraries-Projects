/* eslint-disable tailwindcss/no-custom-classname */
import { FC, useEffect, useRef } from 'react'

import { Button } from '../../components/button'

export const DrumMachine: FC = () => {
  const displayRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase()
    const button = document.querySelector<HTMLButtonElement>(
      `button[id="${key}"]`,
    )

    if (button) {
      button.classList.toggle('bg-blue-800')
      button.click()

      setTimeout(() => {
        button.classList.toggle('bg-blue-800')
      }, 100)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const drumPadElements = [
    {
      name: 'Heater 1',
      audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
      key: 'Q',
    },
    {
      name: 'Heater 2',
      audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
      key: 'W',
    },
    {
      name: 'Heater 3',
      audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
      key: 'E',
    },
    {
      name: 'Heater 4',
      audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
      key: 'A',
    },
    {
      name: 'Clap',
      audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
      key: 'S',
    },
    {
      name: 'Open HH',
      id: 'D',
      audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
      key: 'D',
    },
    {
      name: "Kick n' Hat",
      audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
      key: 'Z',
    },
    {
      name: 'Kick',
      id: 'X',
      audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
      key: 'X',
    },
    {
      name: 'Closed HH',
      audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
      key: 'C',
    },
  ]

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      id="drum-machine"
      data-testid="drum-machine"
      className="flex gap-4 justify-center items-center w-screen h-screen"
    >
      <div className="flex flex-col gap-4 justify-center items-center p-2 bg-white rounded scale-150">
        <div
          id="display"
          data-testid="display"
          ref={displayRef}
          aria-label="Audio clip"
          className="flex justify-center items-center pb-2 w-48 font-bold text-slate-900 border border-x-0 border-t-0 border-t-slate-300 min-h-9"
        >
          <span className="text-xs text-center">
            Click on the pads or type the corresponding key to play the sound
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {drumPadElements.map((drumPadElement) => (
            <Button
              id={drumPadElement.key}
              key={drumPadElement.key}
              className="drum-pad"
              data-key={drumPadElement.key}
              onClick={(e) => {
                e.currentTarget.querySelector('audio')?.play()
                if (displayRef.current) {
                  displayRef.current.innerText = drumPadElement.name
                }
              }}
            >
              {drumPadElement.key}
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio
                id={drumPadElement.key}
                src={drumPadElement.audioClip}
                data-name={drumPadElement.name}
                className="hidden clip"
              />
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
