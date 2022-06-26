import * as React from 'react'
import { toHaveNoViolations } from 'jest-axe'
import { server } from '../src/mocks/server'

expect.extend(toHaveNoViolations)

global.React = React

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
