import * as React from 'react'
import { setGlobalConfig } from '@storybook/testing-react'
import { toHaveNoViolations } from 'jest-axe'
import * as globalStorybookConfig from '../.storybook/preview'
import { server } from '../src/mocks/server'

setGlobalConfig(globalStorybookConfig)
expect.extend(toHaveNoViolations)

global.React = React

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
