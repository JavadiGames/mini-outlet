import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import TopNavbar from "../../topbar/TopNavbar";
import MainPage from "./MainPage";
import theme from "../../../styles/myTheme";

import styles from "./MiniOutlet.module.css";

export default function MiniOutlet() {
   return (
      <ThemeProvider theme={theme}>
         <Box className={styles.Container}>
            <TopNavbar />
            <MainPage />
         </Box>
      </ThemeProvider>
   );
}
