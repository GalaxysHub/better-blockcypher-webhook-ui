import { describe, it, expect } from 'vitest'
import tokenReducer, { setTokenDets } from './tokenSlice'

describe('tokenSlice', () => {
  const initialState = {
    fetched: false,
    limits: {
      "api/day": 2000,
      "api/hour": 200,
      "api/second": 3,
      "confidence/hour": 15,
      "hooks": 200,
      "hooks/hour": 200
    }
  }

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(tokenReducer(undefined, { type: undefined })).toEqual(initialState)
    })

    it('should have fetched as false initially', () => {
      const state = tokenReducer(undefined, { type: undefined })
      expect(state.fetched).toBe(false)
    })

    it('should have default limits', () => {
      const state = tokenReducer(undefined, { type: undefined })
      
      expect(state.limits).toEqual({
        "api/day": 2000,
        "api/hour": 200,
        "api/second": 3,
        "confidence/hour": 15,
        "hooks": 200,
        "hooks/hour": 200
      })
    })
  })

  describe('setTokenDets', () => {
    it('should set fetched to true and merge token data', () => {
      const tokenData = {
        token: 'abc123',
        used: 50,
        remaining: 150
      }

      const action = setTokenDets(tokenData)
      const state = tokenReducer(initialState, action)

      expect(state.fetched).toBe(true)
      expect(state.token).toBe('abc123')
      expect(state.used).toBe(50)
      expect(state.remaining).toBe(150)
    })

    it('should preserve existing limits when setting token details', () => {
      const tokenData = {
        token: 'test-token',
        used: 25
      }

      const action = setTokenDets(tokenData)
      const state = tokenReducer(initialState, action)

      expect(state.limits).toEqual(initialState.limits)
      expect(state.token).toBe('test-token')
      expect(state.used).toBe(25)
    })

    it('should overwrite existing token data', () => {
      const existingState = {
        ...initialState,
        fetched: true,
        token: 'old-token',
        used: 100
      }

      const newTokenData = {
        token: 'new-token',
        used: 25,
        remaining: 175
      }

      const action = setTokenDets(newTokenData)
      const state = tokenReducer(existingState, action)

      expect(state.fetched).toBe(true)
      expect(state.token).toBe('new-token')
      expect(state.used).toBe(25)
      expect(state.remaining).toBe(175)
    })

    it('should handle partial token data updates', () => {
      const existingState = {
        ...initialState,
        fetched: true,
        token: 'existing-token',
        used: 50,
        remaining: 150
      }

      const partialUpdate = {
        used: 75
      }

      const action = setTokenDets(partialUpdate)
      const state = tokenReducer(existingState, action)

      expect(state.fetched).toBe(true)
      expect(state.token).toBe('existing-token') // Preserved
      expect(state.used).toBe(75) // Updated
      expect(state.remaining).toBe(150) // Preserved
    })

    it('should handle complex token details', () => {
      const complexTokenData = {
        token: 'complex-token-123',
        limits_per_hour: 200,
        limits_per_second: 3,
        limits_per_day: 1000,
        used: 150,
        remaining: 50,
        started: '2024-01-01T00:00:00Z',
        metadata: {
          plan: 'premium',
          expires: '2024-12-31'
        }
      }

      const action = setTokenDets(complexTokenData)
      const state = tokenReducer(initialState, action)

      expect(state.fetched).toBe(true)
      expect(state.token).toBe('complex-token-123')
      expect(state.limits_per_hour).toBe(200)
      expect(state.limits_per_second).toBe(3)
      expect(state.limits_per_day).toBe(1000)
      expect(state.used).toBe(150)
      expect(state.remaining).toBe(50)
      expect(state.started).toBe('2024-01-01T00:00:00Z')
      expect(state.metadata).toEqual({
        plan: 'premium',
        expires: '2024-12-31'
      })
    })

    it('should handle empty token data', () => {
      const action = setTokenDets({})
      const state = tokenReducer(initialState, action)

      expect(state.fetched).toBe(true)
      expect(state.limits).toEqual(initialState.limits) // Preserved
    })

    it('should handle null/undefined values in token data', () => {
      const tokenData = {
        token: null,
        used: undefined,
        remaining: 0
      }

      const action = setTokenDets(tokenData)
      const state = tokenReducer(initialState, action)

      expect(state.fetched).toBe(true)
      expect(state.token).toBe(null)
      expect(state.used).toBe(undefined)
      expect(state.remaining).toBe(0)
    })

    it('should update limits if provided in token data', () => {
      const tokenDataWithLimits = {
        token: 'test-token',
        limits: {
          "api/day": 5000,
          "api/hour": 500,
          "api/second": 5,
          "confidence/hour": 30,
          "hooks": 500,
          "hooks/hour": 500
        }
      }

      const action = setTokenDets(tokenDataWithLimits)
      const state = tokenReducer(initialState, action)

      expect(state.fetched).toBe(true)
      expect(state.token).toBe('test-token')
      expect(state.limits).toEqual(tokenDataWithLimits.limits)
    })
  })

  describe('state immutability', () => {
    it('should not mutate the original state', () => {
      const originalState = { ...initialState }
      const action = setTokenDets({ token: 'test', used: 10 })
      
      tokenReducer(initialState, action)
      
      expect(initialState).toEqual(originalState)
    })

    it('should create new state object', () => {
      const action = setTokenDets({ token: 'test' })
      const newState = tokenReducer(initialState, action)
      
      expect(newState).not.toBe(initialState)
      expect(newState.limits).toBe(initialState.limits) // Object.assign preserves references for unchanged nested objects
    })
  })

  describe('edge cases', () => {
    it('should handle unknown action types', () => {
      const state = tokenReducer(initialState, { type: 'UNKNOWN_ACTION' })
      expect(state).toEqual(initialState)
    })

    it('should handle multiple setTokenDets calls', () => {
      let state = tokenReducer(initialState, setTokenDets({ token: 'first', used: 10 }))
      expect(state.token).toBe('first')
      expect(state.used).toBe(10)
      
      state = tokenReducer(state, setTokenDets({ token: 'second', used: 20 }))
      expect(state.token).toBe('second')
      expect(state.used).toBe(20)
      
      state = tokenReducer(state, setTokenDets({ remaining: 80 }))
      expect(state.token).toBe('second') // Preserved
      expect(state.used).toBe(20) // Preserved
      expect(state.remaining).toBe(80) // New
    })
  })
})