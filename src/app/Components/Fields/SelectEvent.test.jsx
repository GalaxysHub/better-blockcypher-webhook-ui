import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../../test/test-utils'
import SelectEvent from './SelectEvent'

describe('SelectEvent', () => {
  const mockHandleChange = vi.fn()
  
  const defaultProps = {
    value: '',
    handleChange: mockHandleChange,
    error: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with default placeholder', () => {
    const { getByTestId, getByText } = renderWithProviders(
      <SelectEvent {...defaultProps} />
    )
    
    expect(getByTestId('event-type-select')).toBeInTheDocument()
    expect(getByText('Event Type')).toBeInTheDocument()
  })

  it('should display error state when error prop is true', () => {
    const { getByText } = renderWithProviders(
      <SelectEvent {...defaultProps} error={true} />
    )
    
    expect(getByText('Select a Event Type')).toBeInTheDocument()
  })

  it('should not display error message when error prop is false', () => {
    const { queryByText } = renderWithProviders(
      <SelectEvent {...defaultProps} error={false} />
    )
    
    expect(queryByText('Select a Event Type')).not.toBeInTheDocument()
  })

  it('should display selected value', () => {
    const { getByTestId } = renderWithProviders(
      <SelectEvent {...defaultProps} value="confirmed-tx" />
    )
    
    const select = getByTestId('event-type-select')
    expect(select).toHaveValue('confirmed-tx')
  })

  it('should call handleChange when option is selected', () => {
    const { getByTestId } = renderWithProviders(
      <SelectEvent {...defaultProps} />
    )
    
    const select = getByTestId('event-type-select')
    fireEvent.change(select, { target: { value: 'unconfirmed-tx' } })
    
    expect(mockHandleChange).toHaveBeenCalledTimes(1)
  })

  it('should render all event type options', () => {
    const { getByTestId, getByRole } = renderWithProviders(
      <SelectEvent {...defaultProps} />
    )
    
    // Click to open the select
    const select = getByTestId('event-type-select')
    fireEvent.mouseDown(select)
    
    // Check that options are available
    const options = [
      'Unconfirmed Transaction',
      'New Block', 
      'Confirmed Transaction',
      'Transaction Confirmation',
      'Double Spent Transaction',
      'Transaction Confidence'
    ]
    
    options.forEach(optionText => {
      expect(getByRole('option', { name: optionText })).toBeInTheDocument()
    })
  })

  it('should have placeholder option disabled', () => {
    const { getByTestId, getByRole } = renderWithProviders(
      <SelectEvent {...defaultProps} />
    )
    
    // Click to open the select
    const select = getByTestId('event-type-select')
    fireEvent.mouseDown(select)
    
    // Check placeholder option is disabled
    const placeholderOption = getByRole('option', { name: 'Select Event Type' })
    expect(placeholderOption).toHaveAttribute('aria-disabled', 'true')
  })

  it('should handle different event types', () => {
    const eventTypes = [
      'unconfirmed-tx',
      'new-block', 
      'confirmed-tx',
      'tx-confirmation',
      'double-spend-tx',
      'tx-confidence'
    ]
    
    eventTypes.forEach(eventType => {
      const { getByTestId } = renderWithProviders(
        <SelectEvent {...defaultProps} value={eventType} />
      )
      
      const select = getByTestId('event-type-select')
      expect(select).toHaveValue(eventType)
    })
  })

  it('should have proper accessibility attributes', () => {
    const { getByTestId, getByLabelText } = renderWithProviders(
      <SelectEvent {...defaultProps} />
    )
    
    expect(getByLabelText('Event Type')).toBeInTheDocument()
    expect(getByTestId('event-type-select')).toHaveAttribute('aria-describedby')
  })

  it('should maintain controlled component behavior', () => {
    const { getByTestId, rerender } = renderWithProviders(
      <SelectEvent {...defaultProps} value="confirmed-tx" />
    )
    
    let select = getByTestId('event-type-select')
    expect(select).toHaveValue('confirmed-tx')
    
    // Update value prop
    rerender(
      <SelectEvent {...defaultProps} value="unconfirmed-tx" />
    )
    
    select = getByTestId('event-type-select')
    expect(select).toHaveValue('unconfirmed-tx')
  })

  it('should handle empty value', () => {
    const { getByTestId } = renderWithProviders(
      <SelectEvent {...defaultProps} value="" />
    )
    
    const select = getByTestId('event-type-select')
    expect(select).toHaveValue('')
  })

  it('should work with form validation', () => {
    const { getByTestId, getByText } = renderWithProviders(
      <SelectEvent value="" handleChange={mockHandleChange} error={true} />
    )
    
    expect(getByTestId('event-type-select')).toBeInTheDocument()
    expect(getByText('Select a Event Type')).toBeInTheDocument()
    
    // Should have error styling
    const formControl = getByTestId('event-type-select').closest('.MuiFormControl-root')
    expect(formControl).toHaveClass('Mui-error')
  })
})