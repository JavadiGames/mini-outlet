import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

import { useAuth } from "../../../shared/hooks/useAuth";
import useFetchProduct from "../../users/login/useFetchProduct";

const StyledCard = styled(Card)(({ theme }) => ({
   display: "flex",
   flexDirection: "column",
   maxWidth: 600,
   margin: "auto",
   borderRadius: "18px",
   [theme.breakpoints.up("md")]: {
      flexDirection: "row",
   },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
   width: "100%",
   height: 300,
   objectFit: "contain",
   [theme.breakpoints.up("md")]: {
      width: 300,
      height: "auto",
   },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
   display: "flex",
   flexDirection: "column",
   justifyContent: "space-between",
   flex: 1,
}));

export default function ShopItemDetails() {
   const { id } = useParams();
   const { user } = useAuth();
   const { product, loading, error } = useFetchProduct(id);

   if (loading) return <div>Loading products...</div>;
   if (error) return <div>Error: {error.message}</div>;
   console.log(product);
   console.log(loading);
   console.log(error);

   return (
      <StyledCard elevation={3}>
         <StyledCardMedia component="img" image={product.image} alt={product.title} />
         <ContentWrapper>
            <CardContent>
               <Typography variant="h5" component="h2" gutterBottom>
                  {product.title}
               </Typography>
               product.
               <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {product.category}
               </Typography>
               <Typography variant="body1" component="paragraph">
                  {product.description}
               </Typography>
               <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="h6" component="span" mr={1}>
                     <b>${product.price.toFixed(2)}</b>
                  </Typography>
                  <Chip
                     icon={<StarIcon />}
                     label={`${product.rating.rate} (${product.rating.count} reviews)`}
                     color="primary.secondary"
                     size="small"
                  />
               </Box>
               <Typography variant="subtitle2" color="text.secondary">
                  {product.rating.count} items remaining
               </Typography>
            </CardContent>
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
               {!user ? (
                  <Link to="/login" style={{ textDecoration: "none" }}>
                     <Button sx={{ borderRadius: "16px", bgcolor: "green", px: 4, py: 2 }} variant="contained" color="primary">
                        Buy Now
                     </Button>
                  </Link>
               ) : (
                  <Link to="/cart" style={{ textDecoration: "none" }}>
                     <Button sx={{ borderRadius: "16px", bgcolor: "green", px: 4, py: 2 }} variant="contained" color="primary">
                        Buy Now
                     </Button>
                  </Link>
               )}
               <Box>
                  <IconButton sx={{ mr: 2 }} color="error" aria-label="add to wishlist">
                     <FavoriteIcon />
                  </IconButton>
                  {!user ? (
                     <Link to="/login" style={{ textDecoration: "none" }}>
                        <Button
                           variant="outlined"
                           sx={{ borderRadius: "16px", color: "#009a47", borderColor: "#009a47" }}
                           aria-label="add to cart"
                           startIcon={<ShoppingCartIcon />}>
                           Add to Cart
                        </Button>
                     </Link>
                  ) : (
                     <Link to="/cart" style={{ textDecoration: "none" }}>
                        <Button
                           variant="outlined"
                           sx={{ borderRadius: "16px", color: "#009a47", borderColor: "#009a47" }}
                           aria-label="add to cart"
                           startIcon={<ShoppingCartIcon />}>
                           Add to Cart
                        </Button>
                     </Link>
                  )}
               </Box>
            </Box>
         </ContentWrapper>
      </StyledCard>
   );
}

// import { useParams } from "react-router-dom";
// import useFetchProduct from "../Login/useFetchProduct";

// export default function ShopItemDetails() {
//   const { id } = useParams();
//   const {product} = useFetchProduct(id);

//   return (
//     <div>
//       {product.title} {product.id}
//     </div>
//   );
// }
