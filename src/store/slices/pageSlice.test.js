import { describe, it, expect } from 'vitest'
import pageReducer, { setItemsPerPage, setPageNum, setActiveCoin } from './pageSlice'

describe('pageSlice', () => {
  const initialState = {
    itemsPerPage: 10,
    pageNum: 1,
    activeCoin: "BCY"
  }

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(pageReducer(undefined, { type: undefined })).toEqual(initialState)
    })

    it('should have correct default values', () => {
      const state = pageReducer(undefined, { type: undefined })
      expect(state.itemsPerPage).toBe(10)
      expect(state.pageNum).toBe(1)
      expect(state.activeCoin).toBe("BCY")
    })
  })

  describe('setItemsPerPage', () => {
    it('should update itemsPerPage', () => {
      const action = setItemsPerPage(25)
      const state = pageReducer(initialState, action)
      expect(state.itemsPerPage).toBe(25)
      expect(state.pageNum).toBe(1) // Other values should remain unchanged
      expect(state.activeCoin).toBe("BCY")
    })

    it('should handle different valid page sizes', () => {
      const testValues = [5, 10, 25, 50, 100, 200, 99999]
      
      testValues.forEach(value => {
        const action = setItemsPerPage(value)
        const state = pageReducer(initialState, action)
        expect(state.itemsPerPage).toBe(value)
      })
    })

    it('should handle string numbers', () => {
      const action = setItemsPerPage("50")
      const state = pageReducer(initialState, action)
      expect(state.itemsPerPage).toBe("50")
    })

    it('should handle zero value', () => {
      const action = setItemsPerPage(0)
      const state = pageReducer(initialState, action)
      expect(state.itemsPerPage).toBe(0)
    })
  })

  describe('setPageNum', () => {
    it('should update pageNum', () => {
      const action = setPageNum(3)
      const state = pageReducer(initialState, action)
      expect(state.pageNum).toBe(3)
      expect(state.itemsPerPage).toBe(10) // Other values should remain unchanged
      expect(state.activeCoin).toBe("BCY")
    })

    it('should handle page 1', () => {
      const modifiedState = { ...initialState, pageNum: 5 }
      const action = setPageNum(1)
      const state = pageReducer(modifiedState, action)
      expect(state.pageNum).toBe(1)
    })

    it('should handle large page numbers', () => {
      const action = setPageNum(999)
      const state = pageReducer(initialState, action)
      expect(state.pageNum).toBe(999)
    })

    it('should handle string page numbers', () => {
      const action = setPageNum("5")
      const state = pageReducer(initialState, action)
      expect(state.pageNum).toBe("5")
    })
  })

  describe('setActiveCoin', () => {
    it('should update activeCoin', () => {
      const action = setActiveCoin("BTC")
      const state = pageReducer(initialState, action)
      expect(state.activeCoin).toBe("BTC")
      expect(state.itemsPerPage).toBe(10) // Other values should remain unchanged
      expect(state.pageNum).toBe(1)
    })

    it('should handle different coin types', () => {
      const coins = ["BTC", "BTCt", "LTC", "DOGE", "DASH", "ETH", "bETH", "BCY"]
      
      coins.forEach(coin => {
        const action = setActiveCoin(coin)
        const state = pageReducer(initialState, action)
        expect(state.activeCoin).toBe(coin)
      })
    })

    it('should handle lowercase coin names', () => {
      const action = setActiveCoin("btc")
      const state = pageReducer(initialState, action)
      expect(state.activeCoin).toBe("btc")
    })

    it('should handle empty string', () => {
      const action = setActiveCoin("")
      const state = pageReducer(initialState, action)
      expect(state.activeCoin).toBe("")
    })

    it('should handle null/undefined values', () => {
      const nullAction = setActiveCoin(null)
      const nullState = pageReducer(initialState, nullAction)
      expect(nullState.activeCoin).toBe(null)

      const undefinedAction = setActiveCoin(undefined)
      const undefinedState = pageReducer(initialState, undefinedAction)
      expect(undefinedState.activeCoin).toBe(undefined)
    })
  })

  describe('combined actions', () => {
    it('should handle multiple actions in sequence', () => {
      let state = pageReducer(initialState, setActiveCoin("BTC"))
      expect(state.activeCoin).toBe("BTC")
      
      state = pageReducer(state, setItemsPerPage(50))
      expect(state.itemsPerPage).toBe(50)
      expect(state.activeCoin).toBe("BTC") // Should preserve previous change
      
      state = pageReducer(state, setPageNum(3))
      expect(state.pageNum).toBe(3)
      expect(state.itemsPerPage).toBe(50) // Should preserve previous changes
      expect(state.activeCoin).toBe("BTC")
    })

    it('should handle resetting page number when changing items per page (typical workflow)', () => {
      // Start with modified state
      const modifiedState = { ...initialState, pageNum: 5, itemsPerPage: 10 }
      
      // Change items per page
      let state = pageReducer(modifiedState, setItemsPerPage(25))
      expect(state.itemsPerPage).toBe(25)
      expect(state.pageNum).toBe(5) // Page number doesn't auto-reset in reducer
      
      // Manually reset page number (as would be done in component)
      state = pageReducer(state, setPageNum(1))
      expect(state.pageNum).toBe(1)
      expect(state.itemsPerPage).toBe(25)
    })
  })

  describe('state immutability', () => {
    it('should not mutate the original state', () => {
      const originalState = { ...initialState }
      
      pageReducer(initialState, setActiveCoin("BTC"))
      pageReducer(initialState, setItemsPerPage(50))
      pageReducer(initialState, setPageNum(3))
      
      expect(initialState).toEqual(originalState)
    })

    it('should create new state objects', () => {
      const state1 = pageReducer(initialState, setActiveCoin("BTC"))
      const state2 = pageReducer(state1, setItemsPerPage(50))
      
      expect(state1).not.toBe(initialState)
      expect(state2).not.toBe(state1)
      expect(state2).not.toBe(initialState)
    })
  })

  describe('edge cases', () => {
    it('should handle undefined actions gracefully', () => {
      const state = pageReducer(initialState, { type: 'UNKNOWN_ACTION' })
      expect(state).toEqual(initialState)
    })

    it('should preserve state when receiving unknown action', () => {
      const modifiedState = { ...initialState, pageNum: 5, activeCoin: "BTC" }
      const state = pageReducer(modifiedState, { type: 'UNKNOWN_ACTION' })
      expect(state).toEqual(modifiedState)
    })
  })
})