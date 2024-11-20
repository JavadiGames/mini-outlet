import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { CategoryTwoTone, LaptopTwoTone, DiamondTwoTone, Woman, Man } from "@mui/icons-material";
import CategoryListItem from "../components/CategoryLisItem";

const categoryIcons = {
   all: CategoryTwoTone,
   electronics: LaptopTwoTone,
   jewelery: DiamondTwoTone,
   "women's clothing": Woman,
   "men's clothing": Man,
};

export default function MobileCategoryList({ categories, selectedCategory, onCategoryClick }) {
   return (
      <List sx={{ display: "flex", flexDirection: "row", padding: 0, overflowX: "auto", width: "100%" }}>
         {categories.map((category) => (
            <CategoryListItem
               key={category}
               category={category}
               selectedCategory={selectedCategory}
               onCategoryClick={onCategoryClick}
               isMobile={true}
            />
         ))}
      </List>
   );
}
