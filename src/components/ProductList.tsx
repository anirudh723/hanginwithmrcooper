import * as React from 'react';
import { getProductById, getProducts, ProductDataModel } from '../api';
import '../styles/ProductList.css'

const NOT_ENOUGH_QUANTITY = "Not enough quantity for this product. Please select a lower value";
const NAME = "Product Name";
const DESCRIPTION = "Product Description";

export const ProductList: React.FC<{addToCart: (productToAdd: ProductDataModel, quantity: number) => void, filterCriteria: string[]}> = ({addToCart, filterCriteria}) => {
    
    const [products, setProducts] = React.useState(Array<ProductDataModel>());
    const [productQuantities, setProductQuantities] = React.useState(new Map());

    React.useEffect(() => {
        (async function() {
            let products = await getProducts();
            let filteredProducts = filterProducts(products)
            setProducts(filteredProducts);
        })()
    }, [filterCriteria]);
        

    const filterProducts = (products: ProductDataModel[]) => {
        const searchInput = filterCriteria[0];
        const searchType = filterCriteria[1];
        var filteredProducts = Array.from(products);
        if (searchInput != "") {
            if (searchType == NAME) {
                filteredProducts = products.filter(product => product.name == searchInput)
            } else if (searchType == DESCRIPTION) {
                filteredProducts = products.filter(product => product.description == searchInput)
            }
        }
        return filteredProducts;
    }

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, productId: number) => {
        event.preventDefault();
        setProductQuantities(productQuantities.set(productId, event.target.value))
    }

    const handleAddToCart = async (event: React.MouseEvent, productId: number) => {
        event.preventDefault();
        const product = await getProductById(productId);
        if (product.stock < productQuantities.get(productId)) {
            alert(NOT_ENOUGH_QUANTITY); // could do a modal instead
        } else {
            addToCart(product, productQuantities.get(productId));
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
                            onChange={(e) => handleQuantityChange(e, product.id)}
                        />
                        <button onClick={e => handleAddToCart(e, product.id)}>Add to Cart</button>
                    </div>
                );
            })}
        </div>
    )
}