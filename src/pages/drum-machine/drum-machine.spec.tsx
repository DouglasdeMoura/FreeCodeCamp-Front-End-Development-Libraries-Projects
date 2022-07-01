/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DrumMachine } from './drum-machine'

const keys = 'QWEASDZXC'

describe('<DrumMachine />', () => {
  test('I should be able to see an outer container with a corresponding id="drum-machine" that contains all other elements.', () => {
    render(<DrumMachine />)

    const wrapper = screen.getByTestId('drum-machine')

    expect(wrapper).toHaveAttribute('id', 'drum-machine')
  })

  test('Within #drum-machine I can see an element with a corresponding id="display".', () => {
    render(<DrumMachine />)

    const display = screen.getByTestId('display')
    expect(display).toHaveAttribute('id', 'display')
  })

  test('Within #drum-machine I can see 9 clickable drum pad elements, each with a class name of drum-pad, a unique id that describes the audio clip the drum pad will be set up to trigger, and an inner text that corresponds to one of the following keys on the keyboard: Q, W, E, A, S, D, Z, X, C. The drum pads MUST be in this order.', async () => {
    const { container } = render(<DrumMachine />)
    const drumpads = container.querySelectorAll<HTMLButtonElement>('.drum-pad')

    expect(drumpads).toHaveLength(9)

    const audioClips: string[] = []
    const text: string[] = []

    drumpads.forEach((drumpad) => {
      const audio = drumpad.querySelector<HTMLAudioElement>('audio')

      if (audio?.src) {
        audioClips.push(audio?.src)
      }

      if (drumpad.textContent) {
        text.push(drumpad.textContent)
      }
    })

    // check if every drumpad has an unique audio clip
    expect([...new Set(audioClips)]).toEqual(audioClips)

    // check the order of the buttons
    expect(text.join('')).toBe(keys)
  })

  test('Within each .drum-pad, there should be an HTML5 audio element which has a src attribute pointing to an audio clip, a class name of clip, and an id corresponding to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.).', () => {
    const { container } = render(<DrumMachine />)

    const drumpads = container.querySelectorAll('.drum-pad')

    drumpads.forEach((drumpad) => {
      const audio = drumpad.querySelector('audio')

      expect(audio).toHaveAttribute('id', drumpad.textContent)
      expect(audio).toHaveAttribute('class', 'hidden clip')
      expect(audio).toHaveAttribute('src')
      expect(audio?.src).toMatch(/\.mp3$/)
    })
  })

  test('When I click on a .drum-pad element, the audio clip contained in its child audio element should be triggered.', async () => {
    const play = jest.fn()

    const { container } = render(<DrumMachine />)

    const drumpads = container.querySelectorAll<HTMLButtonElement>('.drum-pad')

    drumpads.forEach((drumpad) => {
      const audio = drumpad.querySelector('audio') as HTMLAudioElement
      audio.play = play
      drumpad.click()
    })

    await waitFor(() => {
      expect(play).toHaveBeenCalledTimes(keys.length)
    })
  })

  test('When I press the trigger key associated with each .drum-pad, the audio clip contained in its child audio element should be triggered (e.g. pressing the Q key should trigger the drum pad which contains the string Q, pressing the W key should trigger the drum pad which contains the string W, etc.).', async () => {
    const play = jest.fn()

    const { container } = render(<DrumMachine />)

    const drumpads = container.querySelectorAll<HTMLButtonElement>('.drum-pad')

    drumpads.forEach((drumpad) => {
      const audio = drumpad.querySelector('audio') as HTMLAudioElement
      audio.play = play
    })

    keys.split('').forEach((key) => {
      userEvent.keyboard(`{${key}}`)
    })

    await waitFor(() => {
      expect(play).toHaveBeenCalledTimes(keys.length)
    })
  })

  test('When a .drum-pad is triggered, a string describing the associated audio clip is displayed as the inner text of the #display element (each string must be unique).', () => {
    const audios = [
      'Heater 1',
      'Heater 2',
      'Heater 3',
      'Heater 4',
      'Clap',
      'Open HH',
      "Kick n' Hat",
      'Kick',
      'Closed HH',
    ]

    const { container } = render(<DrumMachine />)

    const drumpads = container.querySelectorAll<HTMLButtonElement>('.drum-pad')

    drumpads.forEach(async (drumpad, index) => {
      drumpad.click()
      await waitFor(() => {
        expect(screen.getByTestId('display')).toHaveTextContent(audios[index])
      })
    })

    keys.split('').forEach(async (key, index) => {
      userEvent.keyboard(`{${key}}`)

      await waitFor(() => {
        expect(screen.getByTestId('display')).toHaveTextContent(audios[index])
      })
    })
  })
})
