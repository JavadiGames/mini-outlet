import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

import Searchbar from "./Searchbar";
import { useAuth } from "../../shared/hooks/useAuth";

export default function TopNavbar() {
   const [isScrolled, setIsScrolled] = useState(false);
   const { user } = useAuth();

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 10) {
            setIsScrolled(true);
         } else {
            setIsScrolled(false);
         }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   console.log(user);

   const { logout } = useAuth();
   const handleLogout = () => {
      logout();
   };

   return (
      <AppBar
         position="fixed"
         sx={{
            borderRadius: isScrolled ? "0 0 20px 20px" : "20px",
            backgroundColor: "#009a47", // green color for a playful look
            margin: isScrolled ? "0" : "20px",
            marginX: {
               xs: isScrolled ? "0" : "5px",
               sm: isScrolled ? "0" : "20px",
            },
            width: {
               xs: isScrolled ? "100%" : "calc(100% - 10px)",
               sm: isScrolled ? "100%" : "calc(100% - 40px)",
            }, // Adjust width when not scrolled
            transition: "all 0.3s ease-in-out",
         }}>
         <Toolbar sx={{ flexDirection: { xs: "column", sm: "row" }, justifyContent: { xs: "space-evenly", sm: "space-between" } }}>
            <Typography
               variant="h6"
               noWrap
               component="div"
               sx={{
                  // flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  fontFamily: '"Fredoka One", cursive',
                  fontSize: "1.9rem",
                  fontWeight: "bold",
               }}>
               Mini Outlet
            </Typography>

            <Searchbar />

            <Box sx={{ display: "flex", alignItems: "center" }}>
               {!user ? (
                  <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                     <Button color="inherit" sx={{ borderRadius: 4, mr: 1, padding: 2, "&:hover": { bgcolor: "#6cc13f" } }}>
                        Login
                     </Button>
                  </Link>
               ) : (
                  <Link to="/user" style={{ color: "white", textDecoration: "none" }}>
                     <IconButton color="inherit" aria-label="cart" sx={{ padding: 2, "&:hover": { bgcolor: "#6cc13f" }, fontSize: "large" }}>
                        <AccountCircle />
                     </IconButton>
                  </Link>
               )}
               {!user ? (
                  <Button color="inherit" sx={{ borderRadius: 4, mr: 1, padding: 2, "&:hover": { bgcolor: "#6cc13f" } }}>
                     Register
                  </Button>
               ) : (
                  <Button color="inherit" sx={{ borderRadius: 4, mr: 1, padding: 2, "&:hover": { bgcolor: "#6cc13f" } }} onClick={handleLogout}>
                     Logout
                  </Button>
               )}
               <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
                  <IconButton color="inherit" aria-label="cart" sx={{ padding: 2, "&:hover": { bgcolor: "#6cc13f" } }}>
                     <Badge badgeContent={3} color="error">
                        <ShoppingCartIcon />
                     </Badge>
                  </IconButton>
               </Link>
            </Box>
         </Toolbar>
      </AppBar>
   );
}
