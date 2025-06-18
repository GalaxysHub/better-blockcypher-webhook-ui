import { describe, it, expect, vi } from 'vitest'
import { isValidAddr } from './isValidAddr'

// Mock the config data
vi.mock('_config/coinData.json', () => ({
  CoinData: {
    BTC: {
      addrPrefixes: ['1', '3', 'bc1']
    },
    LTC: {
      addrPrefixes: ['L', 'M', 'ltc1']
    },
    DOGE: {
      addrPrefixes: ['D', '9', 'A']
    }
  }
}))

describe('isValidAddr', () => {
  describe('address prefix validation', () => {
    it('should return error for wrong address prefix', () => {
      const result = isValidAddr('Xinvalid_address_prefix_test_here', 'BTC')
      expect(result).toBeInstanceOf(Error)
      expect(result.message).toBe('Wrong Address Type')
    })

    it('should accept valid BTC address prefix', () => {
      // Using a mock valid address for testing prefix only
      const mockValidAddress = '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
      vi.doMock('bs58', () => ({
        default: {
          decode: vi.fn(() => Buffer.from('0062e907b15cbf27d5425399ebf6f0fb50ebb88f18c29b7d93', 'hex'))
        }
      }))
      
      // For this test, we just want to verify it passes the prefix check
      const result = isValidAddr(mockValidAddress, 'BTC')
      expect(result).not.toBeInstanceOf(Error)
    })
  })

  describe('address length validation', () => {
    it('should return error for address with wrong length', () => {
      const result = isValidAddr('1Short', 'BTC')
      expect(result).toBeInstanceOf(Error)
      expect(result.message).toBe('Invalid Address format')
    })

    it('should return error for empty address', () => {
      const result = isValidAddr('', 'BTC')
      expect(result).toBeInstanceOf(Error)
      expect(result.message).toBe('Wrong Address Type')
    })
  })

  describe('different coin types', () => {
    it('should validate LTC address prefix', () => {
      const result = isValidAddr('Xinvalid', 'LTC')
      expect(result).toBeInstanceOf(Error)
      expect(result.message).toBe('Wrong Address Type')
    })

    it('should validate DOGE address prefix', () => {
      const result = isValidAddr('Xinvalid', 'DOGE')
      expect(result).toBeInstanceOf(Error)
      expect(result.message).toBe('Wrong Address Type')
    })
  })

  describe('edge cases', () => {
    it('should handle undefined address', () => {
      expect(() => isValidAddr(undefined, 'BTC')).toThrow()
    })

    it('should handle null address', () => {
      expect(() => isValidAddr(null, 'BTC')).toThrow()
    })

    it('should handle invalid coin type', () => {
      expect(() => isValidAddr('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', 'INVALID')).toThrow()
    })
  })
})