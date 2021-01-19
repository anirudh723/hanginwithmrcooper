import * as React from 'react';
import { getProductById, getProducts, ProductDataModel } from '../../api';
import { ORDER } from '../../Order';
import { Product } from './Product'
import { useFilterProducts } from '../../useFilterProducts';
import { useSortProducts } from '../../useSortProducts';

// const _ = require("lodash");

interface ProductListProps {
    addToCart: (productToAdd: ProductDataModel, quantity: number) => void,
    filterCriteria: Map<string, string | number[]>,
    sortTypes: Map<string, ORDER>
}

export const ProductList: React.FC<ProductListProps> = ({addToCart, filterCriteria, sortTypes}) => {
    const [products, setProducts] = React.useState(Array<ProductDataModel>());

    React.useEffect(() => {
        (async function () {
            console.log("about to fetch products")
            let products = await getProducts();
            console.log("products recieved:", products)
            setProducts(products);
        })()
    }, [filterCriteria, sortTypes]);

    // let filteredProducts = useFilterProducts(products, filterCriteria);
    // setProducts(filteredProducts);
    // setProducts(useSortProducts(products, sortTypes));

    // callback passed to each Product to notify when user purchases item and its quantity.
    // This invokes the callback passed from this components parent
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