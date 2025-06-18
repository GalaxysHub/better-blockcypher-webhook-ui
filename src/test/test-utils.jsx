import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import { vi } from 'vitest'

import webhookReducer from 'store/slices/webhookSlice'
import themeReducer from 'store/slices/themeSlice'
import pageReducer from 'store/slices/pageSlice'
import fieldsReducer from 'store/slices/fieldsSlice'
import tokenReducer from 'store/slices/tokenSlice'

// Default initial state for tests
const defaultInitialState = {
  webhookReducer: {
    BTC: { fetched: false, data: {} },
    BTCt: { fetched: false, data: {} },
    BCY: { fetched: false, data: {} },
    LTC: { fetched: false, data: {} },
    DOGE: { fetched: false, data: {} },
    DASH: { fetched: false, data: {} },
    ETH: { fetched: false, data: {} },
    bETH: { fetched: false, data: {} },
    selected: {}
  },
  themeReducer: {
    mode: "light",
    palette: {
      primary: { main: "#673ab7" },
      secondary: { main: "#673ab7" },
      text: { dark: "white", light: "white" },
      page: { text: { light: "black", dark: "#e1bee7" }, background: { light: "#eeeeee", dark: "#424242" } }
    }
  },
  pageReducer: {
    itemsPerPage: 10,
    pageNum: 1,
    activeCoin: "BCY"
  },
  fieldsReducer: {
    id: { checked: true, order: 0 },
    event: { checked: true, order: 1 },
    url: { checked: true, order: 2 },
    address: { checked: true, order: 3 },
    created_at: { checked: true, order: 4 }
  },
  tokenReducer: {
    limits_per_hour: 200,
    limits_per_second: 3,
    limits_per_day: 1000,
    started: "2020-01-01T00:00:00Z",
    used: 0,
    token: "test-token"
  }
}

function createTestStore(initialState = {}) {
  return configureStore({
    reducer: {
      webhookReducer,
      themeReducer,
      pageReducer,
      fieldsReducer,
      tokenReducer
    },
    preloadedState: {
      ...defaultInitialState,
      ...initialState
    }
  })
}

function TestProviders({ children, initialState = {}, theme = null }) {
  const store = createTestStore(initialState)
  const testTheme = theme || createTheme(defaultInitialState.themeReducer)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={testTheme}>
        <Provider store={store}>
          {children}
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

function renderWithProviders(ui, { initialState = {}, theme = null, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <TestProviders initialState={initialState} theme={theme}>
        {children}
      </TestProviders>
    )
  }

  return {
    store: createTestStore(initialState),
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}

// Mock fetch for API calls
export const mockFetch = (responseData, status = 200) => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(responseData),
      text: () => Promise.resolve(JSON.stringify(responseData))
    })
  )
}

// Mock implementations for common external dependencies
export const mockReactToastify = () => {
  vi.mock('react-toastify', () => ({
    toast: vi.fn(),
    ToastContainer: ({ children }) => children || null
  }))
}

export * from '@testing-library/react'
export { renderWithProviders, TestProviders, createTestStore, defaultInitialState }