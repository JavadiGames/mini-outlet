import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import {
   selectSelectedCategory,
   selectFilteredProducts,
   selectProductsStatus,
   selectProductsError,
   selectAllProducts,
} from "../../../shared/redux/productsSlice";
import CategoryItems from "./CategoryItems";
import SearchedItems from "../../topbar/SearchedItems";
import CategorySidebar from "../../sidebar/container/CategorySidebar";

const MainPage = () => {
   const selectedCategory = useSelector(selectSelectedCategory);
   const filteredProducts = useSelector(selectFilteredProducts);
   const searchTerm = useSelector((state) => state.products.searchTerm);
   const status = useSelector(selectProductsStatus);
   const error = useSelector(selectProductsError);
   const allProducts = useSelector(selectAllProducts);

   let content;

   if (status === "loading") {
      content = <CircularProgress />;
   } else if (status === "failed") {
      content = <Typography color="error">{error}</Typography>;
   } else if (status === "succeeded") {
      if (searchTerm) {
         content = <SearchedItems items={filteredProducts} searchTerm={searchTerm} />;
      } else if (selectedCategory) {
         content = <CategoryItems items={filteredProducts} />;
      } else {
         content = <CategoryItems items={allProducts} />;
      }
   }
   return (
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
         <CategorySidebar />
         {content}
      </Box>
   );
};

export default MainPage;
