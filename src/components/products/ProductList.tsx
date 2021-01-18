import * as React from 'react';
import { createImportSpecifier } from 'typescript';
import { getProductById, getProducts, ProductDataModel } from '../../api';
import { ORDER } from '../../Order';
import { Product } from './Product'

const NAME = "Name";
const DESCRIPTION = "Description";
const PRICE = "Price";
const RATING = "Rating";
const PRICELESS = "priceless";

const _ = require("lodash");

interface ProductListProps {
    addToCart: (productToAdd: ProductDataModel, quantity: number) => void,
    filterCriteria: Map<string, string | number[]>,
    sortTypes: Map<string, ORDER>
    //sortCriteria: string
}

export const ProductList: React.FC<ProductListProps> = ({addToCart, filterCriteria, sortTypes}) => {
    const [products, setProducts] = React.useState(Array<ProductDataModel>());
    var isBusy = true;

    React.useEffect(() => {
        (async function() {
            let products = await getProducts();
            //let filteredProducts = filterProducts(products)
            //let sortedFilteredProducts = sortProducts(filteredProducts);
            setProducts(products);
            isBusy = false;
            // let initialProductQuantities = new Map();
            // filteredProducts.forEach(product => initialProductQuantities.set(product.id, 0));
        })()
    }, [filterCriteria, sortTypes]);
    
    // custom hook for filtering
    const useFilterProducts = () => {
        React.useEffect(() => {
            if (!isBusy) {
                var filteredProducts = Array.from(products);
            console.log("filter criteria size:", filterCriteria.size)
            Array.from(filterCriteria.entries()).map(typeAndFilter => {
                switch (typeAndFilter[0]) {
                    case NAME:
                        filteredProducts = _.filter(filteredProducts, product => product.name === typeAndFilter[1]);
                        break;
                    case DESCRIPTION:
                        filteredProducts = _.filter(filteredProducts, product => product.description === typeAndFilter[1]);
                        break;
                    case PRICE:
                        filteredProducts = _.filter(filteredProducts, product => getNumericBalance(product.price) >= typeAndFilter[1][0] && getNumericBalance(product.price) <= typeAndFilter[1][1]);
                        break;
                    case RATING:
                        filteredProducts = _.filter(filteredProducts, product => product.rating >= typeAndFilter[1][0] && product.rating <= typeAndFilter[1][1]);
                        break;
                }
            })
            let initialProductQuantities = new Map();
            filteredProducts.forEach(product => initialProductQuantities.set(product.id, 0))
            setProducts(filteredProducts);
            }
            
        }, [filterCriteria])
    }
    useFilterProducts();

    // custom hook for sorting
    const useSortProducts = () => {
        console.log("sort types size:", sortTypes.size, "content:", sortTypes)
        console.log("products:", products)
        React.useEffect(() => {
            if (!isBusy) {
                if (!(_.isEmpty(sortTypes))) {
                let types = Array.from(sortTypes.keys());
                let orders = Array.from(sortTypes.values());
                console.log("types:", types, "orders:", orders);
                var sortedProducts = _.orderBy(products, types, orders).
                setProducts(Array.from(sortedProducts));
            }
            }
            
        }, [sortTypes])
    }
    useSortProducts();

        
    // takes in the string dollar amount, strips the $ and commas, and returns the numeric value
    const getNumericBalance = (price: string): number => {
        if (price === PRICELESS) { // I'm making priceless just be 0.
            return 0;
        }
        return +parseFloat(price.substring(1).replace(/,/g, '')).toFixed(2);
    }

    // // filter the product list by the search criteria passed from props 
    // const filterProducts = (products: ProductDataModel[]) => {
    //     var filteredProducts = Array.from(products);
    //     Array.from(filterCriteria.entries()).map(typeAndFilter => {
    //         switch (typeAndFilter[0]) {
    //             case NAME:
    //                 filteredProducts = filteredProducts.filter(product => product.name === typeAndFilter[1]);
    //                 break;
    //             case DESCRIPTION:
    //                 filteredProducts = filteredProducts.filter(product => product.description === typeAndFilter[1]);
    //                 break;
    //             case PRICE:
    //                 filteredProducts = filteredProducts.filter(product => getNumericBalance(product.price) >= typeAndFilter[1][0] && getNumericBalance(product.price) <= typeAndFilter[1][1]);
    //                 break;
    //             case RATING:
    //                 filteredProducts = filteredProducts.filter(product => product.rating >= typeAndFilter[1][0] && product.rating <= typeAndFilter[1][1]);
    //                 break;
    //         }
    //     })
    //     return filteredProducts;
    // }

    // const sortProducts = (filteredProducts: ProductDataModel[]) => {
    //     var sortedFilteredProducts = Array.from(filteredProducts);
    //     switch (sortCriteria) {
    //         case NAME:
    //             sortedFilteredProducts = sortedFilteredProducts.sort((filteredProduct1, filteredProduct2) => filteredProduct1.name.localeCompare(filteredProduct2.name));
    //             break;
    //         case DESCRIPTION:
    //             sortedFilteredProducts = sortedFilteredProducts.sort((filteredProduct1, filteredProduct2) => filteredProduct1.description.localeCompare(filteredProduct2.description));
    //             break;
    //         case PRICE:
    //             sortedFilteredProducts = sortedFilteredProducts.sort((filteredProduct1, filteredProduct2) => getNumericBalance(filteredProduct1.price) - getNumericBalance(filteredProduct2.price));
    //             break;
    //         case RATING:
    //             sortedFilteredProducts = sortedFilteredProducts.sort((filteredProduct1, filteredProduct2) => filteredProduct1.rating - filteredProduct2.rating);
    //             break;
    //     }
    //     return sortedFilteredProducts;
    // }


    // callback passed to each Product to notify when user purchases item and its quantity.
    // This invokes the callback passed from this components parent
    const handleAddToCart = async (productId: number, quantity: number) => {
        const product = await getProductById(productId);
        addToCart(product, quantity);
    }

    // var prices = [
    //     { 'price': "$486,456.75" },
    //     { 'price': "$486,456.82" },
    //     { 'price': "$486,450.75" },
    //     { 'price': "$486,430.60" }
    //   ];
    // console.log(_.orderBy(prices, ['price'], ['desc']))
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