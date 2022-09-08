import { FC, useEffect, useRef } from 'react'

import { evaluate } from 'mathjs'

type Type = 'action' | 'number' | 'operator' | 'sign'

const CLEAR_ACTION = 'AC'
const EQUALS_ACTION = '='
const BACKSPACE_ACTION = 'DEL'

const buttons = [
  { id: 'seven', value: 7, type: 'number' },
  { id: 'eight', value: 8, type: 'number' },
  { id: 'nine', value: 9, type: 'number' },
  { id: 'backspace', value: BACKSPACE_ACTION, type: 'action' },
  { id: 'clear', value: CLEAR_ACTION, type: 'action' },

  { id: 'four', value: 4, type: 'number' },
  { id: 'five', value: 5, type: 'number' },
  { id: 'six', value: 6, type: 'number' },
  { id: 'multiply', value: '*', type: 'operator' },
  { id: 'divide', value: '/', type: 'operator' },

  { id: 'one', value: 1, type: 'number' },
  { id: 'two', value: 2, type: 'number' },
  { id: 'three', value: 3, type: 'number' },
  { id: 'add', value: '+', type: 'operator' },
  { id: 'subtract', value: '-', type: 'operator' },

  { id: 'zero', value: 0, type: 'number' },
  { id: 'decimal', value: '.', type: 'sign' },
  { id: 'equals', value: EQUALS_ACTION, type: 'action' },
]

const operators = buttons
  .filter((button) => button.type === 'operator')
  .map((button) => button.value)

const signs = buttons
  .filter((button) => button.type === 'sign')
  .map((button) => button.value)

type GetDisplayOutput = {
  currentValue: string
  type: Type
  value: string
}

const getDisplayOutput = ({ currentValue, type, value }: GetDisplayOutput) => {
  if (type === 'number') {
    if (currentValue === '0') {
      return value
    }

    return currentValue + value
  }

  const lastCharacter = currentValue.at(-1) || ''

  const hasSignAlready = (v: string) => {
    return v
      .replace(/[^0-9.]/g, ' ')
      .split(' ')
      .at(-1)
      ?.split('')
      .some((character) => signs.includes(character))
  }

  if (
    type === 'sign' &&
    lastCharacter !== value && // Don't allow multiple signs in a row
    !operators.includes(lastCharacter) && // Don't allow a sign to be placed after an operator
    !hasSignAlready(currentValue) // Don't allow a sign to be placed after a number
  ) {
    return currentValue + value
  }

  if (
    type === 'operator' &&
    !operators.includes(lastCharacter) && // Don't allow multiple operators in a row
    !operators.filter((operator) => operator === '-').includes(lastCharacter) && // Don't allow an operator to be placed after an operator
    !signs.includes(lastCharacter) // Don't allow the repetition of a sign
  ) {
    return currentValue + value
  }

  if (type === 'action') {
    if (value === BACKSPACE_ACTION) {
      if (currentValue.length === 1) {
        return '0'
      } else {
        return currentValue.slice(0, -1)
      }
    }

    if (value === CLEAR_ACTION) {
      return '0'
    }

    if (
      value === EQUALS_ACTION &&
      !operators.includes(lastCharacter) && // Don't evaluate the expression if last character is an operator
      !signs.includes(lastCharacter) // Don't evaluate the expression if last character is a sign
    ) {
      return evaluate(currentValue)
    }
  }

  return currentValue
}

export const Calculator: FC = () => {
  const displayRef = useRef<HTMLInputElement>(null)

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!displayRef.current) return

    const type = e.currentTarget.dataset.type as Type
    const value = e.currentTarget.textContent as string

    const currentValue = displayRef.current.value
    const displayOutput = getDisplayOutput({
      currentValue,
      type,
      value,
    })

    displayRef.current.value = displayOutput
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    let key = e.key.toUpperCase()

    if (key === 'ENTER') {
      key = EQUALS_ACTION
    }

    if (key === 'BACKSPACE') {
      key = BACKSPACE_ACTION
    }

    if (key === 'ESCAPE') {
      key = CLEAR_ACTION
    }

    const button = document.querySelector<HTMLButtonElement>(
      `button[data-value="${key}"]`,
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

  return (
    <div className="flex flex-col">
      <div>
        <input id="display" defaultValue={0} ref={displayRef} disabled />
      </div>
      <div className="grid grid-cols-5">
        {buttons.map(({ id, value, type }) => (
          <button
            key={id}
            id={id}
            data-type={type}
            data-value={value}
            onClick={handleOnClick}
            className="flex justify-center items-center p-4"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}
