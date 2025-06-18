import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders, mockReactToastify } from '../../test/test-utils'
import TokenInput from './TokenInput'

// Mock the API module
vi.mock('APIs/blockcypherWebhooks', () => ({
  getTokenDets: vi.fn()
}))

// Mock react-toastify
mockReactToastify()

describe('TokenInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with initial token value from store', () => {
    const initialState = {
      tokenReducer: {
        token: 'test-token-123',
        fetched: false,
        limits: {}
      }
    }

    const { getByDisplayValue } = renderWithProviders(<TokenInput />, { initialState })
    
    expect(getByDisplayValue('test-token-123')).toBeInTheDocument()
  })

  it('should show update button as disabled when token unchanged', () => {
    const initialState = {
      tokenReducer: {
        token: 'test-token-123',
        fetched: false,
        limits: {}
      }
    }

    const { getByText } = renderWithProviders(<TokenInput />, { initialState })
    
    const updateButton = getByText('Update')
    expect(updateButton).toBeDisabled()
  })

  it('should enable update button when token is changed', () => {
    const initialState = {
      tokenReducer: {
        token: '',
        fetched: false,
        limits: {}
      }
    }

    const { getByPlaceholderText, getByText } = renderWithProviders(<TokenInput />, { initialState })
    
    const input = getByPlaceholderText('Enter your BlockCypher API token')
    const updateButton = getByText('Update')
    
    fireEvent.change(input, { target: { value: 'new-token' } })
    
    expect(updateButton).not.toBeDisabled()
  })

  it('should update token and fetch details on successful update', async () => {
    const { getTokenDets } = await import('APIs/blockcypherWebhooks')
    const mockTokenData = {
      limits: { "api/hour": 200, "api/second": 3 },
      used: 0
    }
    
    getTokenDets.mockResolvedValue({ data: mockTokenData })

    const initialState = {
      tokenReducer: {
        token: '',
        fetched: false,
        limits: {}
      }
    }

    const { getByPlaceholderText, getByText, store } = renderWithProviders(<TokenInput />, { initialState })
    
    const input = getByPlaceholderText('Enter your BlockCypher API token')
    const updateButton = getByText('Update')
    
    fireEvent.change(input, { target: { value: 'new-token-123' } })
    fireEvent.click(updateButton)
    
    await waitFor(() => {
      expect(getTokenDets).toHaveBeenCalledWith('new-token-123')
    })

    await waitFor(() => {
      const state = store.getState()
      expect(state.tokenReducer.token).toBe('new-token-123')
    })
  })

  it('should handle token validation errors gracefully', async () => {
    const { getTokenDets } = await import('APIs/blockcypherWebhooks')
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    getTokenDets.mockRejectedValue(new Error('Invalid token'))

    const initialState = {
      tokenReducer: {
        token: '',
        fetched: false,
        limits: {}
      }
    }

    const { getByPlaceholderText, getByText, store } = renderWithProviders(<TokenInput />, { initialState })
    
    const input = getByPlaceholderText('Enter your BlockCypher API token')
    const updateButton = getByText('Update')
    
    fireEvent.change(input, { target: { value: 'invalid-token' } })
    fireEvent.click(updateButton)
    
    await waitFor(() => {
      expect(getTokenDets).toHaveBeenCalledWith('invalid-token')
    })

    await waitFor(() => {
      const state = store.getState()
      // Token should still be updated even if validation fails
      expect(state.tokenReducer.token).toBe('invalid-token')
    })

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error validating token:', expect.any(Error))
    })

    consoleSpy.mockRestore()
  })

  it('should clear token when empty string is provided', async () => {
    const initialState = {
      tokenReducer: {
        token: 'existing-token',
        fetched: true,
        limits: {}
      }
    }

    const { getByDisplayValue, getByText, store } = renderWithProviders(<TokenInput />, { initialState })
    
    const input = getByDisplayValue('existing-token')
    const updateButton = getByText('Update')
    
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.click(updateButton)
    
    await waitFor(() => {
      const state = store.getState()
      expect(state.tokenReducer.token).toBe('')
    })
  })
})
