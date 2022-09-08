import { FC, useEffect, useRef } from 'react'

import { evaluate } from 'mathjs'

type Type = 'action' | 'number' | 'operator' | 'sign'

const CLEAR_ACTION = 'AC'
const EQUALS_ACTION = '='
const BACKSPACE_ACTION = 'DEL'

const buttons = [
  {
    id: 'add',
    value: '+',
    type: 'operator',
    className: 'bg-slate-700 text-slate-50',
  },
  {
    id: 'subtract',
    value: '-',
    type: 'operator',
    className: 'bg-slate-700 text-slate-50',
  },
  {
    id: 'multiply',
    value: '*',
    type: 'operator',
    className: 'bg-slate-700 text-slate-50',
  },
  {
    id: 'divide',
    value: '/',
    type: 'operator',
    className: 'bg-slate-700 text-slate-50',
  },

  { id: 'seven', value: 7, type: 'number', className: 'bg-slate-50' },
  { id: 'eight', value: 8, type: 'number', className: 'bg-slate-50' },
  { id: 'nine', value: 9, type: 'number', className: 'bg-slate-50' },
  {
    id: 'clear',
    value: CLEAR_ACTION,
    type: 'action',
    className: 'bg-orange-500 text-slate-50',
  },

  { id: 'four', value: 4, type: 'number', className: 'bg-slate-50' },
  { id: 'five', value: 5, type: 'number', className: 'bg-slate-50' },
  { id: 'six', value: 6, type: 'number', className: 'bg-slate-50' },
  {
    id: 'backspace',
    value: BACKSPACE_ACTION,
    type: 'action',
    className: 'bg-slate-50 col-start-4 col-end-5 row-start-3 row-end-5',
  },

  { id: 'one', value: 1, type: 'number', className: 'bg-slate-50' },
  { id: 'two', value: 2, type: 'number', className: 'bg-slate-50' },
  { id: 'three', value: 3, type: 'number', className: 'bg-slate-50' },

  { id: 'decimal', value: '.', type: 'sign', className: 'bg-slate-50' },
  { id: 'zero', value: 0, type: 'number', className: 'bg-slate-50' },
  {
    id: 'equals',
    value: EQUALS_ACTION,
    type: 'action',
    className: 'col-start-3 col-end-5 bg-sky-600 text-slate-50',
  },
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
  const penultimateCharacter = currentValue.at(-2) || ''

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
    !operators.filter((op) => op === '-').includes(lastCharacter) && // Don't allow multiple operators in a row
    '-' !== lastCharacter && // Don't allow an operator to be placed after an operator
    !signs.includes(lastCharacter) // Don't allow the repetition of a sign
  ) {
    return currentValue + value
  }

  if (
    type === 'operator' &&
    !operators.filter((op) => op === '-').includes(lastCharacter) && // Don't allow multiple operators in a row
    '-' !== lastCharacter && // Don't allow an operator to be placed after an operator
    !signs.includes(lastCharacter) // Don't allow the repetition of a sign
  ) {
    return currentValue + value
  }

  if (
    type === 'operator' &&
    lastCharacter === '-' &&
    operators.includes(penultimateCharacter)
  ) {
    return currentValue.slice(0, -2) + value
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
    <div
      className="flex flex-col p-2 bg-slate-900 rounded-lg"
      style={{ maxWidth: '200px' }}
    >
      <div>
        <input
          id="display"
          className="py-4 px-2 mb-2 w-full font-mono text-xl text-right text-slate-50 bg-slate-900"
          defaultValue={0}
          ref={displayRef}
          tabIndex={-1}
          readOnly
        />
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {buttons.map(({ id, value, type, className }) => (
          <button
            key={id}
            id={id}
            data-type={type}
            data-value={value}
            onClick={handleOnClick}
            className={[
              'flex',
              'justify-center',
              'items-center',
              'p-2',
              'rounded-md',
              className,
            ]
              .filter((cn) => cn !== undefined)
              .join(' ')}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}
