import axios from "axios";

export default async function fetchProductsFromCart(cart) {
   const ids = cart.products.map((product) => product.productId);

   try {
      const requests = ids.map((id) => axios.get(`https://fakestoreapi.com/products/${id}`));
      // console.log(requests)
      const responses = await Promise.all(requests);
      console.log(responses);
      const products = responses.map((response) => response.data);
      console.log(products);
      return products;
   } catch (error) {
      console.error("Error fetching products: ", error);
      throw error;
   }
}
