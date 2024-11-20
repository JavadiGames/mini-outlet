import { Typography } from "@mui/material";

function SidebarTitle({ mobile }) {
   return (
      <>
         {mobile ? (
            <Typography
               variant="h6"
               align="center"
               fontWeight="800"
               sx={{ fontSize: "14px", alignItems: "center", display: { xs: "none", sm: "flex" } }}>
               Category
            </Typography>
         ) : (
            <Typography variant="h6" align="center" fontWeight="1000">
               Categories
            </Typography>
         )}
      </>
   );
}

export default SidebarTitle;
