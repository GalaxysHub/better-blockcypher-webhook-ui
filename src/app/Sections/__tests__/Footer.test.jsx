import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Footer from '../Footer'
import { initialState } from 'store/slices/themeSlice'

const theme = createTheme(initialState)

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Footer', () => {
  it('renders without crashing', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('displays developer credit text', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByText('Developed By:')).toBeInTheDocument()
  })

  it('renders GitHub link with correct href', () => {
    renderWithTheme(<Footer />)
    const githubLink = screen.getByRole('link', { name: /galaxyshub/i })
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/GalaxysHub/better-blockcypher-webhook-ui')
  })

  it('GitHub link opens in same tab', () => {
    renderWithTheme(<Footer />)
    const githubLink = screen.getByRole('link', { name: /galaxyshub/i })
    expect(githubLink).not.toHaveAttribute('target', '_blank')
  })

  it('has correct styling properties', () => {
    renderWithTheme(<Footer />)
    const footer = screen.getByRole('contentinfo')
    const styles = window.getComputedStyle(footer)
    expect(styles.textAlign).toBe('center')
    expect(styles.fontSize).toBe('18px')
  })

  it('link has correct styling', () => {
    renderWithTheme(<Footer />)
    const githubLink = screen.getByRole('link', { name: /galaxyshub/i })
    const styles = window.getComputedStyle(githubLink)
    expect(styles.color).toBe('rgb(0, 255, 255)')
    expect(styles.textDecoration).toBe('none')
  })

  it('footer background color changes when app theme is toggled', () => {
    // Use the actual theme configuration from the app
    const lightThemeConfig = {
      mode: 'light',
      palette: {
        primary: {
          main: '#673ab7' // deepPurple[500] - same for both modes
        }
      }
    }

    const darkThemeConfig = {
      mode: 'dark', 
      palette: {
        primary: {
          main: '#673ab7' // deepPurple[500] - same for both modes
        }
      }
    }

    const lightTheme = createTheme(lightThemeConfig)
    const darkTheme = createTheme(darkThemeConfig)

    const { rerender } = render(
      <ThemeProvider theme={lightTheme}>
        <Footer />
      </ThemeProvider>
    )

    const footer = screen.getByRole('contentinfo')
    const lightStyles = window.getComputedStyle(footer)
    const lightBackgroundColor = lightStyles.backgroundColor

    rerender(
      <ThemeProvider theme={darkTheme}>
        <Footer />
      </ThemeProvider>
    )

    const darkStyles = window.getComputedStyle(footer)
    const darkBackgroundColor = darkStyles.backgroundColor

    // This will fail because the app theme uses the same primary.main for both modes
    expect(lightBackgroundColor).not.toBe(darkBackgroundColor)
  })
})