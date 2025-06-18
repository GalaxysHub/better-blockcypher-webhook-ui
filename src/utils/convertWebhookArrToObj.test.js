import { describe, it, expect } from 'vitest'
import { convertWebhookArrToObj } from './convertWebhookArrToObj'

describe('convertWebhookArrToObj', () => {
  it('should convert array of webhooks to object with id as key', () => {
    const webhookArray = [
      { id: '1', url: 'https://example.com/webhook1', event: 'confirmed-tx' },
      { id: '2', url: 'https://example.com/webhook2', event: 'unconfirmed-tx' },
      { id: '3', url: 'https://example.com/webhook3', event: 'new-block' }
    ]

    const result = convertWebhookArrToObj(webhookArray)

    expect(result).toEqual({
      '1': { id: '1', url: 'https://example.com/webhook1', event: 'confirmed-tx' },
      '2': { id: '2', url: 'https://example.com/webhook2', event: 'unconfirmed-tx' },
      '3': { id: '3', url: 'https://example.com/webhook3', event: 'new-block' }
    })
  })

  it('should handle empty array', () => {
    const result = convertWebhookArrToObj([])
    expect(result).toEqual({})
  })

  it('should handle array with single webhook', () => {
    const webhookArray = [
      { id: 'single', url: 'https://example.com/single', event: 'tx-confirmation' }
    ]

    const result = convertWebhookArrToObj(webhookArray)

    expect(result).toEqual({
      'single': { id: 'single', url: 'https://example.com/single', event: 'tx-confirmation' }
    })
  })

  it('should handle webhooks with complex data structures', () => {
    const webhookArray = [
      {
        id: 'complex1',
        url: 'https://example.com/webhook',
        event: 'confirmed-tx',
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        metadata: { created: '2024-01-01', active: true }
      },
      {
        id: 'complex2',
        url: 'https://example.com/webhook2',
        event: 'unconfirmed-tx',
        address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
        metadata: { created: '2024-01-02', active: false }
      }
    ]

    const result = convertWebhookArrToObj(webhookArray)

    expect(result).toEqual({
      'complex1': {
        id: 'complex1',
        url: 'https://example.com/webhook',
        event: 'confirmed-tx',
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        metadata: { created: '2024-01-01', active: true }
      },
      'complex2': {
        id: 'complex2',
        url: 'https://example.com/webhook2',
        event: 'unconfirmed-tx',
        address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
        metadata: { created: '2024-01-02', active: false }
      }
    })
  })

  it('should handle duplicate ids by overwriting', () => {
    const webhookArray = [
      { id: '1', url: 'https://example.com/first', event: 'confirmed-tx' },
      { id: '1', url: 'https://example.com/second', event: 'unconfirmed-tx' }
    ]

    const result = convertWebhookArrToObj(webhookArray)

    expect(result).toEqual({
      '1': { id: '1', url: 'https://example.com/second', event: 'unconfirmed-tx' }
    })
  })

  it('should handle webhooks with string and number ids', () => {
    const webhookArray = [
      { id: '1', url: 'https://example.com/string-id' },
      { id: 2, url: 'https://example.com/number-id' }
    ]

    const result = convertWebhookArrToObj(webhookArray)

    expect(result).toEqual({
      '1': { id: '1', url: 'https://example.com/string-id' },
      '2': { id: 2, url: 'https://example.com/number-id' }
    })
  })
})