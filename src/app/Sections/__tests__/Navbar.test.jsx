import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Navbar from '../Navbar'
import themeReducer, { initialState } from 'store/slices/themeSlice'

const mockStore = configureStore({
  reducer: {
    themeReducer: themeReducer
  },
  preloadedState: {
    themeReducer: {
      mode: 'light'
    }
  }
})

const theme = createTheme(initialState)

const renderWithProviders = (component) => {
  return render(
    <Provider store={mockStore}>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </Provider>
  )
}

describe('Navbar', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders theme toggle switch', () => {
    renderWithProviders(<Navbar />)
    const themeSwitch = screen.getByRole('checkbox', { name: /primary checkbox/i })
    expect(themeSwitch).toBeInTheDocument()
  })

  it('theme switch is checked by default', () => {
    renderWithProviders(<Navbar />)
    const themeSwitch = screen.getByRole('checkbox', { name: /primary checkbox/i })
    expect(themeSwitch).toBeChecked()
  })

  it('dispatches theme change when switch is toggled', () => {
    const mockDispatch = vi.fn()
    
    const mockStoreWithDispatch = configureStore({
      reducer: {
        themeReducer: themeReducer
      },
      preloadedState: {
        themeReducer: {
          mode: 'light'
        }
      }
    })
    
    vi.spyOn(mockStoreWithDispatch, 'dispatch')

    render(
      <Provider store={mockStoreWithDispatch}>
        <ThemeProvider theme={theme}>
          <Navbar />
        </ThemeProvider>
      </Provider>
    )
    
    const themeSwitch = screen.getByRole('checkbox', { name: /primary checkbox/i })
    fireEvent.click(themeSwitch)
    
    expect(mockStoreWithDispatch.dispatch).toHaveBeenCalled()
  })

  it('has sticky positioning', () => {
    renderWithProviders(<Navbar />)
    const navbar = screen.getByRole('banner').parentElement
    const styles = window.getComputedStyle(navbar)
    expect(styles.position).toBe('sticky')
  })

  it('navbar background color changes when theme switch is toggled', () => {
    const lightTheme = createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: '#1976d2'
        }
      }
    })

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#673ab7'
        }
      }
    })

    const lightStore = configureStore({
      reducer: {
        themeReducer: themeReducer
      },
      preloadedState: {
        themeReducer: {
          mode: 'light'
        }
      }
    })

    const { rerender } = render(
      <Provider store={lightStore}>
        <ThemeProvider theme={lightTheme}>
          <Navbar />
        </ThemeProvider>
      </Provider>
    )

    const appBar = screen.getByRole('banner')
    const lightStyles = window.getComputedStyle(appBar)
    const lightBackgroundColor = lightStyles.backgroundColor

    const darkStore = configureStore({
      reducer: {
        themeReducer: themeReducer
      },
      preloadedState: {
        themeReducer: {
          mode: 'dark'
        }
      }
    })

    rerender(
      <Provider store={darkStore}>
        <ThemeProvider theme={darkTheme}>
          <Navbar />
        </ThemeProvider>
      </Provider>
    )

    const darkStyles = window.getComputedStyle(appBar)
    const darkBackgroundColor = darkStyles.backgroundColor

    expect(lightBackgroundColor).not.toBe(darkBackgroundColor)
  })
})