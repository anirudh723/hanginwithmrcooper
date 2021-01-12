import * as React from 'react';
import { getProductById, getProducts, ProductDataModel } from '../../api';
import './ProductList.css'

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
        
    // filter the product list by the search criteria passed from props 
    const filterProducts = (products: ProductDataModel[]) => {
        const searchInput = filterCriteria[0];
        const searchType = filterCriteria[1];
        var filteredProducts = Array.from(products);
        if (searchInput !== "") {
            if (searchType === NAME) {
                filteredProducts = products.filter(product => product.name === searchInput)
            } else if (searchType === DESCRIPTION) {
                filteredProducts = products.filter(product => product.description === searchInput)
            }
        }
        return filteredProducts;
    }

    const handleAddToCart = async (productId: number) => {
        const product = await getProductById(productId);
        if (product.stock < productQuantities.get(productId)) {
            alert(NOT_ENOUGH_QUANTITY);
        } else {
            addToCart(product, productQuantities.get(productId));
        }
    }

    return (
        <div className="has-text-light">
            {products.map(product => {
                return (
                    <div className="productInfo pb-3 columns is-vcentered">
                        <div className="column is-half">
                            <a href={`/details/${product.id}`}>
                                <img alt="Product" src={product.imageUrl} width="500"/>
                                <h3>Name: {product.name}</h3>
                            </a>
                        </div>
                        <div className="column is-half">
                            <p>Price: {product.price}</p>
                            <p>Description: {product.description}</p>
                            <p>Rating: {product.rating}</p>
                            <input
                                className="p-1"
                                type="number"
                                placeholder="Enter product quantity"
                                onChange={(e) => {setProductQuantities(productQuantities.set(product.id, e.target.value))}}
                            />
                            <div>
                                <button className="mt-2 is-size-6" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>    
                            </div>                            
                        </div>        
                    </div>
                );
            })}
        </div>
    )
}