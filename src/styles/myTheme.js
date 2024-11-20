import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: { main: "#6cc13f" ,  contrastText: '#fff',},
        secondary: { main: "#009a47" ,  contrastText: '#fff',},
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1600,
          xxl: 2000,
        },
      },
});

export default theme;