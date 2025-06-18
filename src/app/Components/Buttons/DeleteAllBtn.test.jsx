import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../test/test-utils'
import DeleteAllBtn from './DeleteAllBtn'

// Mock the DeleteWebhooksModal component
vi.mock('app/Sections/Modals/DeleteWebhooksModal', () => ({
  default: ({ open, setOpen }) => 
    open ? (
      <div data-testid="delete-webhooks-modal">
        <button onClick={() => setOpen(false)}>Close Modal</button>
      </div>
    ) : null
}))

describe('DeleteAllBtn', () => {
  const user = userEvent.setup()

  it('should render delete button when webhooks are selected', () => {
    const initialState = {
      webhookReducer: {
        selected: {
          'webhook1': { id: 'webhook1', url: 'https://example.com/1' },
          'webhook2': { id: 'webhook2', url: 'https://example.com/2' }
        }
      }
    }

    const { getByTestId } = renderWithProviders(<DeleteAllBtn />, { initialState })
    
    expect(getByTestId('delete-all-btn')).toBeInTheDocument()
    expect(getByTestId('delete-all-btn')).toHaveTextContent('Delete 2 Webhooks?')
  })

  it('should be invisible when no webhooks are selected', () => {
    const initialState = {
      webhookReducer: {
        selected: {}
      }
    }

    const { getByTestId } = renderWithProviders(<DeleteAllBtn />, { initialState })
    
    const button = getByTestId('delete-all-btn')
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle({ visibility: 'hidden' })
  })

  it('should open modal when clicked', async () => {
    const initialState = {
      webhookReducer: {
        selected: {
          'webhook1': { id: 'webhook1', url: 'https://example.com/1' }
        }
      }
    }

    const { getByTestId, queryByTestId } = renderWithProviders(<DeleteAllBtn />, { initialState })
    
    // Modal should not be visible initially
    expect(queryByTestId('delete-webhooks-modal')).not.toBeInTheDocument()
    
    // Click the delete button
    const deleteButton = getByTestId('delete-all-btn')
    await user.click(deleteButton)
    
    // Modal should be visible
    expect(getByTestId('delete-webhooks-modal')).toBeInTheDocument()
  })

  it('should close modal when modal close is triggered', async () => {
    const initialState = {
      webhookReducer: {
        selected: {
          'webhook1': { id: 'webhook1', url: 'https://example.com/1' }
        }
      }
    }

    const { getByTestId, queryByTestId } = renderWithProviders(<DeleteAllBtn />, { initialState })
    
    // Open modal
    const deleteButton = getByTestId('delete-all-btn')
    await user.click(deleteButton)
    expect(getByTestId('delete-webhooks-modal')).toBeInTheDocument()
    
    // Close modal
    const closeButton = getByTestId('delete-webhooks-modal').querySelector('button')
    await user.click(closeButton)
    
    // Modal should be closed
    expect(queryByTestId('delete-webhooks-modal')).not.toBeInTheDocument()
  })

  it('should display correct count for single webhook', () => {
    const initialState = {
      webhookReducer: {
        selected: {
          'webhook1': { id: 'webhook1', url: 'https://example.com/1' }
        }
      }
    }

    const { getByTestId } = renderWithProviders(<DeleteAllBtn />, { initialState })
    
    expect(getByTestId('delete-all-btn')).toHaveTextContent('Delete 1 Webhooks?')
  })

  it('should display correct count for multiple webhooks', () => {
    const initialState = {
      webhookReducer: {
        selected: {
          'webhook1': { id: 'webhook1' },
          'webhook2': { id: 'webhook2' },
          'webhook3': { id: 'webhook3' },
          'webhook4': { id: 'webhook4' },
          'webhook5': { id: 'webhook5' }
        }
      }
    }

    const { getByTestId } = renderWithProviders(<DeleteAllBtn />, { initialState })
    
    expect(getByTestId('delete-all-btn')).toHaveTextContent('Delete 5 Webhooks?')
  })

  it('should update visibility when selection changes', () => {
    const initialState = {
      webhookReducer: {
        selected: {}
      }
    }

    const { getByTestId, store } = renderWithProviders(<DeleteAllBtn />, { initialState })
    
    // Initially invisible
    expect(getByTestId('delete-all-btn')).toHaveStyle({ visibility: 'hidden' })
    
    // Add a selection
    store.dispatch({
      type: 'webhook/markWebhooks',
      payload: { 'webhook1': { id: 'webhook1' } }
    })
    
    // Should become visible
    expect(getByTestId('delete-all-btn')).not.toHaveStyle({ visibility: 'hidden' })
  })

  it('should handle rapid open/close interactions', async () => {
    const initialState = {
      webhookReducer: {
        selected: {
          'webhook1': { id: 'webhook1' }
        }
      }
    }

    const { getByTestId, queryByTestId } = renderWithProviders(<DeleteAllBtn />, { initialState })
    
    const deleteButton = getByTestId('delete-all-btn')
    
    // Rapid open/close
    await user.click(deleteButton)
    expect(getByTestId('delete-webhooks-modal')).toBeInTheDocument()
    
    const closeButton = getByTestId('delete-webhooks-modal').querySelector('button')
    await user.click(closeButton)
    expect(queryByTestId('delete-webhooks-modal')).not.toBeInTheDocument()
    
    // Open again
    await user.click(deleteButton)
    expect(getByTestId('delete-webhooks-modal')).toBeInTheDocument()
  })

  it('should maintain button style when invisible', () => {
    const initialState = {
      webhookReducer: {
        selected: {}
      }
    }

    const { getByTestId } = renderWithProviders(<DeleteAllBtn />, { initialState })
    
    const button = getByTestId('delete-all-btn')
    expect(button).toHaveStyle({ visibility: 'hidden' })
    expect(button).toHaveTextContent('Delete 0 Webhooks?')
  })

  it('should work with complex webhook objects', () => {
    const initialState = {
      webhookReducer: {
        selected: {
          'complex1': {
            id: 'complex1',
            url: 'https://example.com/webhook1',
            event: 'confirmed-tx',
            address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            metadata: { created: '2024-01-01' }
          },
          'complex2': {
            id: 'complex2', 
            url: 'https://example.com/webhook2',
            event: 'unconfirmed-tx',
            address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
          }
        }
      }
    }

    const { getByTestId } = renderWithProviders(<DeleteAllBtn />, { initialState })
    
    expect(getByTestId('delete-all-btn')).toHaveTextContent('Delete 2 Webhooks?')
    expect(getByTestId('delete-all-btn')).not.toHaveStyle({ visibility: 'hidden' })
  })
})