import assert from 'node:assert'

export * from '@testing-library/react'

export function querySelector<T extends Element>(
  container: HTMLElement,
  id: string,
): T {
  const element = container.querySelector<T>(id)
  assert(element !== null, `Unable to find an element with ID #${id}.`)
  return element
}
