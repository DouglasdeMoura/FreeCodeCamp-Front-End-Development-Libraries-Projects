import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Calculator } from './calculator'

describe('<Calculator />', () => {
  test('My calculator should contain a clickable element containing an = (equal sign) with a corresponding id="equals".', () => {
    render(<Calculator />)

    const button = screen.getByRole('button', { name: '=' })
    expect(button).toHaveAttribute('id', 'equals')
  })

  test('My calculator should contain 10 clickable elements containing one number each from 0-9, with the following corresponding IDs: id="zero", id="one", id="two", id="three", id="four", id="five", id="six", id="seven", id="eight", and id="nine"', () => {
    render(<Calculator />)

    const buttons = screen.getAllByRole('button', { name: /[0-9]/ })
    expect(buttons).toHaveLength(10)

    buttons.forEach((button) => {
      const ids = [
        'zero',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
      ]
      const id = button?.textContent ? +button?.textContent : -1

      expect(button).toHaveAttribute('id', ids[id])
    })
  })

  test('My calculator should contain 4 clickable elements each containing one of the 4 primary mathematical operators with the following corresponding IDs: id="add", id="subtract", id="multiply", id="divide".', () => {
    render(<Calculator />)
    const buttons = screen.getAllByRole('button', { name: /[+\-*/]/ })

    expect(buttons).toHaveLength(4)

    buttons.forEach((button) => {
      const ids = ['add', 'subtract', 'multiply', 'divide']
      const id = button?.textContent ? +button?.textContent : -1

      expect(button).toHaveAttribute('id', ids[id])
    })
  })

  test('My calculator should contain a clickable element containing a . (decimal point) symbol with a corresponding id="decimal".', () => {
    render(<Calculator />)

    const button = screen.getByRole('button', { name: '.' })
    expect(button).toHaveAttribute('id', 'decimal')
  })

  test('My calculator should contain a clickable element with an id="clear".', () => {
    render(<Calculator />)

    const button = screen.getByRole('button', { name: 'AC' })
    expect(button).toHaveAttribute('id', 'clear')
  })

  test('My calculator should contain an element to display values with a corresponding id="display".', () => {
    render(<Calculator />)

    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'display')
  })

  test('At any time, pressing the clear button clears the input and output values, and returns the calculator to its initialized state; 0 should be shown in the element with the id of display.', () => {
    render(<Calculator />)

    expect(screen.getByRole('textbox')).toHaveValue('0')

    userEvent.click(screen.getByRole('button', { name: 'AC' }))

    expect(screen.getByRole('textbox')).toHaveValue('0')
  })

  test('Evaluate calculations correctly', async () => {
    const calculatorHelper = async (expression: string, result: number) => {
      const expressionArray = expression.split(' ')

      for (const item of expressionArray) {
        const button = screen.getByRole('button', { name: item })
        userEvent.click(button)
      }

      userEvent.click(screen.getByRole('button', { name: '=' }))

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue(result.toString())
      })

      await userEvent.click(screen.getByRole('button', { name: 'AC' }))
    }

    render(<Calculator />)

    await calculatorHelper('1 + 2', 3)
    await calculatorHelper('2 + 2', 4)
    await calculatorHelper('3 * 2 + 6', 12)
    await calculatorHelper('3 * 2 + 6 - 8', 4)
  })
})
