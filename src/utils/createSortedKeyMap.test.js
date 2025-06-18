import { describe, it, expect } from 'vitest'
import { createSortedKeyMap } from './createSortedKeyMap'

describe('createSortedKeyMap', () => {
  const mockData = {
    'webhook1': { id: 'webhook1', created_at: '2024-01-03T10:00:00Z', event: 'confirmed-tx' },
    'webhook2': { id: 'webhook2', created_at: '2024-01-01T10:00:00Z', event: 'unconfirmed-tx' },
    'webhook3': { id: 'webhook3', created_at: '2024-01-02T10:00:00Z', event: 'new-block' }
  }

  describe('ascending order (default)', () => {
    it('should sort data by created_at in ascending order', () => {
      const result = createSortedKeyMap(mockData, 'created_at')
      
      const keys = Object.keys(result)
      expect(keys).toEqual(['webhook2', 'webhook3', 'webhook1'])
      
      // Verify the complete sorted object
      expect(result).toEqual({
        'webhook2': { id: 'webhook2', created_at: '2024-01-01T10:00:00Z', event: 'unconfirmed-tx' },
        'webhook3': { id: 'webhook3', created_at: '2024-01-02T10:00:00Z', event: 'new-block' },
        'webhook1': { id: 'webhook1', created_at: '2024-01-03T10:00:00Z', event: 'confirmed-tx' }
      })
    })

    it('should sort by event type in ascending order', () => {
      const result = createSortedKeyMap(mockData, 'event')
      
      const keys = Object.keys(result)
      // Should be sorted alphabetically: confirmed-tx, new-block, unconfirmed-tx
      expect(keys).toEqual(['webhook1', 'webhook3', 'webhook2'])
    })
  })

  describe('descending order', () => {
    it('should sort data by created_at in descending order', () => {
      const result = createSortedKeyMap(mockData, 'created_at', 'desc')
      
      const keys = Object.keys(result)
      expect(keys).toEqual(['webhook1', 'webhook3', 'webhook2'])
    })

    it('should sort by event type in descending order', () => {
      const result = createSortedKeyMap(mockData, 'event', 'desc')
      
      const keys = Object.keys(result)
      // Should be sorted reverse alphabetically: unconfirmed-tx, new-block, confirmed-tx
      expect(keys).toEqual(['webhook2', 'webhook3', 'webhook1'])
    })
  })

  describe('edge cases', () => {
    it('should handle empty data object', () => {
      const result = createSortedKeyMap({}, 'created_at')
      expect(result).toEqual({})
    })

    it('should handle single item', () => {
      const singleData = {
        'webhook1': { id: 'webhook1', created_at: '2024-01-01T10:00:00Z', event: 'confirmed-tx' }
      }
      
      const result = createSortedKeyMap(singleData, 'created_at')
      expect(result).toEqual(singleData)
    })

    it('should handle numeric values for sorting', () => {
      const numericData = {
        'item1': { id: 'item1', priority: 3 },
        'item2': { id: 'item2', priority: 1 },
        'item3': { id: 'item3', priority: 2 }
      }
      
      const result = createSortedKeyMap(numericData, 'priority')
      const keys = Object.keys(result)
      expect(keys).toEqual(['item2', 'item3', 'item1'])
    })

    it('should handle identical sort values', () => {
      const identicalData = {
        'webhook1': { id: 'webhook1', created_at: '2024-01-01T10:00:00Z' },
        'webhook2': { id: 'webhook2', created_at: '2024-01-01T10:00:00Z' },
        'webhook3': { id: 'webhook3', created_at: '2024-01-01T10:00:00Z' }
      }
      
      const result = createSortedKeyMap(identicalData, 'created_at')
      
      // Should maintain some consistent order (based on the increment counter)
      expect(Object.keys(result)).toHaveLength(3)
      expect(result).toHaveProperty('webhook1')
      expect(result).toHaveProperty('webhook2')
      expect(result).toHaveProperty('webhook3')
    })

    it('should handle missing sort parameter', () => {
      const dataWithMissing = {
        'webhook1': { id: 'webhook1', created_at: '2024-01-01T10:00:00Z' },
        'webhook2': { id: 'webhook2' }, // missing created_at
        'webhook3': { id: 'webhook3', created_at: '2024-01-03T10:00:00Z' }
      }
      
      // Should handle undefined values in sorting
      const result = createSortedKeyMap(dataWithMissing, 'created_at')
      expect(Object.keys(result)).toHaveLength(3)
    })
  })

  describe('data integrity', () => {
    it('should preserve original data structure', () => {
      const originalData = {
        'webhook1': { 
          id: 'webhook1', 
          created_at: '2024-01-01T10:00:00Z',
          metadata: { active: true, tags: ['important'] }
        }
      }
      
      const result = createSortedKeyMap(originalData, 'created_at')
      
      expect(result['webhook1']).toEqual(originalData['webhook1'])
      expect(result['webhook1'].metadata).toEqual({ active: true, tags: ['important'] })
    })

    it('should not modify original data', () => {
      const originalData = { ...mockData }
      const originalDataCopy = JSON.parse(JSON.stringify(mockData))
      
      createSortedKeyMap(originalData, 'created_at')
      
      expect(originalData).toEqual(originalDataCopy)
    })
  })
})