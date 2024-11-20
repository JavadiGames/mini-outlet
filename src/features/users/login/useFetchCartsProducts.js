import { useState, useEffect } from 'react';
import fetchProductsFromCart from './fetchProductsFromCart';

export default function useFetchCartsProducts(carts)
{
  const [cartsProducts, setCartsProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const cartsProducts = {};
        await Promise.all(carts.map(async (cart) => {
          const products = await fetchProductsFromCart(cart);
          cartsProducts[cart.id] = products;
        }));
        setCartsProducts(cartsProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (carts.length > 0) {
      getAllProducts();
    }
  }, [carts]);

  return { cartsProducts, loading, error };
}