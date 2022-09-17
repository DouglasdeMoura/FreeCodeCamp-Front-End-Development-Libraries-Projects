import TwentyFivePlusFiveClock from '.'
import { render, screen } from '../../utils/test-utils'

describe('<TwentyFivePlusFiveClock />', () => {
  test('I can see an element with id="break-label" that contains a string (e.g. "Break Length")', () => {
    render(<TwentyFivePlusFiveClock />)
    expect(screen.getByText('Break Length')).toHaveAttribute(
      'id',
      'break-label',
    )
  })

  test('I can see two clickable elements with corresponding IDs: id="break-decrement" and id="session-decrement"', () => {
    render(<TwentyFivePlusFiveClock />)
    expect(screen.getByTestId('break-decrement')).toHaveAttribute(
      'id',
      'break-decrement',
    )

    expect(screen.getByTestId('session-decrement')).toHaveAttribute(
      'id',
      'session-decrement',
    )
  })

  test('I can see two clickable elements with corresponding IDs: id="break-increment" and id="session-increment"', () => {
    render(<TwentyFivePlusFiveClock />)
    expect(screen.getByTestId('break-increment')).toHaveAttribute(
      'id',
      'break-increment',
    )

    expect(screen.getByTestId('session-increment')).toHaveAttribute(
      'id',
      'session-increment',
    )
  })

  test('I can see an element with a corresponding id="break-length", which by default (on load) displays a value of 5', () => {
    render(<TwentyFivePlusFiveClock />)
    expect(screen.getByText('5')).toHaveAttribute('id', 'break-length')
  })

  test('I can see an element with a corresponding id="session-length", which by default displays a value of 25', () => {
    render(<TwentyFivePlusFiveClock />)
    expect(screen.getByText('25')).toHaveAttribute('id', 'session-length')
  })

  test('I can see an element with a corresponding id="timer-label", that contains a string indicating a session is initialized (e.g. "Session")', () => {
    render(<TwentyFivePlusFiveClock />)
    expect(screen.getByText('Session')).toHaveAttribute('id', 'timer-label')
  })

  test('I can see an element with corresponding id="time-left". NOTE: Paused or running, the value in this field should always be displayed in mm:ss format (i.e. 25:00)', () => {
    render(<TwentyFivePlusFiveClock />)
    expect(screen.getByText('25:00')).toHaveAttribute('id', 'time-left')
  })

  test('I can see a clickable element with a corresponding id="start_stop"', () => {
    render(<TwentyFivePlusFiveClock />)
    expect(screen.getByTestId('play-pause')).toHaveAttribute('id', 'start_stop')
  })

  test('I can see a clickable element with a corresponding id="reset"', () => {
    render(<TwentyFivePlusFiveClock />)
    expect(screen.getByText('Reset')).toHaveAttribute('id', 'reset')
  })
  test('When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to its default state', async () => {
    const { user } = render(<TwentyFivePlusFiveClock />)

    const reset = screen.getByRole('button', { name: 'Reset' })

    expect(reset).toHaveAttribute('id', 'reset')

    await user.click(reset)
  })

  test('When I click the element with the id of break-decrement, the value within id="break-length" decrements by a value of 1, and I can see the updated value', async () => {
    const { user } = render(<TwentyFivePlusFiveClock />)

    const decrease = screen.getByTestId('break-decrement')
    const breakLength = screen.getByTestId('break-length')

    expect(breakLength).toHaveAttribute('id', 'break-length')
    expect(breakLength).toHaveTextContent('5')
    expect(decrease).toHaveAttribute('id', 'break-decrement')
    expect(decrease).toHaveTextContent('Decrease')

    await user.click(decrease)

    expect(breakLength).toHaveTextContent('4')
  })
})
