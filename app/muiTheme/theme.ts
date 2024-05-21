import { createTheme } from "@mui/material";

// You can see the default one here https://mui.com/material-ui/customization/default-theme/
// This is a theme helper not affiliated with mui, it's an easy and quick way to create a theme https://zenoo.github.io/mui-theme-creator

// Update the Button's color options to include a violet option
declare module "@mui/material/styles" {
  interface Palette {
    coolGrey: Palette["primary"];
    officialGrey: Palette["primary"];
    lightRed: Palette["primary"];
  }
  interface PaletteOptions {
    coolGrey: PaletteOptions["primary"];
    officialGrey: PaletteOptions["primary"];
    lightRed: PaletteOptions["primary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    cancel: true;
  }
}
export const gardaTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D52B1E",
      light: "#f2bdb9",
    },
    secondary: {
      main: "#3C3C4A",
      light: "#3C3C4A",
    },
    text: {
      primary: "#15151a",
    },
    success: {
      main: "#2e7d32",
    },
    officialGrey: {
      main: "#5d5e60",
      light: "#efefef",
    },
    coolGrey: {
      main: "#b2b4b3",
      light: "#f7f8f7",
    },
    lightRed: {
      main: "rgba(213, 43, 30, 0.08)",
    },
  },
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-completed": {
            color: "#2e7d32",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#D52B1E",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          ":hover , :focus": {
            borderRadius: 5,
            backgroundColor: "#D52B1E",
            color: "white",
            ".MuiListItemIcon-root": { color: "white" },
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "cancel" },
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            color: "inherit",
            ":hover": {
              backgroundColor: "#0000000A",
            },
          },
        },
      ],
    },
  },
});
