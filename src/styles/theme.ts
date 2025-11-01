import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3860F0",
      light: "#5f84ff",
      dark: "#2349c0",
    },
    secondary: {
      main: "#F45B69",
      light: "#ff8a95",
      dark: "#c32f3f",
    },
    background: {
      default: "#f4f6fb",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "'Noto Sans JP'",
      "'Roboto'",
      "'Helvetica Neue'",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 700,
      letterSpacing: "0.04em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f4f6fb",
          backgroundImage:
            "linear-gradient(180deg, rgba(56,96,240,0.08) 0%, rgba(244,246,251,1) 35%, rgba(255,255,255,1) 100%)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(12px)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 20px 45px rgba(24, 39, 75, 0.12)",
          border: "1px solid rgba(56, 96, 240, 0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(12px)",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "rgba(25, 39, 89, 0.6)",
          "&.Mui-selected": {
            color: "#3860F0",
          },
        },
      },
    },
  },
});

export default theme;

