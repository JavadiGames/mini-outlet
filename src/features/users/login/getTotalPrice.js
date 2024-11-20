import useFetchProduct from "./useFetchProduct";
import _ from 'lodash'

export default function getTotalPrice(products) 
{
    const prices = products.map(product => product.price);
    return _.sum(prices);
}

// export default function getTotalPrice(cart)
// {
//     const productIds = cart.products.map(product => product.productId);

//     const prices = productIds.map(pId => {
//         const {product} = useFetchProduct(pId);
//         return product.price;
//     })
//     console.log(prices)
//     return _.sum(prices);

// }