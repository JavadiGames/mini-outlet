import { useState } from "react";
import React from "react";
import {
   AppBar,
   Button,
   Container,
   FormControl,
   Typography,
   Input,
   Stack,
   TextField,
   Toolbar,
   Box,
   CssBaseline,
   Paper,
   useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

import "../../../styles/App.css";

import { useAuth } from "../../../shared/hooks/useAuth";

export default function LoginPage() {
   const [message, setMessage] = useState("Congrats! You can sign-in now!");
   const [open, setOpen] = useState(false);

   // const [token, setToken] = useState("");
   const { login } = useAuth();

   const heightIsShort = useMediaQuery("(max-height:740px)");
   const isMobile = useMediaQuery("(max-width:400px)");

   const linkStyle = {
      color: "primary.main",
      textDecoration: "none",
      "&:hover": {
         textDecoration: "underline",
         color: "primary.dark",
      },
   };

   const handleClick = () => {
      setOpen(true);
   };

   const handleClose = (event, reason) => {
      if (reason === "clickaway") return;
      setOpen(false);
   };

   const action = (
      <React.Fragment>
         <Button color="error" size="small" onClick={handleClose}>
            OK
         </Button>
         <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
         </IconButton>
      </React.Fragment>
   );

   const formik = useFormik({
      initialValues: { name: "", password: "" },
      validationSchema: Yup.object({
         name: Yup.string()
            .matches(/^[^@#$%^&*!~()|\\/?":><;',{}[\]<>+=]*$/)
            .required("Required"),
         password: Yup.string().required("Required"),
      }),

      onSubmit: (values) => {
         console.log(values.name, values.password);
         fetch("https://fakestoreapi.com/auth/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: values.name,
               password: values.password,
            }),
         })
            .then((res) => res.json())
            .then(async (json) => {
               // setToken(json.token);
               console.log(json.token);
               if (json.token) {
                  await login({ name: values.name });
                  setMessage("Congrats! You are logged in!");
                  handleClick();
                  // alert(JSON.stringify(values, null, 2));
               } else {
                  setMessage("Sorry! username or password is wrong!");
                  handleClick();
               }
            })
            .catch((e) => {
               console.log("Error! ", e);
               setMessage("Sorry! username or password is wrong!");
               handleClick();
            });
      },
   });

   return (
      <div style={{ justifyContent: "center", backgroundColor: "#eeeeee", height: "100vh" }}>
         <CssBaseline />
         <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <br />
            <AppBar
               position="static"
               sx={{
                  borderRadius: "20px",
                  backgroundColor: "#009a47", // green color for a playful look
                  maxWidth: "900px", // Adjust width when not scrolled
               }}>
               <Toolbar sx={{ justifyContent: "center" }}>
                  <Typography
                     variant="h6"
                     noWrap
                     component="div"
                     sx={{
                        fontFamily: '"Fredoka One", cursive',
                        fontSize: "1.9rem",
                        fontWeight: "bold",
                     }}>
                     Mini Outlet
                  </Typography>
               </Toolbar>
            </AppBar>

            <Paper
               position="sticky"
               elevation={5}
               sx={{
                  p: { xs: "10px", sm: "20px" },
                  borderRadius: "16px",
                  maxHeight: "520px",
                  // maxHeight: { xs: "530px", sm: "520px" },
                  marginTop: heightIsShort ? "7vh" : "20vh",
                  width: { xs: "90%", sm: "70%" },
               }}>
               <p style={{ marginTop: "2.5vh", textAlign: "center" }}>If you have an account, please</p>
               <h1 style={{ textAlign: "center", fontSize: isMobile ? "1.5em" : "2em" }}>Login to checkout</h1>
               {/* <Typography variant="h1" component="h1" fontWeight={600} sx={{ textAlign: "center", fontSize: { xs: "1em", sm: "32px" } }}>
            Login to checkout
          </Typography> */}
               <Stack maxWidth="xs" spacing={3} component="form" onSubmit={formik.handleSubmit} sx={{ my: 8 }}>
                  <TextField
                     id="name"
                     name="name"
                     type="text"
                     label="Username"
                     onChange={formik.handleChange}
                     value={formik.values.name}
                     required
                     sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "16px" },
                     }}
                  />
                  {/* <TextField id="email" name="email" label="Email" type="email" onChange={formik.handleChange} value={formik.values.email} required /> */}
                  <TextField
                     id="password"
                     name="password"
                     label="Enter your password"
                     type="password"
                     onChange={formik.handleChange}
                     value={formik.values.password}
                     required
                     sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
                  />
                  <Button
                     fullWidth
                     sx={{
                        borderRadius: 12,
                        py: 1,
                        backgroundColor: "#009a47",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        marginTop: "50px",
                     }}
                     variant="contained"
                     type="submit">
                     Login
                  </Button>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                     <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                        <Typography variant="body2" sx={linkStyle}>
                           Forgot password?
                        </Typography>
                     </Link>
                     <Link to="/signup" style={{ marginTop: "10px", textDecoration: "none" }}>
                        <Typography variant="body1" sx={linkStyle}>
                           Don't have an account? <strong>Sign Up</strong>
                        </Typography>
                     </Link>
                     <br />
                  </Box>
               </Stack>
            </Paper>

            <Snackbar
               anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
               open={open}
               autoHideDuration={6000}
               onClose={handleClose}
               message={message}
               action={action}
            />
         </Container>
      </div>
   );
}
