import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";

export default function ShopItem({ imageUrl, title, price, onBuy }) {
   const formattedPrice = typeof price === "number" ? `$${price.toFixed(2)}` : "Price not available";
   const { user } = useAuth();

   return (
      <Card
         sx={{
            maxWidth: 500,
            // flexGrow: 1,
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "visible",
            "&:hover": { backgroundColor: "#f4ffd9" },
         }}>
         <Box
            sx={{
               margin: "10px",
               borderRadius: 12,
               overflow: "hidden",
               position: "relative",
            }}>
            <CardMedia
               component="img"
               height="200"
               image={imageUrl}
               alt={title}
               sx={{
                  borderRadius: 12,
                  objectFit: "contain",
                  py: 4,
               }}
            />
         </Box>
         <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", pt: 1 }}>
            <Typography
               sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3, // Limit the text to 3 lines
                  textOverflow: "ellipsis",
                  height: "5em", // Adjust based on your line height
               }}
               gutterBottom
               variant="h6"
               component="div">
               {title}
            </Typography>
            <Typography variant="h5" component="div" fontWeight="bold" sx={{ my: 2 }}>
               {formattedPrice}
            </Typography>
            <Box sx={{ mt: "auto", mx: { xs: 2, sm: 3, md: 4 } }}>
               {!user ? (
                  <Link to="/login" style={{ textDecoration: "none" }}>
                     <Button
                        variant="contained"
                        fullWidth
                        onClick={onBuy}
                        sx={{ borderRadius: 12, py: 1, backgroundColor: "#009a47", textTransform: "none", fontWeight: "bold" }}>
                        Buy Now
                     </Button>
                  </Link>
               ) : (
                  <Link to="/cart" style={{ textDecoration: "none" }}>
                     <Button
                        variant="contained"
                        fullWidth
                        onClick={onBuy}
                        sx={{ borderRadius: 12, py: 1, backgroundColor: "#009a47", textTransform: "none", fontWeight: "bold" }}>
                        Buy Now
                     </Button>
                  </Link>
               )}
            </Box>
         </CardContent>
      </Card>
   );
}
