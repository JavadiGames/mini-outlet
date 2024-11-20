import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { selectSelectedCategory, setSelectedCategory } from "../../../shared/redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import SidebarTitle from "../components/SidebarTitle";
import SidebarContainer from "../components/SidebarContainer";
import MobileCategoryList from "./MobileCategoryList";
import DesktopCategoryList from "./DesktopCategoryList";

import { CATEGORIES } from "../../../shared/Constants";

export default function CategorySidebar() {
   const [isClothingExpanded, setIsClothingExpanded] = useState(true);

   const dispatch = useDispatch();
   const selectedCategory = useSelector(selectSelectedCategory);

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

   const handleCategoryClick = (category) => {
      let selectedCat = category.toLowerCase();
      if (selectedCat === "men") selectedCat = CATEGORIES[3];
      if (selectedCat === "women") selectedCat = CATEGORIES[4];
      dispatch(setSelectedCategory(selectedCat));
   };

   const toggleClothing = () => {
      setIsClothingExpanded(!isClothingExpanded);
   };

   return (
      <SidebarContainer mobile={isMobile}>
         <SidebarTitle mobile={isMobile} />
         {isMobile ? (
            <MobileCategoryList selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} />
         ) : (
            <DesktopCategoryList
               selectedCategory={selectedCategory}
               onCategoryClick={handleCategoryClick}
               isClothingExpanded={isClothingExpanded}
               toggleClothing={toggleClothing}
            />
         )}
      </SidebarContainer>
   );
}
