import { describe, it, expect } from 'vitest'
import fieldsReducer, { selectField } from './fieldsSlice'

describe('fieldsSlice', () => {
  const initialState = {
    id: { name: "ID", key: "id", sortable: true, checked: true },
    address: { name: "Address", key: "address", sortable: true, checked: true },
    event: { name: "Event Type", key: "event", sortable: true, checked: true },
    url: { name: "URL", key: "url", sortable: true, checked: false },
    callback_errors: { name: "Callback Errors", key: "callback_errors", sortable: true, checked: false }
  }

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(fieldsReducer(undefined, { type: undefined })).toEqual(initialState)
    })

    it('should have correct field configurations', () => {
      const state = fieldsReducer(undefined, { type: undefined })
      
      // Check that id, address, event are checked by default
      expect(state.id.checked).toBe(true)
      expect(state.address.checked).toBe(true)
      expect(state.event.checked).toBe(true)
      
      // Check that url and callback_errors are unchecked by default
      expect(state.url.checked).toBe(false)
      expect(state.callback_errors.checked).toBe(false)
    })

    it('should have proper field properties', () => {
      const state = fieldsReducer(undefined, { type: undefined })
      
      Object.values(state).forEach(field => {
        expect(field).toHaveProperty('name')
        expect(field).toHaveProperty('key')
        expect(field).toHaveProperty('sortable')
        expect(field).toHaveProperty('checked')
        expect(typeof field.sortable).toBe('boolean')
        expect(typeof field.checked).toBe('boolean')
      })
    })
  })

  describe('selectField', () => {
    it('should toggle field checked state from true to false', () => {
      const action = selectField('id')
      const state = fieldsReducer(initialState, action)
      
      expect(state.id.checked).toBe(false)
      expect(state.address.checked).toBe(true) // Other fields unchanged
    })

    it('should toggle field checked state from false to true', () => {
      const action = selectField('url')
      const state = fieldsReducer(initialState, action)
      
      expect(state.url.checked).toBe(true)
      expect(state.id.checked).toBe(true) // Other fields unchanged
    })

    it('should toggle field multiple times', () => {
      let state = fieldsReducer(initialState, selectField('event'))
      expect(state.event.checked).toBe(false)
      
      state = fieldsReducer(state, selectField('event'))
      expect(state.event.checked).toBe(true)
      
      state = fieldsReducer(state, selectField('event'))
      expect(state.event.checked).toBe(false)
    })

    it('should not affect other field properties', () => {
      const action = selectField('address')
      const state = fieldsReducer(initialState, action)
      
      expect(state.address.name).toBe("Address")
      expect(state.address.key).toBe("address")
      expect(state.address.sortable).toBe(true)
      expect(state.address.checked).toBe(false) // Only this should change
    })

    it('should handle all available fields', () => {
      const fields = ['id', 'address', 'event', 'url', 'callback_errors']
      
      fields.forEach(fieldKey => {
        const originalChecked = initialState[fieldKey].checked
        const action = selectField(fieldKey)
        const state = fieldsReducer(initialState, action)
        
        expect(state[fieldKey].checked).toBe(!originalChecked)
      })
    })

    it('should preserve state immutability', () => {
      const originalState = { ...initialState }
      const action = selectField('id')
      
      fieldsReducer(initialState, action)
      
      expect(initialState).toEqual(originalState)
    })

    it('should handle multiple field selections', () => {
      let state = fieldsReducer(initialState, selectField('url'))
      expect(state.url.checked).toBe(true)
      
      state = fieldsReducer(state, selectField('callback_errors'))
      expect(state.callback_errors.checked).toBe(true)
      expect(state.url.checked).toBe(true) // Previous selection preserved
      
      state = fieldsReducer(state, selectField('id'))
      expect(state.id.checked).toBe(false)
      expect(state.url.checked).toBe(true) // Other selections preserved
      expect(state.callback_errors.checked).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('should handle unknown action types', () => {
      const state = fieldsReducer(initialState, { type: 'UNKNOWN_ACTION' })
      expect(state).toEqual(initialState)
    })

    it('should handle selectField with non-existent field gracefully', () => {
      // This would normally cause an error, but we test the behavior
      expect(() => {
        fieldsReducer(initialState, selectField('nonexistent'))
      }).toThrow()
    })
  })
})