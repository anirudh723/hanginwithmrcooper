import * as React from 'react';
import { checkout, ProductDataModel } from '../api';


export const ShoppingCart: React.SFC = props => {
    const [productsInCart, setProductsInCart] = React.useState(new Map<ProductDataModel, number>());
    const [checkoutResult, setCheckoutResult] = React.useState("");

    const handleCheckout = () => {
        let products = Array.from(productsInCart.keys());
        
        checkout(products)
        .then(result => setCheckoutResult(result));  
    }

    return (
        <div className="has-text-light">
            {productsInCart.forEach((quantity, product) => {
                return (
                    <div className="productInfo">
                        <a href={`/details/${product.id}`}>
                            <img src={product.imageUrl} width="500" />
                            <h3>Name: {product.name}</h3>
                        </a>
                        <p>Price: {product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <p>Quantity: {quantity}</p>
                        <p>Total Price: ${parseFloat(product.price.substring(1).replace(/,/g, '')) * quantity}</p>
                    </div>
                );
            })}
            <button onClick={handleCheckout}>Checkout</button>
            <span>{checkoutResult}</span>
        </div>
    )
}