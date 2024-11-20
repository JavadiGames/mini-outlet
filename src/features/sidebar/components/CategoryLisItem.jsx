import React from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { CategoryTwoTone, LaptopTwoTone, DiamondTwoTone, Woman, Man } from "@mui/icons-material";

const categoryIcons = {
   all: CategoryTwoTone,
   electronics: LaptopTwoTone,
   jewelery: DiamondTwoTone,
   "women's clothing": Woman,
   "men's clothing": Man,
};

export default function CategoryListItem({ category, selectedCategory, onCategoryClick, classes, isMobile }) {
   const Icon = categoryIcons[category] || CategoryTwoTone;

   return (
      <ListItem className={classes?.listItem} sx={{ p: isMobile ? 0 : undefined }}>
         <ListItemButton
            onClick={() => onCategoryClick(category)}
            selected={selectedCategory === category}
            sx={{
               "&.Mui-selected": {
                  border: "2px solid red",
                  borderRadius: isMobile ? "16px" : "16px",
                  flexShrink: isMobile ? 1 : undefined,
               },
            }}>
            <ListItemIcon sx={{ minWidth: isMobile ? 0 : 40 }}>
               <Icon sx={{ marginInlineEnd: isMobile ? 0 : 1.5 }} />
            </ListItemIcon>
            <ListItemText primary={category === "all" ? "All" : category.split("'")[0]} sx={{ display: isMobile ? "none" : "block" }} />
         </ListItemButton>
      </ListItem>
   );
}
