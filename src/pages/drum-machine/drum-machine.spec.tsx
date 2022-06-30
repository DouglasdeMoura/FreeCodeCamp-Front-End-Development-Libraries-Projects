import { render } from '@testing-library/react'

import { DrumMachine } from './drum-machine'

describe('<DrumMachine />', () => {
  it('should render the DrumMachine component', () => {
    render(<DrumMachine />)

    expect(true).toBeTruthy()
  })
})
