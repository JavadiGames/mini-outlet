import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  }
);

const initialState = {
  allProducts: [],
  status: 'idle',
  error: null,
  searchTerm: '',
  selectedCategory: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      if (action.payload !== '') state.selectedCategory = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.searchTerm = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setSelectedCategory } = productsSlice.actions;

export const selectAllProducts = (state) => state.products.allProducts;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export const selectFilteredProducts = (state) => {
  const allProducts = selectAllProducts(state);
  const searchTerm = selectSearchTerm(state);
  const selectedCategory = selectSelectedCategory(state);

  if (selectedCategory) {
    if (selectedCategory === "all") return allProducts;
    return allProducts.filter(product => product.category === selectedCategory);
  }

  if (searchTerm) {
    return allProducts.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return [];
};

export default productsSlice.reducer;