import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from "@mui/material";
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
import MobileCategoryList from "./MobileCategoryList";
import DesktopCategoryList from "./DesktopCategoryList";

export default function Categorysidebar({ categories }) {
   const [isClothingExpanded, setIsClothingExpanded] = useState(true);

   const dispatch = useDispatch();
   const selectedCategory = useSelector(selectSelectedCategory);

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
   const classes = useStyles();

   const handleCategoryClick = (category) => {
      let selectedCat = category.toLowerCase();
      if (selectedCat === "men") selectedCat = categories[3];
      if (selectedCat === "women") selectedCat = categories[4];
      dispatch(setSelectedCategory(selectedCat));
   };

   const toggleClothing = () => {
      setIsClothingExpanded(!isClothingExpanded);
   };

   return (
      <SidebarContainer mobile={isMobile}>
         <SidebarTitle mobile={isMobile} />
         {isMobile ? (
            <MobileCategoryList categories={categories} selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} />
         ) : (
            <DesktopCategoryList
               categories={categories}
               selectedCategory={selectedCategory}
               onCategoryClick={handleCategoryClick}
               isClothingExpanded={isClothingExpanded}
               toggleClothing={toggleClothing}
               classes={classes}
            />
         )}
      </SidebarContainer>
   );
}
