import * as React from 'react';
import { getProductById, getProducts, ProductDataModel } from '../../api';
import { Product } from './Product'
import { useFilterProducts } from '../../useFilterProducts';
import { useSortProducts } from '../../useSortProducts';
import { StoreContext } from '../../pages/Store'

export const ProductList: React.FC = props => {
    const [products, setProducts] = React.useState(Array<ProductDataModel>());
    const sortProducts = useSortProducts();
    const filterProducts = useFilterProducts();
    const { filterCriteria, sortTypes, addToCart } = React.useContext(StoreContext);

    React.useEffect(() => {
        (async function () {
            let products = await getProducts();
            products = filterProducts(products, filterCriteria);
            products = sortProducts(products, sortTypes);
            setProducts(products);
        })()
    }, [filterCriteria, sortTypes]);

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