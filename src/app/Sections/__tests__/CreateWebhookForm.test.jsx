import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, mockReactToastify } from '../../test/test-utils'
import CreateWebhookForm from './CreateWebhookForm'

// Mock the API
vi.mock('APIs/blockcypherWebhooks', () => ({
  createWebhook: vi.fn()
}))

// Mock the validation utility
vi.mock('utils/isValidAddr', () => ({
  isValidAddr: vi.fn()
}))

// Mock child components
vi.mock('./Modals/InvalidAddressModal', () => ({
  default: ({ open, setOpen, cb }) => 
    open ? (
      <div data-testid="invalid-address-modal">
        <button onClick={() => setOpen(false)}>Cancel</button>
        <button onClick={(e) => cb(e)}>Continue</button>
      </div>
    ) : null
}))

// Mock react-toastify
mockReactToastify()

describe('CreateWebhookForm', () => {
  const user = userEvent.setup()
  
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render form with initial state', () => {
    const { getByTestId } = renderWithProviders(<CreateWebhookForm />)
    
    expect(getByTestId('create-webhook-form')).toBeInTheDocument()
    expect(getByTestId('event-type-select')).toBeInTheDocument()
  })

  it('should show URL field when event type is selected', async () => {
    const { getByTestId } = renderWithProviders(<CreateWebhookForm />)
    
    // Select an event type
    const eventSelect = getByTestId('event-type-select')
    await user.click(eventSelect)
    
    fireEvent.change(eventSelect, { target: { value: 'new-block' } })
    
    await waitFor(() => {
      expect(getByTestId('webhook-url-input')).toBeInTheDocument()
    })
  })

  it('should show address field for address-required events', async () => {
    const { getByTestId } = renderWithProviders(<CreateWebhookForm />)
    
    // Select an event type that requires address
    const eventSelect = getByTestId('event-type-select')
    fireEvent.change(eventSelect, { target: { value: 'confirmed-tx' } })
    
    await waitFor(() => {
      expect(getByTestId('webhook-url-input')).toBeInTheDocument()
      expect(getByTestId('webhook-address-input')).toBeInTheDocument()
    })
  })

  it('should not show address field for events that don\'t require address', async () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<CreateWebhookForm />)
    
    // Select an event type that doesn't require address
    const eventSelect = getByTestId('event-type-select')
    fireEvent.change(eventSelect, { target: { value: 'new-block' } })
    
    await waitFor(() => {
      expect(getByTestId('webhook-url-input')).toBeInTheDocument()
      expect(queryByTestId('webhook-address-input')).not.toBeInTheDocument()
    })
  })

  it('should validate required fields before submission', async () => {
    const { getByTestId } = renderWithProviders(<CreateWebhookForm />)
    
    const submitButton = getByTestId('create-webhook-btn')
    await user.click(submitButton)
    
    // Should show validation error message
    expect(getByTestId('create-webhook-form')).toBeInTheDocument()
  })

  it('should call createWebhook API on valid form submission', async () => {
    const { createWebhook } = await import('APIs/blockcypherWebhooks')
    const { isValidAddr } = await import('utils/isValidAddr')
    
    createWebhook.mockResolvedValue({ data: { id: 'new-webhook-123' } })
    isValidAddr.mockReturnValue(true)
    
    const { getByTestId } = renderWithProviders(<CreateWebhookForm />)
    
    // Fill out the form
    const eventSelect = getByTestId('event-type-select')
    fireEvent.change(eventSelect, { target: { value: 'new-block' } })
    
    await waitFor(() => {
      const urlInput = getByTestId('webhook-url-input')
      fireEvent.change(urlInput, { target: { value: 'https://example.com/webhook' } })
    })
    
    const submitButton = getByTestId('create-webhook-btn')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(createWebhook).toHaveBeenCalledWith({
        addr: '',
        targetURL: 'https://example.com/webhook',
        coin: 'BCY',
        event: 'new-block'
      })
    })
  })

  it('should show invalid address modal for invalid addresses', async () => {
    const { isValidAddr } = await import('utils/isValidAddr')
    isValidAddr.mockReturnValue(new Error('Invalid address'))
    
    const { getByTestId } = renderWithProviders(<CreateWebhookForm />)
    
    // Fill out form with address-required event
    const eventSelect = getByTestId('event-type-select')
    fireEvent.change(eventSelect, { target: { value: 'confirmed-tx' } })
    
    await waitFor(() => {
      const urlInput = getByTestId('webhook-url-input')
      const addressInput = getByTestId('webhook-address-input')
      
      fireEvent.change(urlInput, { target: { value: 'https://example.com/webhook' } })
      fireEvent.change(addressInput, { target: { value: 'invalid-address' } })
    })
    
    const submitButton = getByTestId('create-webhook-btn')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(getByTestId('invalid-address-modal')).toBeInTheDocument()
    })
  })

  it('should proceed with invalid address when user confirms', async () => {
    const { createWebhook } = await import('APIs/blockcypherWebhooks')
    const { isValidAddr } = await import('utils/isValidAddr')
    
    isValidAddr.mockReturnValue(new Error('Invalid address'))
    createWebhook.mockResolvedValue({ data: { id: 'new-webhook-123' } })
    
    const { getByTestId } = renderWithProviders(<CreateWebhookForm />)
    
    // Fill out form
    const eventSelect = getByTestId('event-type-select')
    fireEvent.change(eventSelect, { target: { value: 'confirmed-tx' } })
    
    await waitFor(() => {
      const urlInput = getByTestId('webhook-url-input')
      const addressInput = getByTestId('webhook-address-input')
      
      fireEvent.change(urlInput, { target: { value: 'https://example.com/webhook' } })
      fireEvent.change(addressInput, { target: { value: 'invalid-address' } })
    })
    
    // Submit form (should show modal)
    const submitButton = getByTestId('create-webhook-btn')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(getByTestId('invalid-address-modal')).toBeInTheDocument()
    })
    
    // Confirm in modal
    const continueButton = getByTestId('invalid-address-modal').querySelector('button:last-child')
    await user.click(continueButton)
    
    await waitFor(() => {
      expect(createWebhook).toHaveBeenCalled()
    })
  })

  it('should show loading state during form submission', async () => {
    const { createWebhook } = await import('APIs/blockcypherWebhooks')
    
    // Make API call take some time
    createWebhook.mockImplementation(() => new Promise(resolve => 
      setTimeout(() => resolve({ data: { id: 'test' } }), 100)
    ))
    
    const { getByTestId, queryByTestId } = renderWithProviders(<CreateWebhookForm />)
    
    // Fill and submit form
    const eventSelect = getByTestId('event-type-select')
    fireEvent.change(eventSelect, { target: { value: 'new-block' } })
    
    await waitFor(() => {
      const urlInput = getByTestId('webhook-url-input')
      fireEvent.change(urlInput, { target: { value: 'https://example.com/webhook' } })
    })
    
    const submitButton = getByTestId('create-webhook-btn')
    await user.click(submitButton)
    
    // Should show loading state temporarily
    expect(queryByTestId('create-webhook-btn')).not.toBeInTheDocument()
  })

  it('should clear form after successful submission', async () => {
    const { createWebhook } = await import('APIs/blockcypherWebhooks')
    const { toast } = await import('react-toastify')
    
    createWebhook.mockResolvedValue({ data: { id: 'new-webhook-123' } })
    
    const { getByTestId } = renderWithProviders(<CreateWebhookForm />)
    
    // Fill and submit form
    const eventSelect = getByTestId('event-type-select')
    fireEvent.change(eventSelect, { target: { value: 'new-block' } })
    
    await waitFor(() => {
      const urlInput = getByTestId('webhook-url-input')
      fireEvent.change(urlInput, { target: { value: 'https://example.com/webhook' } })
    })
    
    const submitButton = getByTestId('create-webhook-btn')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(createWebhook).toHaveBeenCalled()
      expect(toast).toHaveBeenCalledWith(
        'new-block webhook created successfully',
        expect.objectContaining({ type: 'success' })
      )
    })
    
    // Form should be cleared
    expect(eventSelect).toHaveValue('')
  })

  it('should handle API errors gracefully', async () => {
    const { createWebhook } = await import('APIs/blockcypherWebhooks')
    
    createWebhook.mockRejectedValue(new Error('API Error'))
    
    const { getByTestId } = renderWithProviders(<CreateWebhookForm />)
    
    // Fill and submit form
    const eventSelect = getByTestId('event-type-select')
    fireEvent.change(eventSelect, { target: { value: 'new-block' } })
    
    await waitFor(() => {
      const urlInput = getByTestId('webhook-url-input')
      fireEvent.change(urlInput, { target: { value: 'https://example.com/webhook' } })
    })
    
    const submitButton = getByTestId('create-webhook-btn')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(createWebhook).toHaveBeenCalled()
    })
    
    // Should show error message
    expect(getByTestId('create-webhook-form')).toBeInTheDocument()
  })
})