import { useTheme } from "@mui/material/styles";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ShopItem from "../shop-window/containers/ShopItem";

import { Link } from "react-router-dom";

export default function SearchedItems({ items, searchTerm }) {
   //   const [items, setItems] = useState([]);

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

   const sharedStyles = {
      borderRadius: "16px",
      backgroundColor: theme.palette.grey[200],
   };

   const handleBuy = (productName) => {
      console.log(`Buy button clicked for ${productName}`);
      // Add your buy logic here
   };

   return (
      <Box
         component="main"
         ml={10}
         sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - 250px)`,
            height: "95%",
            overflow: "hidden",
            marginLeft: isMobile ? 0 : "250px",
            marginTop: isMobile ? "48px" : "80px",
         }}>
         <Paper
            elevation={3}
            sx={{
               ...sharedStyles,
               height: `calc(100% - ${isMobile ? "200px" : "140px"})`,
               margin: isMobile ? "100px 10px 10px 0px" : "40px 10px 10px 0px",
               overflow: "hidden",
            }}>
            <Box
               sx={{
                  flexGrow: 1,
                  height: "95%",
                  overflow: "auto",
                  p: { xs: "10px", sm: "20px", md: "40px" },
                  "&::-webkit-scrollbar": {
                     width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                     ...sharedStyles,
                     backgroundColor: theme.palette.grey[400],
                     "&:hover": {
                        backgroundColor: theme.palette.grey[500],
                     },
                  },
                  scrollbarWidth: "thin",
                  scrollbarColor: `${theme.palette.grey[400]} transparent`,
               }}>
               {items.length === 0 && searchTerm ? (
                  <Typography variant="body1" sx={{ p: 2, textAlign: "center", fontSize: "32px", color: "grey" }}>
                     No results found for "{searchTerm}".
                  </Typography>
               ) : (
                  <Grid container spacing={2} columns={{ xxl: 15 }}>
                     {items.map((item, index) => (
                        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3, xxl: 3 }}>
                           <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
                              <ShopItem imageUrl={item.image} title={item.title} price={item.price} onBuy={() => handleBuy(item.id)} />
                           </Link>
                        </Grid>
                     ))}
                  </Grid>
               )}
            </Box>
         </Paper>
      </Box>
   );
}
