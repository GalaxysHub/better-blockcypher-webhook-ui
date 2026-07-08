import { createSlice } from "@reduxjs/toolkit";
import {
  red,
  grey,
  blueGrey,
  purple,
  deepPurple,
  green,
} from "@mui/material/colors";

const primaryLight =
  "radial-gradient(circle, rgba(43,38,125,1) 0%, rgba(106,64,195,1) 48%, rgba(162,96,240,1) 99%)";

const sharedPalette = {
  primary: {
    light: primaryLight,
    main: deepPurple[500],
    dark: "#000000",
    contrastText: grey[50],
  },
  secondary: {
    light: deepPurple[700],
    main: deepPurple[500],
    dark: deepPurple[300],
    contrastText: "#000",
  },
  green: {
    light: green[800],
    main: green[800],
    dark: green[900],
    contrastText: "#ffffff",
  },
  error: {
    light: red[300],
    main: red.A400,
    dark: red[700],
    contrastText: "#ffffff",
  },
};

const themeByMode = {
  light: {
    text: {
      primary: "#000000",
      secondary: grey[700],
      disabled: grey[500],
      light: "#ffffff",
      dark: "#ffffff",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    actionHover: "rgba(0, 0, 0, 0.04)",
    page: {
      text: "#000000",
      background: grey[200],
    },
    paper: "#ffffff",
    card: {
      text: "#000000",
      background: "#ffffff",
    },
    table: {
      headText: "#ffffff",
      odd: grey[300],
      even: grey[100],
      hover: grey[200],
      text: deepPurple[400],
    },
    softSurface: grey[100],
    mutedSurface: "#ffffff",
  },
  dark: {
    text: {
      primary: "#ffffff",
      secondary: purple[100],
      disabled: grey[500],
      light: "#ffffff",
      dark: "#ffffff",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    actionHover: "rgba(255, 255, 255, 0.08)",
    page: {
      text: purple[100],
      background: grey[800],
    },
    paper: blueGrey[800],
    card: {
      text: "#ffffff",
      background: grey[900],
    },
    table: {
      headText: "#ffffff",
      odd: blueGrey[900],
      even: blueGrey[800],
      hover: blueGrey[700],
      text: grey[50],
    },
    softSurface: blueGrey[900],
    mutedSurface: blueGrey[900],
  },
};

const buildThemeState = (mode) => {
  const modeTheme = themeByMode[mode];

  return {
    mode,
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      h1: {
        fontWeight: 700,
        letterSpacing: 0,
      },
      h4: {
        fontWeight: 700,
        letterSpacing: 0,
      },
      button: {
        fontWeight: 700,
        letterSpacing: 0,
        textTransform: "none",
      },
    },
    palette: {
      mode,
      ...sharedPalette,
      gradient: {
        header: {
          light: primaryLight,
          dark: "#000000",
        },
        headerSoft: {
          light: primaryLight,
          dark: "#000000",
        },
      },
      text: modeTheme.text,
      divider: modeTheme.divider,
      background: {
        default: modeTheme.page.background,
        paper: modeTheme.paper,
        light: "#ffffff",
        dark: "#000000",
      },
      page: {
        text: {
          light: themeByMode.light.page.text,
          dark: themeByMode.dark.page.text,
        },
        background: {
          light: themeByMode.light.page.background,
          dark: themeByMode.dark.page.background,
        },
      },
      paper: {
        light: themeByMode.light.paper,
        dark: themeByMode.dark.paper,
      },
      card: {
        text: {
          light: themeByMode.light.card.text,
          dark: themeByMode.dark.card.text,
        },
        background: {
          light: themeByMode.light.card.background,
          dark: themeByMode.dark.card.background,
        },
      },
      table: {
        headText: {
          light: themeByMode.light.table.headText,
          dark: themeByMode.dark.table.headText,
        },
        odd: {
          light: themeByMode.light.table.odd,
          dark: themeByMode.dark.table.odd,
        },
        even: {
          light: themeByMode.light.table.even,
          dark: themeByMode.dark.table.even,
        },
        hover: {
          light: themeByMode.light.table.hover,
          dark: themeByMode.dark.table.hover,
        },
        text: {
          light: themeByMode.light.table.text,
          dark: themeByMode.dark.table.text,
        },
      },
      checkbox: {
        checked: {
          light: sharedPalette.secondary.light,
          dark: sharedPalette.secondary.dark,
        },
        unchecked: {
          light: sharedPalette.secondary.main,
          dark: grey[50],
        },
      },
      grey: {
        ...grey,
        ghost: {
          light: modeTheme.mutedSurface,
          dark: modeTheme.mutedSurface,
        },
        light: {
          light: modeTheme.softSurface,
          dark: modeTheme.softSurface,
        },
        dark: {
          light: modeTheme.mutedSurface,
          dark: modeTheme.mutedSurface,
        },
        contrastText: {
          light: modeTheme.table.text,
          dark: modeTheme.table.text,
        },
      },
      action: {
        hover: modeTheme.actionHover,
        selected: modeTheme.actionHover,
        disabled: modeTheme.text.disabled,
        disabledBackground:
          mode === "dark" ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.12)",
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            minHeight: 40,
            padding: "8px 16px",
            ...(mode === "dark"
              ? {
                  "&.MuiButton-contained.Mui-disabled": {
                    color: grey[200],
                    backgroundColor: blueGrey[700],
                  },
                }
              : {}),
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            ...(mode === "dark"
              ? {
                  "&.Mui-focused": {
                    color: modeTheme.text.secondary,
                  },
                }
              : {}),
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            ...(mode === "dark"
              ? {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: modeTheme.text.secondary,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: modeTheme.text.secondary,
                  },
                }
              : {}),
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            ...(mode === "dark"
              ? {
                  "&.Mui-selected": {
                    color: modeTheme.text.secondary,
                    backgroundColor: "rgba(225, 190, 231, 0.16)",
                  },
                  "&.Mui-selected:hover, &.Mui-focusVisible": {
                    backgroundColor: "rgba(225, 190, 231, 0.24)",
                  },
                }
              : {}),
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: 48,
            fontWeight: 700,
            letterSpacing: 0,
            textTransform: "none",
          },
        },
      },
    },
  };
};

export const initialState = buildThemeState("light");

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme: () => buildThemeState("dark"),
    setLightTheme: () => buildThemeState("light"),
  },
});

export const { setDarkTheme, setLightTheme } = themeSlice.actions;

export default themeSlice.reducer;
