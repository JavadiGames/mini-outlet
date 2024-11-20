import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { CategoryTwoTone, LaptopTwoTone, DiamondTwoTone, Checkroom, ExpandLess, ExpandMore, Woman, Man } from "@mui/icons-material";
import CategoryListItem from "../components/CategoryLisItem";

const categoryIcons = {
   all: CategoryTwoTone,
   electronics: LaptopTwoTone,
   jewelery: DiamondTwoTone,
   "women's clothing": Woman,
   "men's clothing": Man,
};

export default function DesktopCategoryList({ categories, selectedCategory, onCategoryClick, isClothingExpanded, toggleClothing, classes }) {
   const clothingCategories = categories.filter((cat) => cat.includes("clothing"));
   const nonClothingCategories = categories.filter((cat) => !cat.includes("clothing"));

   return (
      <List>
         {nonClothingCategories.map((category) => (
            <CategoryListItem
               key={category}
               category={category}
               selectedCategory={selectedCategory}
               onCategoryClick={onCategoryClick}
               classes={classes}
               isMobile={false}
            />
         ))}
         <ListItem className={classes.listItem} sx={{ marginBottom: "-2px" }}>
            <ListItemButton onClick={toggleClothing}>
               <ListItemIcon>
                  <Checkroom sx={{ marginInlineEnd: 1.5 }} />
               </ListItemIcon>
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
               {clothingCategories.map((category) => (
                  <CategoryListItem
                     key={category}
                     category={category}
                     selectedCategory={selectedCategory}
                     onCategoryClick={onCategoryClick}
                     classes={classes}
                     isMobile={false}
                  />
               ))}
            </List>
         </Collapse>
      </List>
   );
}
