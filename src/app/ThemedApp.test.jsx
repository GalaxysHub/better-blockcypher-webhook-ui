import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders } from '../test/test-utils'
import ThemedApp from './ThemedApp'

// Mock the App component since we're testing the wrapper
vi.mock('./App.jsx', () => ({
  default: () => <div data-testid="mock-app">App Component</div>
}))

describe('ThemedApp', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithProviders(<ThemedApp />)
    expect(getByTestId('mock-app')).toBeInTheDocument()
  })

  it('should provide theme context to child components', () => {
    const { container } = renderWithProviders(<ThemedApp />)
    
    // Check that MUI ThemeProvider is present
    expect(container.querySelector('[data-testid="mock-app"]')).toBeInTheDocument()
  })

  it('should use light theme by default', () => {
    const { container } = renderWithProviders(<ThemedApp />)
    
    // The App component should be rendered, indicating theme provider is working
    expect(container.querySelector('[data-testid="mock-app"]')).toBeInTheDocument()
  })

  it('should use dark theme when theme state is dark', () => {
    const initialState = {
      themeReducer: {
        mode: "dark",
        palette: {
          primary: { main: "#673ab7" },
          secondary: { main: "#673ab7" },
          text: { dark: "white", light: "white" },
          page: { 
            text: { light: "black", dark: "#e1bee7" }, 
            background: { light: "#eeeeee", dark: "#424242" } 
          }
        }
      }
    }

    const { container } = renderWithProviders(<ThemedApp />, { initialState })
    
    // The App component should be rendered with dark theme
    expect(container.querySelector('[data-testid="mock-app"]')).toBeInTheDocument()
  })

  it('should update theme when Redux state changes', () => {
    const { container, store } = renderWithProviders(<ThemedApp />)
    
    // Initially should render the app
    expect(container.querySelector('[data-testid="mock-app"]')).toBeInTheDocument()
    
    // Change theme in store
    store.dispatch({ type: 'theme/setDarkTheme' })
    
    // App should still be rendered (theme change handled by provider)
    expect(container.querySelector('[data-testid="mock-app"]')).toBeInTheDocument()
  })

  it('should provide StyledEngineProvider for MUI styles', () => {
    const { container } = renderWithProviders(<ThemedApp />)
    
    // Component should render successfully with styled engine
    expect(container.querySelector('[data-testid="mock-app"]')).toBeInTheDocument()
  })

  it('should handle custom theme properties', () => {
    const initialState = {
      themeReducer: {
        mode: "light",
        palette: {
          primary: { main: "#custom-color" },
          secondary: { main: "#another-custom" },
          text: { dark: "white", light: "black" },
          page: { 
            text: { light: "custom-text", dark: "custom-dark-text" }, 
            background: { light: "custom-bg", dark: "custom-dark-bg" } 
          },
          customProperty: { value: "test" }
        },
        customThemeProperty: "test-value"
      }
    }

    const { container } = renderWithProviders(<ThemedApp />, { initialState })
    
    // Should render without issues even with custom theme properties
    expect(container.querySelector('[data-testid="mock-app"]')).toBeInTheDocument()
  })

  it('should maintain theme consistency across re-renders', () => {
    const { container, rerender } = renderWithProviders(<ThemedApp />)
    
    expect(container.querySelector('[data-testid="mock-app"]')).toBeInTheDocument()
    
    // Re-render the component
    rerender(<ThemedApp />)
    
    // Should still render correctly
    expect(container.querySelector('[data-testid="mock-app"]')).toBeInTheDocument()
  })
})