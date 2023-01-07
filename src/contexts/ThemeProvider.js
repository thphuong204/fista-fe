import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
  lighter: "#fffefd",
  light: "#fffdfa",
  main: "#fffcf5",
  dark: "#fffbf2",
  darker: "#fffaf0"
};
const SECONDARY = {
  lighter: "#ebf0fa",
  light: "#739ae0",
  main: "#3770d4",
  dark: "#264e94",
  darker: "#162c54"
};
const WARNING = {
  lighter: "#ffffcc",
  light: "#fff2b2",
  main: "#ffde8a",
  dark: "#ffd475",
  darker: "#ffcc66"
};
const SUCCESS = {
  lighter: "#ebf1f1",
  light: "#d7e4e4",
  main: "#bad0d0",
  dark: "#a6c2c2",
  darker: "#9dbcbc",
  contrastText: "#ffffff",
};
const INFO = {
  lighter: "#f9f9f9",
  light: "#f6f6f6",
  main: "#e3e3e3",
  dark: "#4c4c4c",
  darker: "#000000",
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      info: INFO,
      warning: WARNING
    },
    shape: { borderRadius: 8 },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;