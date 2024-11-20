import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./shared/hooks/useAuth";
import { ProtectedRoute } from "./features/users/login/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./shared/redux/store";
import { fetchProducts } from "./shared/redux/productsSlice";

import NotFound from "./shared/NotFound";
import ShopItemDetails from "./features/shop-window/containers/ShopItemDetails";
import MiniOutlet from "./features/shop-window/containers/MiniOutlet";
import LoginPage from "./features/users/login/LoginPage";
import UserPage from "./features/users/login/UserPage";
import CartPage from "./features/users/cart/CartPage";

import "./styles/App.css";

function App() {
   useEffect(() => {
      store.dispatch(fetchProducts());
   }, []);

   return (
      <>
         <Provider store={store}>
            <AuthProvider>
               <Routes>
                  <Route path="/" element={<MiniOutlet />} />
                  <Route path="/products/:id" element={<ShopItemDetails />} />
                  <Route
                     path="/user"
                     element={
                        <ProtectedRoute>
                           <UserPage />
                        </ProtectedRoute>
                     }
                  />
                  <Route
                     path="/cart"
                     element={
                        <ProtectedRoute>
                           <CartPage />
                        </ProtectedRoute>
                     }
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<NotFound />} />
               </Routes>
            </AuthProvider>
         </Provider>
      </>
   );
}

export default App;
