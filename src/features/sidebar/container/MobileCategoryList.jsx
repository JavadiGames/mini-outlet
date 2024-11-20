import { List } from "@mui/material";
import CategoryListItem from "../components/CategoryLisItem";
import { CATEGORIES } from "../../../shared/Constants";

export default function MobileCategoryList({ selectedCategory, onCategoryClick }) {
   return (
      <List sx={{ display: "flex", flexDirection: "row", padding: 0, overflowX: "auto", width: "100%" }}>
         {CATEGORIES.map((category) => (
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
