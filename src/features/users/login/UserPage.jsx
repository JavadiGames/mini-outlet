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
   CssBaseline,
   AppBar,
   Toolbar,
} from "@mui/material";
import { Email, Phone, Home, Logout, ShoppingCartOutlined } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

import { useAuth } from "../../../shared/hooks/useAuth";
import useFetchCarts from "./useFetchCarts";
import _ from "lodash";
import useFetchCartsProducts from "./useFetchCartsProducts";

export default function UserPage() {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const { user, logout } = useAuth();
   //const [products, setProducts] = useState();
   // const [productsByCart, setProductsByCart] = useState({});

   const [carts] = useFetchCarts(user.id);
   const { cartsProducts, loading, error } = useFetchCartsProducts(carts);

   // const prices = carts.map(c => getTotalPrice(c));// Error beacause of using hooks in a loop

   // const [prices, setPrices] = useState([]);

   /*  useEffect(() => {
  const getAllProducts = async () => {
     try {
        const productsByCart = {};
        await Promise.all(carts.map(async (cart) => {
          const products = await fetchProductsFromCart(cart);
          productsByCart[cart.id] = products;
        }));
        setProductsByCart(productsByCart);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

if (carts.length > 0) {
  getAllProducts();
    }
  }, [carts]); */

   // console.log(productsByCart);
   // console.log(carts[0])
   // fetchProductsFromCart(carts[0]).then(products => {
   //   console.log(products);
   //   setProducts(products)});

   console.log(carts);
   // console.log(products);

   const handleCartClick = (cartId) => {
      console.log(`Cart ${cartId} clicked`);
      // Add your cart click logic here
   };
   console.log(cartsProducts);
   const productsByCart = Object.values(cartsProducts).flat();
   console.log(productsByCart);
   let usersss = {
      is: 10,
      sd: 21,
   };
   // const prices = Object.values(cartsProducts).map(products =>
   //   _.sumBy(products, product => product.price)
   // );

   // Calculate total price for each cart
   const prices = carts.map((cart) => {
      const products = cartsProducts[cart.id] || [];
      return _.sumBy(cart.products, (cartProduct) => {
         const product = products.find((p) => p.id === cartProduct.productId) || {};
         return product.price * cartProduct.quantity;
      });
   });

   const totalQuantities = carts.map((cart) => _.sumBy(cart.products, "quantity"));

   console.log(prices);

   if (loading) return <div>Loading products...</div>;
   if (error) return <div>Error: {error.message}</div>;

   return (
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: "#eeeeee",
            height: "100vh",
            alignItems: "center",
         }}>
         <CssBaseline />
         <br />
         <AppBar position="static" sx={{ borderRadius: "20px", backgroundColor: "#009a47", maxWidth: "900px" }}>
            <Toolbar sx={{ justifyContent: "center" }}>
               <Typography variant="h6" noWrap component="div" sx={{ fontFamily: '"Fredoka One", cursive', fontSize: "1.9rem", fontWeight: "bold" }}>
                  Mini Outlet
               </Typography>
            </Toolbar>
         </AppBar>
         <br />
         <Card
            elevation={5}
            sx={{
               borderRadius: "16px",
               bgcolor: "white",
               m: 1,
               overflow: "scroll",
               scrollbarWidth: "none",
               width: { xs: "90%", sm: "77%", md: "700px" },
            }}>
            <CardContent>
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: isMobile ? "column" : "row",
                     alignItems: isMobile ? "center" : "flex-start",
                     justifyContent: "space-between",
                     mb: 2,
                  }}>
                  <Box
                     sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "center" : "flex-start",
                     }}>
                     <Avatar
                        sx={{
                           width: 80,
                           height: 80,
                           bgcolor: "#009a47",
                           fontSize: "2rem",
                           mb: isMobile ? 2 : 0,
                        }}>
                        {user.name.firstname[0].toUpperCase()}
                        {user.name.lastname[0].toUpperCase()}
                     </Avatar>
                     <Box sx={{ ml: isMobile ? 0 : 2, textAlign: isMobile ? "center" : "left" }}>
                        <Typography variant="h4">
                           {user.name.firstname} {user.name.lastname}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                           @{user.username}
                        </Typography>
                     </Box>
                  </Box>
                  <Button
                     variant="outlined"
                     startIcon={<Logout />}
                     onClick={() => logout()}
                     sx={{ mt: isMobile ? 2 : 4, borderColor: "error.main", color: "error.main" }}>
                     Logout
                  </Button>
               </Box>

               <Divider sx={{ my: 2 }} />

               <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                  <Grid xs={12} sm={6}>
                     <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Email sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography>{user.email}</Typography>
                     </Box>
                  </Grid>
                  <Grid xs={12} sm={6}>
                     <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Phone sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography>{user.phone}</Typography>
                     </Box>
                  </Grid>
                  <Grid xs={12}>
                     <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <Home sx={{ mr: 1, mt: 0.5, color: "text.secondary" }} />
                        <Typography>
                           {user.address.number} {user.address.street},<br />
                           {user.address.city}, {user.address.zipcode}
                        </Typography>
                     </Box>
                  </Grid>
               </Grid>

               <Divider sx={{ my: 2 }} />

               <Typography variant="h6" gutterBottom>
                  Your Carts:
               </Typography>
               <List>
                  {carts.map((cart, index) => (
                     <ListItem
                        key={cart.id}
                        onClick={() => handleCartClick(cart.id)}
                        sx={{
                           py: 2,
                           borderRadius: "16px",
                           cursor: "pointer",
                           "&:hover": {
                              bgcolor: "rgba(0, 200, 0, 0.2)", // Stronger light green background on hover
                              transition: "background-color 0.3s",
                           },
                        }}>
                        <ListItemIcon sx={{ color: "error.main" }}>
                           <ShoppingCartOutlined />
                        </ListItemIcon>
                        <ListItemText primary={`Cart #${cart.id}`} secondary={`Last updated: ${cart.date.slice(0, 10)}`} />
                        <Typography variant="body2" sx={{ mr: { xs: 2, sm: 5, md: 10 } }}>
                           {totalQuantities[index]} items
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                           Total: <br />
                           <span style={{ color: "#009a47", fontWeight: isMobile ? 700 : 800, fontSize: isMobile ? "14px" : "16px" }}>
                              ${prices[index].toFixed(2)}
                           </span>
                        </Typography>
                     </ListItem>
                  ))}
               </List>
            </CardContent>
         </Card>
      </div>
   );
}
