import { Box, Collapse, List, ListItem, ListItemButton, ListItemText, Typography, useMediaQuery } from "@mui/material";
import { CategoryTwoTone, Checkroom, ExpandLess, ExpandMore, Man, Woman } from "@mui/icons-material";
import LaptopTwoToneIcon from "@mui/icons-material/LaptopTwoTone";
import DiamondTwoToneIcon from "@mui/icons-material/DiamondTwoTone";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { selectSelectedCategory, setSelectedCategory } from "../../../shared/redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import SidebarTitle from "../components/SidebarTitle";
import SidebarContainer from "../components/SidebarContainer";
import useStyles from "../styles/SidebarStyles";

export default function Categorysidebar({ categories }) {
   const dispatch = useDispatch();
   const selectedCategory = useSelector(selectSelectedCategory);

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
   const classes = useStyles();

   const onCategoryClick = (evt) => {
      let category = evt.target.textContent.toLowerCase();
      console.log(category);
      if (category === "men") category = categories[3];

      if (category === "women") category = categories[4];
      dispatch(setSelectedCategory(category));
   };

   const [isClothingExpanded, setIsClothingExpanded] = useState(true);
   const toggleClothing = () => {
      setIsClothingExpanded(!isClothingExpanded);
   };

   return (
      <>
         {isMobile ? (
            <SidebarContainer mobile>
               <SidebarTitle mobile />

               <List sx={{ display: "flex", flexDirection: "row", padding: 0, overflowX: "auto", width: "100%" }}>
                  <ListItem sx={{ p: 0 }}>
                     <ListItemButton
                        onClick={onCategoryClick}
                        selected={selectedCategory === "all"}
                        sx={{ "&.Mui-selected": { border: "2px solid red", borderRadius: "16px", flexShrink: 1 } }}>
                        <CategoryTwoTone sx={{ marginInlineEnd: 0.0 }} />
                        <ListItemText primary="All" sx={{ display: "none" }} />
                     </ListItemButton>
                  </ListItem>
                  <ListItem>
                     <ListItemButton
                        onClick={onCategoryClick}
                        selected={selectedCategory === "electronics"}
                        sx={{ "&.Mui-selected": { border: "2px solid red", borderRadius: "16px" } }}>
                        <LaptopTwoToneIcon sx={{ marginInlineEnd: 0.0 }} />
                        <ListItemText primary="Electronics" sx={{ display: "none" }} />
                     </ListItemButton>
                  </ListItem>
                  <ListItem>
                     <ListItemButton
                        onClick={onCategoryClick}
                        selected={selectedCategory === "jewelery"}
                        sx={{ "&.Mui-selected": { border: "2px solid red", borderRadius: "16px" } }}>
                        <DiamondTwoToneIcon sx={{ marginInlineEnd: 0.0 }} />
                        <ListItemText primary="Jewelery" sx={{ display: "none" }} />
                     </ListItemButton>
                  </ListItem>
                  <ListItem>
                     <ListItemButton
                        onClick={onCategoryClick}
                        selected={selectedCategory === "women's clothing"}
                        sx={{ "&.Mui-selected": { border: "2px solid red", borderRadius: "16px" } }}>
                        <Woman sx={{ marginInlineEnd: 0.0 }} />
                        <ListItemText primary="women's clothing" sx={{ display: "none" }} />
                     </ListItemButton>
                  </ListItem>
                  <ListItem>
                     <ListItemButton
                        onClick={onCategoryClick}
                        selected={selectedCategory === "men's clothing"}
                        sx={{ "&.Mui-selected": { border: "2px solid red", borderRadius: "16px" } }}>
                        <Man sx={{ marginInlineEnd: 0.0 }} />
                        <ListItemText primary="men's clothing" sx={{ display: "none" }} />
                     </ListItemButton>
                  </ListItem>
               </List>
            </SidebarContainer>
         ) : (
            <SidebarContainer>
               <SidebarTitle />
               <List>
                  <ListItem className={classes.listItem}>
                     <ListItemButton
                        onClick={onCategoryClick}
                        selected={selectedCategory === "all"}
                        sx={{ "&.Mui-selected": { border: "2px solid red", borderRadius: "16px" } }}>
                        <CategoryTwoTone sx={{ marginInlineEnd: 1.5 }} />
                        <ListItemText primary="All" />
                     </ListItemButton>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                     <ListItemButton
                        onClick={onCategoryClick}
                        selected={selectedCategory === "electronics"}
                        sx={{ "&.Mui-selected": { border: "2px solid red", borderRadius: "16px" } }}>
                        <LaptopTwoToneIcon sx={{ marginInlineEnd: 1.5 }} />
                        <ListItemText primary="Electronics" />
                     </ListItemButton>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                     <ListItemButton
                        onClick={onCategoryClick}
                        selected={selectedCategory === "jewelery"}
                        sx={{ "&.Mui-selected": { border: "2px solid red", borderRadius: "16px" } }}>
                        <DiamondTwoToneIcon sx={{ marginInlineEnd: 1.5 }} />
                        <ListItemText primary="Jewelery" />
                     </ListItemButton>
                  </ListItem>
                  <ListItem className={classes.listItem} sx={{ marginBottom: "-2px" }}>
                     <ListItemButton onClick={toggleClothing}>
                        <Checkroom sx={{ marginInlineEnd: 1.5 }} />
                        <ListItemText primary="Clothing" sx={{ marginInlineEnd: 1 }} />
                        {isClothingExpanded ? <ExpandLess /> : <ExpandMore />}
                     </ListItemButton>
                  </ListItem>
                  <Collapse in={isClothingExpanded} timeout="auto" unmountOnExit>
                     <List
                        component="div"
                        sx={{
                           bgcolor: "#6cc13f",
                           borderRadius: "40px",
                           marginLeft: "35px",
                        }}>
                        <ListItem className={classes.listItem}>
                           <ListItemButton
                              onClick={onCategoryClick}
                              selected={selectedCategory === "women's clothing"}
                              sx={{ "&.Mui-selected": { border: "2px solid red", borderRadius: "20px" } }}>
                              <Woman sx={{ marginInlineEnd: 1 }} />
                              <ListItemText primary="Women" />
                           </ListItemButton>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                           <ListItemButton
                              onClick={onCategoryClick}
                              selected={selectedCategory === "men's clothing"}
                              sx={{ "&.Mui-selected": { border: "2px solid red", borderRadius: "20px" } }}>
                              <Man sx={{ marginInlineEnd: 1 }} />
                              <ListItemText primary="Men" />
                           </ListItemButton>
                        </ListItem>
                     </List>
                  </Collapse>
               </List>
            </SidebarContainer>
         )}
      </>
   );
}
