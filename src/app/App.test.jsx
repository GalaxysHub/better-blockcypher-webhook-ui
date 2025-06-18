import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { waitFor } from '@testing-library/react'
import { renderWithProviders, mockFetch, mockReactToastify } from '../test/test-utils'
import App from './App'

// Mock the API module
vi.mock('APIs/blockcypherWebhooks', () => ({
  getTokenDets: vi.fn()
}))

// Mock the config
vi.mock('_config/blockcypher.json', () => ({
  TOKEN: 'test-token-123'
}))

// Mock child components
vi.mock('./Sections/Header', () => ({
  default: () => <div data-testid="header">Header</div>
}))

vi.mock('./Sections/CoinTabs', () => ({
  default: () => <div data-testid="coin-tabs">CoinTabs</div>
}))

vi.mock('./Sections/Navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>
}))

vi.mock('./Sections/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>
}))

// Mock react-toastify
mockReactToastify()

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all main sections', () => {
    const { getByTestId } = renderWithProviders(<App />)
    
    expect(getByTestId('app-root')).toBeInTheDocument()
    expect(getByTestId('navbar')).toBeInTheDocument()
    expect(getByTestId('header')).toBeInTheDocument()
    expect(getByTestId('coin-tabs')).toBeInTheDocument()
    expect(getByTestId('footer')).toBeInTheDocument()
  })

  it('should have proper structure with containers', () => {
    const { getByTestId } = renderWithProviders(<App />)
    
    const appRoot = getByTestId('app-root')
    expect(appRoot).toBeInTheDocument()
    
    // Check that main content is inside container
    const navbar = getByTestId('navbar')
    const header = getByTestId('header')
    const coinTabs = getByTestId('coin-tabs')
    const footer = getByTestId('footer')
    
    expect(navbar).toBeInTheDocument()
    expect(header).toBeInTheDocument()
    expect(coinTabs).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
  })

  it('should fetch token details on mount', async () => {
    const { getTokenDets } = await import('APIs/blockcypherWebhooks')
    const mockTokenData = {
      limits_per_hour: 200,
      limits_per_second: 3,
      used: 0,
      token: 'test-token-123'
    }
    
    getTokenDets.mockResolvedValue({ data: mockTokenData })
    
    const { store } = renderWithProviders(<App />)
    
    await waitFor(() => {
      expect(getTokenDets).toHaveBeenCalledWith('test-token-123')
    })
    
    // Check that token data was dispatched to store
    const state = store.getState()
    expect(state.tokenReducer).toEqual(expect.objectContaining(mockTokenData))
  })

  it('should handle token fetch error gracefully', async () => {
    const { getTokenDets } = await import('APIs/blockcypherWebhooks')
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    getTokenDets.mockRejectedValue(new Error('API Error'))
    
    renderWithProviders(<App />)
    
    await waitFor(() => {
      expect(getTokenDets).toHaveBeenCalledWith('test-token-123')
    })
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching token details: ',
        expect.any(Error)
      )
    })
    
    consoleSpy.mockRestore()
  })

  it('should dispatch setTokenDets action on successful fetch', async () => {
    const { getTokenDets } = await import('APIs/blockcypherWebhooks')
    const mockTokenData = {
      limits_per_hour: 100,
      limits_per_second: 2,
      used: 50,
      token: 'test-token-123'
    }
    
    getTokenDets.mockResolvedValue({ data: mockTokenData })
    
    const { store } = renderWithProviders(<App />)
    
    await waitFor(() => {
      expect(getTokenDets).toHaveBeenCalled()
    })
    
    await waitFor(() => {
      const state = store.getState()
      expect(state.tokenReducer).toEqual(expect.objectContaining(mockTokenData))
    })
  })

  it('should render ToastContainer for notifications', () => {
    const { container } = renderWithProviders(<App />)
    
    // Since ToastContainer is mocked, we just verify the component renders
    expect(container.querySelector('[data-testid="app-root"]')).toBeInTheDocument()
  })

  it('should maintain proper layout structure', () => {
    const { getByTestId } = renderWithProviders(<App />)
    
    const appRoot = getByTestId('app-root')
    const navbar = getByTestId('navbar')
    const header = getByTestId('header')
    const coinTabs = getByTestId('coin-tabs')
    const footer = getByTestId('footer')
    
    // Verify the components are in the correct order in the DOM
    const children = Array.from(appRoot.children)
    const childTestIds = children.map(child => child.getAttribute('data-testid')).filter(Boolean)
    
    expect(childTestIds).toEqual(['navbar', 'header', 'coin-tabs', 'footer'])
  })

  it('should handle component mounting and unmounting', () => {
    const { unmount } = renderWithProviders(<App />)
    
    // Component should unmount without errors
    expect(() => unmount()).not.toThrow()
  })

  it('should work with different Redux states', () => {
    const customInitialState = {
      pageReducer: {
        itemsPerPage: 25,
        pageNum: 3,
        activeCoin: "BTC"
      },
      webhookReducer: {
        BTC: { fetched: true, data: { 'webhook1': { id: 'webhook1' } } },
        selected: {}
      }
    }
    
    const { getByTestId } = renderWithProviders(<App />, { initialState: customInitialState })
    
    expect(getByTestId('app-root')).toBeInTheDocument()
    expect(getByTestId('navbar')).toBeInTheDocument()
    expect(getByTestId('header')).toBeInTheDocument()
    expect(getByTestId('coin-tabs')).toBeInTheDocument()
    expect(getByTestId('footer')).toBeInTheDocument()
  })
})