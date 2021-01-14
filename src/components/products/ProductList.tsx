import * as React from 'react';
import { getProductById, getProducts, ProductDataModel } from '../../api';
import { Product } from './Product'

const NAME = "Product Name";
const DESCRIPTION = "Product Description";

interface ProductListProps {
    addToCart: (productToAdd: ProductDataModel, quantity: number) => void,
    filterCriteria: string[]
}

export const ProductList: React.FC<ProductListProps> = ({addToCart, filterCriteria}) => {
    const [products, setProducts] = React.useState(Array<ProductDataModel>());

    React.useEffect(() => {
        (async function() {
            let products = await getProducts();
            let filteredProducts = filterProducts(products)
            setProducts(filteredProducts);
            let initialProductQuantities = new Map();
            filteredProducts.forEach(product => initialProductQuantities.set(product.id, 0));
        })()
    }, [filterCriteria]);
        
    // filter the product list by the search criteria passed from props 
    const filterProducts = (products: ProductDataModel[]) => {
        const searchInput = filterCriteria[0];
        const searchType = filterCriteria[1];
        var filteredProducts = Array.from(products);
        if (searchInput !== "") { // only filter if something was specified in search box
            if (searchType === NAME) {
                filteredProducts = products.filter(product => product.name === searchInput)
            } else if (searchType === DESCRIPTION) {
                filteredProducts = products.filter(product => product.description === searchInput)
            }
        }
        return filteredProducts;
    }

    // callback passed to each Product to notify when user purchases item and its quantity. This invokes the
    // callback passed from this components parent
    const handleAddToCart = async (productId: number, quantity: number) => {
        const product = await getProductById(productId);
        addToCart(product, quantity);
    }

    return (
        <div className="has-text-light">
            {products.map(product => {
                const productProps = { product: product, handleAddToCart: handleAddToCart, store: true }
                return (
                    <Product {...productProps}/>
                );
            })}
        </div>
    )
}