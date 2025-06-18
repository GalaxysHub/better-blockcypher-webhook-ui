import { describe, it, expect } from 'vitest'
import themeReducer, { setDarkTheme, setLightTheme } from './themeSlice'

describe('themeSlice', () => {
  const initialState = {
    mode: "light",
    palette: expect.any(Object),
    header: expect.any(Object)
  }

  describe('initial state', () => {
    it('should return the initial state with light mode', () => {
      const state = themeReducer(undefined, { type: undefined })
      expect(state.mode).toBe("light")
      expect(state).toHaveProperty('palette')
      expect(state).toHaveProperty('header')
    })

    it('should have correct palette structure', () => {
      const state = themeReducer(undefined, { type: undefined })
      
      expect(state.palette).toHaveProperty('primary')
      expect(state.palette).toHaveProperty('secondary')
      expect(state.palette).toHaveProperty('text')
      expect(state.palette).toHaveProperty('page')
      expect(state.palette).toHaveProperty('error')
      expect(state.palette).toHaveProperty('green')
      expect(state.palette).toHaveProperty('grey')
    })

    it('should have theme-specific color values', () => {
      const state = themeReducer(undefined, { type: undefined })
      
      expect(state.palette.text).toHaveProperty('dark')
      expect(state.palette.text).toHaveProperty('light')
      expect(state.palette.page.text).toHaveProperty('light')
      expect(state.palette.page.text).toHaveProperty('dark')
      expect(state.palette.page.background).toHaveProperty('light')
      expect(state.palette.page.background).toHaveProperty('dark')
    })
  })

  describe('setDarkTheme', () => {
    it('should set mode to dark', () => {
      const state = themeReducer(initialState, setDarkTheme())
      expect(state.mode).toBe("dark")
    })

    it('should maintain all other state properties', () => {
      const state = themeReducer(initialState, setDarkTheme())
      expect(state.palette).toBeDefined()
      expect(state.header).toBeDefined()
    })

    it('should work when already in dark mode', () => {
      const darkState = { ...initialState, mode: "dark" }
      const state = themeReducer(darkState, setDarkTheme())
      expect(state.mode).toBe("dark")
    })
  })

  describe('setLightTheme', () => {
    it('should set mode to light', () => {
      const darkState = { ...initialState, mode: "dark" }
      const state = themeReducer(darkState, setLightTheme())
      expect(state.mode).toBe("light")
    })

    it('should maintain all other state properties', () => {
      const darkState = { ...initialState, mode: "dark" }
      const state = themeReducer(darkState, setLightTheme())
      expect(state.palette).toBeDefined()
      expect(state.header).toBeDefined()
    })

    it('should work when already in light mode', () => {
      const state = themeReducer(initialState, setLightTheme())
      expect(state.mode).toBe("light")
    })
  })

  describe('theme switching behavior', () => {
    it('should toggle between light and dark modes', () => {
      let state = themeReducer(initialState, setDarkTheme())
      expect(state.mode).toBe("dark")
      
      state = themeReducer(state, setLightTheme())
      expect(state.mode).toBe("light")
      
      state = themeReducer(state, setDarkTheme())
      expect(state.mode).toBe("dark")
    })
  })

  describe('state immutability', () => {
    it('should not mutate the original state when setting dark theme', () => {
      const originalState = { ...initialState }
      themeReducer(initialState, setDarkTheme())
      expect(initialState).toEqual(originalState)
    })

    it('should not mutate the original state when setting light theme', () => {
      const originalState = { ...initialState, mode: "dark" }
      themeReducer(originalState, setLightTheme())
      expect(originalState.mode).toBe("dark")
    })
  })

  describe('palette colors', () => {
    it('should have consistent color structure', () => {
      const state = themeReducer(undefined, { type: undefined })
      
      // Check primary colors
      expect(state.palette.primary).toHaveProperty('light')
      expect(state.palette.primary).toHaveProperty('main')
      expect(state.palette.primary).toHaveProperty('dark')
      expect(state.palette.primary).toHaveProperty('contrastText')
      
      // Check secondary colors
      expect(state.palette.secondary).toHaveProperty('light')
      expect(state.palette.secondary).toHaveProperty('main')
      expect(state.palette.secondary).toHaveProperty('dark')
      expect(state.palette.secondary).toHaveProperty('contrastText')
    })

    it('should have proper green color variations', () => {
      const state = themeReducer(undefined, { type: undefined })
      
      expect(state.palette.green).toHaveProperty('light')
      expect(state.palette.green).toHaveProperty('main')
      expect(state.palette.green).toHaveProperty('dark')
    })

    it('should have grey color variations with theme modes', () => {
      const state = themeReducer(undefined, { type: undefined })
      
      expect(state.palette.grey.ghost).toHaveProperty('light')
      expect(state.palette.grey.ghost).toHaveProperty('dark')
      expect(state.palette.grey.light).toHaveProperty('light')
      expect(state.palette.grey.light).toHaveProperty('dark')
      expect(state.palette.grey.dark).toHaveProperty('light')
      expect(state.palette.grey.dark).toHaveProperty('dark')
    })
  })
})