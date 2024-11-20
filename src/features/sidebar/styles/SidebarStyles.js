import { makeStyles, useTheme } from "@mui/styles";

// const theme = useTheme();

// export const verticalStyles = {
//    position: "fixed",
//    left: "7.5%",
//    top: { xs: "160px", sm: "120px" },
//    display: "flex",
//    flexDirection: "row",
//    backgroundColor: "#b2ef6c",
//    borderRadius: "40px",
//    padding: "5px",
//    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//    width: "85%",
//    zIndex: 1000,
//    scrollbarWidth: "thin",
//    scrollbarColor: `${theme.palette.grey[300]} transparent`,
// };

const useStyles = makeStyles((theme) => ({
   floatingVerticalList: {
      position: "fixed",
      left: "20px",
      top: "200px",
      backgroundColor: "#b2ef6c",
      borderRadius: "40px",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginRight: "100px",
      zIndex: 1000,
   },
   listItem: {
      marginBottom: "12px",
   },
   floatingHorizontalList: {
      position: "fixed",
      left: "7.5%",
      top: { xs: "160px", sm: "120px" },
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#b2ef6c",
      borderRadius: "40px",
      padding: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "85%",
      zIndex: 1000,
      scrollbarWidth: "thin",
      scrollbarColor: `${theme.palette.grey[300]} transparent`,
   },
}));

export default useStyles;
