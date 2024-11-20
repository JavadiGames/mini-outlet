import { useEffect, useState } from "react";
import { useAuth } from "../../../shared/hooks/useAuth";
import {
   Box,
   Card,
   CardContent,
   Typography,
   Avatar,
   Divider,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   useTheme,
   useMediaQuery,
   Button,
} from "@mui/material";
import { Email, Phone, Home, ShoppingCart, Logout } from "@mui/icons-material";
import useFetchCarts from "../login/useFetchCarts";
import Cart from "./Cart";
import useFetchCartsProducts from "../login/useFetchCartsProducts";

export default function CartPage() {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const { user } = useAuth();
   const [carts] = useFetchCarts(user.id);

   const { cartsProducts, loading, error } = useFetchCartsProducts(carts);

   if (loading) return <div>Loading products...</div>;
   if (error) return <div>Error: {error.message}</div>;

   return (
      <div>
         <h2>Products</h2>
         {Object.entries(cartsProducts).map(([cartId, products]) => (
            <div key={cartId}>
               <h3>Cart ID: {cartId}</h3>
               <ul>
                  {products.map((product) => (
                     <li key={product.id}>
                        {product.title} - ${product.price.toFixed(2)}
                     </li>
                  ))}
               </ul>
            </div>
         ))}
      </div>
   );

   // return(
   //   <div>
   //     {!carts? (
   //       <div>Your cart is empty </div>
   //     ):(
   //         <Box>
   //            {carts.map(c => <Cart cart={c}/>)}
   //         </Box>
   //     )}
   //     Hello Cart
   //   </div>
   // )
}
