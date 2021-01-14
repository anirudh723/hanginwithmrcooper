import * as React from 'react';
import {  ProductDataModel } from '../../api';
import './Product.css'

interface ProductProps {
    product: ProductDataModel,
    handleAddToCart?:  (productId: number, quantity: number) => void,
    store: boolean
}

export const Product: React.FC<ProductProps> = ({product, handleAddToCart, store}) => {
    const [quantity, setQuantity] = React.useState(0);

    const addToCart = (productId: number): void => {
        handleAddToCart && handleAddToCart(productId, quantity);
        setQuantity(0);
    }

    return (
        <div className="productInfo pb-3 columns is-vcentered">
            <div className="column is-half">
                <a href={`/details/${product.id}`}>
                    <img alt="Product" src={product.imageUrl} width="500" />
                    <h3>Name: {product.name}</h3>
                </a>
            </div>
            <div className="column is-half">
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
                <p>Rating: {product.rating}</p>
                <p>Available quantity: {product.stock}</p>
                {store ? (
                    <div>
                        <input
                            className="p-1"
                            id={(product.id).toString()}
                            type="number"
                            placeholder="Enter product quantity"
                            value={quantity}
                            onChange={(e) => { setQuantity(e.target.valueAsNumber) }}
                        />
                        <div>
                            <button disabled={quantity <= 0} className="mt-2 is-size-6" onClick={() => addToCart(product.id)}>Add to Cart</button>
                        </div>  
                    </div>
                ) : <div></div>}
            </div>
        </div>
    )
}