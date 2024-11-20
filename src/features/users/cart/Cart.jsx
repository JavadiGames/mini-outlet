export default function Cart({ cart}){
    const productIds = cart.products.map(product => product.productId);

    return(
        <div >{...[productIds]}</div>
    )
}