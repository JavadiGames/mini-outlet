import { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";

import { selectSelectedCategory, setSearchTerm } from "../../shared/redux/productsSlice";

export default function Searchbar() {
   const [searchTerm, setLocalSearchTerm] = useState("");
   const dispatch = useDispatch();
   const selectedCategory = useSelector(selectSelectedCategory);

   const handleSearchChange = (event) => {
      setLocalSearchTerm(event.target.value);
   };

   const handleSearchSubmit = (event) => {
      event.preventDefault();
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm !== "" || !selectedCategory) {
         dispatch(setSearchTerm(trimmedSearchTerm));
      }
   };

   return (
      <Paper
         component="form"
         onSubmit={handleSearchSubmit}
         sx={{
            p: "6px 6px",
            display: "flex",
            alignItems: "center",
            width: 300,
            borderRadius: "19px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            m: { xs: "10px", sm: "20px" },
         }}>
         <InputBase sx={{ mx: 1, flex: 1 }} placeholder="Search..." aria-label="search" value={searchTerm} onChange={handleSearchChange} />
         <IconButton
            type="submit"
            aria-label="search"
            sx={{
               p: "10px",
               color: "white",
               bgcolor: "primary.main",
               "&:hover": { bgcolor: "primary.dark" },
               borderRadius: "40%",
               marginRight: "-2px",
            }}>
            <SearchIcon />
         </IconButton>
      </Paper>
   );
}
