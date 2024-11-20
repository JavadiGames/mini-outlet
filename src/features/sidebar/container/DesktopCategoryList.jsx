import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { Checkroom, ExpandLess, ExpandMore } from "@mui/icons-material";
import CategoryListItem from "../components/CategoryLisItem";
import { CATEGORIES } from "../../../shared/Constants";
import useStyles from "../styles/SidebarStyles";

export default function DesktopCategoryList({ selectedCategory, onCategoryClick, isClothingExpanded, toggleClothing }) {
   const clothingCategories = CATEGORIES.filter((cat) => cat.includes("clothing"));
   const nonClothingCategories = CATEGORIES.filter((cat) => !cat.includes("clothing"));
   const classes = useStyles();

   return (
      <List>
         {nonClothingCategories.map((category) => (
            <CategoryListItem
               key={category}
               category={category}
               selectedCategory={selectedCategory}
               onCategoryClick={onCategoryClick}
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
                     isMobile={false}
                  />
               ))}
            </List>
         </Collapse>
      </List>
   );
}
