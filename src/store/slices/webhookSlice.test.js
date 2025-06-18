import { describe, it, expect } from 'vitest'
import webhookReducer, {
  setWebhookData,
  removeWebhookById,
  addWebhookData,
  markWebhooks
} from './webhookSlice'

describe('webhookSlice', () => {
  const initialState = {
    BTC: { fetched: false, data: {} },
    BTCt: { fetched: false, data: {} },
    BCY: { fetched: false, data: {} },
    LTC: { fetched: false, data: {} },
    DOGE: { fetched: false, data: {} },
    DASH: { fetched: false, data: {} },
    ETH: { fetched: false, data: {} },
    bETH: { fetched: false, data: {} },
    selected: {}
  }

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(webhookReducer(undefined, { type: undefined })).toEqual(initialState)
    })
  })

  describe('setWebhookData', () => {
    it('should set webhook data for a specific coin', () => {
      const mockWebhookData = {
        'webhook1': { id: 'webhook1', url: 'https://example.com/webhook1' },
        'webhook2': { id: 'webhook2', url: 'https://example.com/webhook2' }
      }

      const action = setWebhookData({ coin: 'BTC', data: mockWebhookData })
      const state = webhookReducer(initialState, action)

      expect(state.BTC.fetched).toBe(true)
      expect(state.BTC.data).toEqual(mockWebhookData)
      expect(state.LTC.fetched).toBe(false) // Other coins should not be affected
    })

    it('should overwrite existing webhook data', () => {
      const existingState = {
        ...initialState,
        BTC: {
          fetched: true,
          data: { 'old1': { id: 'old1', url: 'https://old.com' } }
        }
      }

      const newData = { 'new1': { id: 'new1', url: 'https://new.com' } }
      const action = setWebhookData({ coin: 'BTC', data: newData })
      const state = webhookReducer(existingState, action)

      expect(state.BTC.data).toEqual(newData)
      expect(state.BTC.data).not.toHaveProperty('old1')
    })
  })

  describe('addWebhookData', () => {
    it('should add a new webhook to existing data', () => {
      const existingState = {
        ...initialState,
        BTC: {
          fetched: true,
          data: { 'webhook1': { id: 'webhook1', url: 'https://example.com/1' } }
        }
      }

      const newWebhook = { id: 'webhook2', url: 'https://example.com/2' }
      const action = addWebhookData({ coin: 'BTC', data: newWebhook })
      const state = webhookReducer(existingState, action)

      expect(state.BTC.data).toEqual({
        'webhook1': { id: 'webhook1', url: 'https://example.com/1' },
        'webhook2': { id: 'webhook2', url: 'https://example.com/2' }
      })
    })

    it('should add webhook to empty data', () => {
      const newWebhook = { id: 'first', url: 'https://example.com/first' }
      const action = addWebhookData({ coin: 'LTC', data: newWebhook })
      const state = webhookReducer(initialState, action)

      expect(state.LTC.data).toEqual({
        'first': { id: 'first', url: 'https://example.com/first' }
      })
    })
  })

  describe('removeWebhookById', () => {
    it('should remove webhook from data and selected', () => {
      const existingState = {
        ...initialState,
        BTC: {
          fetched: true,
          data: {
            'webhook1': { id: 'webhook1', url: 'https://example.com/1' },
            'webhook2': { id: 'webhook2', url: 'https://example.com/2' }
          }
        },
        selected: {
          'webhook1': { id: 'webhook1', url: 'https://example.com/1' }
        }
      }

      const action = removeWebhookById({ coin: 'BTC', id: 'webhook1' })
      const state = webhookReducer(existingState, action)

      expect(state.BTC.data).toEqual({
        'webhook2': { id: 'webhook2', url: 'https://example.com/2' }
      })
      expect(state.selected).toEqual({})
    })

    it('should handle removing non-existent webhook', () => {
      const existingState = {
        ...initialState,
        BTC: {
          fetched: true,
          data: { 'webhook1': { id: 'webhook1', url: 'https://example.com/1' } }
        }
      }

      const action = removeWebhookById({ coin: 'BTC', id: 'nonexistent' })
      const state = webhookReducer(existingState, action)

      expect(state.BTC.data).toEqual({
        'webhook1': { id: 'webhook1', url: 'https://example.com/1' }
      })
    })
  })

  describe('markWebhooks', () => {
    it('should add webhooks to selected when marked as true', () => {
      const webhooksToMark = {
        'webhook1': { id: 'webhook1', url: 'https://example.com/1' },
        'webhook2': { id: 'webhook2', url: 'https://example.com/2' }
      }

      const action = markWebhooks(webhooksToMark)
      const state = webhookReducer(initialState, action)

      expect(state.selected).toEqual(webhooksToMark)
    })

    it('should remove webhooks from selected when marked as false', () => {
      const existingState = {
        ...initialState,
        selected: {
          'webhook1': { id: 'webhook1', url: 'https://example.com/1' },
          'webhook2': { id: 'webhook2', url: 'https://example.com/2' }
        }
      }

      const action = markWebhooks({ 'webhook1': false })
      const state = webhookReducer(existingState, action)

      expect(state.selected).toEqual({
        'webhook2': { id: 'webhook2', url: 'https://example.com/2' }
      })
    })

    it('should handle mixed true/false selections', () => {
      const existingState = {
        ...initialState,
        selected: {
          'webhook1': { id: 'webhook1', url: 'https://example.com/1' }
        }
      }

      const action = markWebhooks({
        'webhook1': false,
        'webhook2': { id: 'webhook2', url: 'https://example.com/2' },
        'webhook3': { id: 'webhook3', url: 'https://example.com/3' }
      })
      const state = webhookReducer(existingState, action)

      expect(state.selected).toEqual({
        'webhook2': { id: 'webhook2', url: 'https://example.com/2' },
        'webhook3': { id: 'webhook3', url: 'https://example.com/3' }
      })
    })

    it('should handle empty selection object', () => {
      const existingState = {
        ...initialState,
        selected: { 'webhook1': { id: 'webhook1' } }
      }

      const action = markWebhooks({})
      const state = webhookReducer(existingState, action)

      expect(state.selected).toEqual({ 'webhook1': { id: 'webhook1' } })
    })
  })

  describe('state immutability', () => {
    it('should not mutate the original state', () => {
      const originalState = { ...initialState }
      const action = setWebhookData({ coin: 'BTC', data: { test: 'data' } })
      
      webhookReducer(initialState, action)
      
      expect(initialState).toEqual(originalState)
    })
  })
})