import * as React from 'react';
import { getProducts, ProductDataModel } from '../api';
import '../ProductList.css'

export const ProductList: React.SFC = props => {
    const [products, setProducts] = React.useState(Array<ProductDataModel>());

    React.useEffect(() => {
        (async function() {
                let result = await getProducts();
                setProducts(result);
        })()
    }, []);
        
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
                    </div>
                );
            })}
        </div>
    )
}