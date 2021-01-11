import * as React from 'react';
import { getProductById, getProducts, ProductDataModel } from '../api';
import '../ProductList.css'

export const ProductList: React.SFC = props => {
    const notEnoughQuantity = "Not enough quantity for this product. Please select a lower value";
    const [products, setProducts] = React.useState(Array<ProductDataModel>());
    const [productQuantities, setProductQuantities] = React.useState(new Map());

    React.useEffect(() => {
        (async function() {
                let result = await getProducts();
                setProducts(result);
        })()
    }, []);
        
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, productId: number) => {
        event.preventDefault();
        setProductQuantities(productQuantities.set(productId, event.target.value))
    }

    const handleAddToCart = async (productId: number) => {
        const product = await getProductById(productId);
        if (product.stock < productQuantities.get(productId)) {
            alert(notEnoughQuantity);
        } else {

        }
    }

    return (
        <div className="has-text-light">
            {products.map(product => {
                return (
                    <div className="productInfo">
                        <a href={`/details/${product.id}`}>
                            <img src={product.imageUrl} width="500"/>
                            <h3>Name: {product.name}</h3>
                        </a>
                        <p>Price: {product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <input
                            type="number"
                            placeholder="Enter product quantity"
                            value={productQuantities.get(product.id)}
                            onChange={(e) => handleQuantityChange(e, product.id)}
                        />
                        <button onClick={handleAddToCart(product.id)}>Add to Cart</button>
                    </div>
                );
            })}
        </div>
    )
}