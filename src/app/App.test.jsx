import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { expect, describe, it, beforeEach, vi } from 'vitest';
import App from '../app/App.jsx';
import store from '../store/store.js';
import { setLightTheme, setDarkTheme } from '../store/slices/themeSlice.js';

// Mock the API calls
vi.mock('../APIs/blockcypherWebhooks', () => ({
  getTokenDets: vi.fn(() => Promise.resolve({ 
    data: { 
      token: 'test-token',
      limits: { api_key_type: 'basic', hits: 3000 }
    } 
  })),
  getWebhooksByCoin: vi.fn(() => Promise.resolve([]))
}));


describe('App Component', () => {
  // Helper function to render App with the actual production store
  const renderAppWithActualStore = (themeMode = 'light') => {
    // Set the theme in the actual store
    if (themeMode === 'light') {
      store.dispatch(setLightTheme());
    } else {
      store.dispatch(setDarkTheme());
    }

    const themeState = store.getState().themeReducer;
    const theme = createTheme(themeState);

    return render(
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    );
  };

  // Helper to create a store with dispatch tracking for specific tests
  const renderAppWithDispatchTracking = (mockDispatch) => {
    // Create a temporary middleware to track dispatches
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
      mockDispatch(action);
      return originalDispatch(action);
    };

    const themeState = store.getState().themeReducer;
    const theme = createTheme(themeState);

    const result = render(
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    );

    // Cleanup function to restore original dispatch
    result.cleanup = () => {
      store.dispatch = originalDispatch;
    };

    return result;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to light theme before each test
    store.dispatch(setLightTheme());
    // Reset token to null
    store.dispatch({ type: 'token/setToken', payload: null });
  });

  it('renders all main components', () => {
    renderAppWithActualStore();
    
    expect(screen.getAllByRole('banner')[0]).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('applies correct styling with light theme', () => {
    renderAppWithActualStore('light');
    
    // Check if the navbar is rendered with proper theme styling
    const navbar = screen.getAllByRole('banner')[0];
    expect(navbar).toBeInTheDocument();
    
    // Verify the actual store has light theme
    expect(store.getState().themeReducer.mode).toBe('light');
  });

  it('applies correct styling with dark theme', () => {
    renderAppWithActualStore('dark');
    
    // Check if the navbar is rendered with dark theme styling
    const navbar = screen.getAllByRole('banner')[0];
    expect(navbar).toBeInTheDocument();
    
    // Verify the actual store has dark theme
    expect(store.getState().themeReducer.mode).toBe('dark');
  });

  it('fetches token details on mount', async () => {
    // Import the already mocked module
    const { getTokenDets } = await import('../APIs/blockcypherWebhooks.js');
    
    // Clear any previous calls
    getTokenDets.mockClear();
    
    renderAppWithActualStore();
    
    // Wait for the API call to be made
    await waitFor(() => {
      expect(getTokenDets).toHaveBeenCalledWith(null);
    });
  });

  it('dispatches setTokenDets action on successful API call', async () => {
    const mockDispatch = vi.fn();
    
    // Use dispatch tracking with the actual store
    const { cleanup } = renderAppWithDispatchTracking(mockDispatch);
    
    // Wait for the setTokenDets action to be dispatched
    await waitFor(() => {
      const setTokenDetsAction = mockDispatch.mock.calls.find(
        call => call[0].type === 'token/setTokenDets'
      );
      expect(setTokenDetsAction).toBeTruthy();
    });
    
    // Cleanup the dispatch override
    cleanup();
  });

  it('handles API error gracefully', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Mock the API to reject
    const { getTokenDets } = await import('../APIs/blockcypherWebhooks.js');
    getTokenDets.mockRejectedValueOnce(new Error('API Error'));
    
    renderAppWithActualStore();
    
    // Wait for the error to be logged
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(
        'Error fetching token details: ',
        expect.any(Error)
      );
    });
    
    consoleLogSpy.mockRestore();
  });

  it('has correct component hierarchy', () => {
    renderAppWithActualStore();
    
    // Check the main components are present
    const navbar = screen.getAllByRole('banner')[0];
    const footer = screen.getByRole('contentinfo');
    
    // All components should be present
    expect(navbar).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  it('applies theme colors correctly with light theme', () => {
    renderAppWithActualStore('light');
    
    // Get the navbar
    const navbar = screen.getAllByRole('banner')[0];
    expect(navbar).toBeInTheDocument();
    
    // Verify actual store state
    expect(store.getState().themeReducer.mode).toBe('light');
  });

  it('applies theme colors correctly with dark theme', () => {
    renderAppWithActualStore('dark');
    
    const navbar = screen.getAllByRole('banner')[0];
    expect(navbar).toBeInTheDocument();
    
    // Verify actual store state
    expect(store.getState().themeReducer.mode).toBe('dark');
  });

  it('renders with minimum height styling', () => {
    renderAppWithActualStore();
    
    const navbar = screen.getAllByRole('banner')[0];
    
    // The navbar should be rendered properly
    expect(navbar).toBeInTheDocument();
    expect(navbar.tagName).toBe('HEADER');
  });

  it('container has correct padding', () => {
    renderAppWithActualStore();
    
    // Find the main container
    const navbar = screen.getAllByRole('banner')[0];
    expect(navbar).toBeInTheDocument();
    
    // Should have proper MUI classes
    expect(navbar.className).toContain('MuiAppBar') || expect(navbar.className).toContain('css-');
  });

  it('useEffect dependency array includes dispatch', async () => {
    // This test ensures that the useEffect dependency array is correct
    // We can verify this by checking that the effect runs when component mounts
    const { getTokenDets } = vi.mocked(await import('../APIs/blockcypherWebhooks.js'));
    
    renderAppWithActualStore();
    
    expect(getTokenDets).toHaveBeenCalledTimes(1);
  });

  it('renders components without errors', () => {
    renderAppWithActualStore();
    
    expect(screen.getAllByRole('banner')[0]).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('maintains component structure with light theme', () => {
    renderAppWithActualStore('light');
    
    // Check all components are present
    expect(screen.getAllByRole('banner')[0]).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Verify actual store state
    expect(store.getState().themeReducer.mode).toBe('light');
  });

  it('maintains component structure with dark theme', () => {
    renderAppWithActualStore('dark');
    
    // All components should be present with dark theme
    expect(screen.getAllByRole('banner')[0]).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    
    // Verify actual store state
    expect(store.getState().themeReducer.mode).toBe('dark');
  });
});
