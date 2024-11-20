import { useState, useEffect } from "react";

export default function useFetchProduct(productId) {
   const [product, setProduct] = useState({});
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const data = await response.json();
            setProduct(data);
         } catch (error) {
            console.error("Error fetching product:", error);
            setError(error);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [productId]);

   return { product, loading, error };
}
