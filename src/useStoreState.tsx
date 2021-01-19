import * as React from 'react';
import { getUserAccountBalance, ProductDataModel } from './api';
import { ORDER } from './Order';
import { getNumericBalance } from './utils/getNumericBalance'

const NOT_ENOUGH_QUANTITY = "Not enough quantity for this product. Please select a lower value";

// custom hook to hold the state of the Store
export const useStoreState = () => {
    const [productsToBuy, setProductsToBuy] = React.useState(new Map<ProductDataModel, number>());
    const [accountBalance, setAccountBalance] = React.useState("");
    const [filterCriteria, setFilterCriteria] = React.useState(new Map<string, string | number[]>());
    const [sortTypes, setSortTypes] = React.useState(new Map<string, ORDER>());

    React.useEffect(() => {
        (async function() {
            let initialAccountBalance = await getUserAccountBalance();
            setAccountBalance(initialAccountBalance);    
        })()
    }, []);

    // callback function passed to ProductList to save desired products and then pass down to ShoppingCart
    const addToCart = (productToBuy: ProductDataModel, quantity: number): void => {
        let productsToBuyCopy = new Map(productsToBuy);
        if (productToBuy.stock < quantity) {
            alert(NOT_ENOUGH_QUANTITY);
        } else {
            let oldQuantity = productsToBuyCopy.get(productToBuy) || 0;
            let newQuantity = oldQuantity + quantity;
            productToBuy.stock -= quantity;
            setProductsToBuy(new Map(productsToBuyCopy.set(productToBuy, newQuantity)));
        }
    }

    // callback function passed to ShoppingCart to clear the cart here once the user checks out
    const clearCart = (cartTotal: number): void => {
        setProductsToBuy(new Map());
        setAccountBalance("$" + (getNumericBalance(accountBalance) - cartTotal).toFixed(2));
    } 

    // callback function passed to Search to save search critera here and then pass down to ProductList
    const applyFilterCriteria = (filters: Map<string, string | number[]>): void => {
        setFilterCriteria(new Map(filters));
    }

    // callback function passed to Search to save search critera here and then pass down to ProductList
    const applySortCriteria = (sortType: string, order: ORDER): void => {
        setSortTypes(new Map(sortTypes.set(sortType, order)));
    }

    return { productsToBuy, accountBalance, filterCriteria, sortTypes, addToCart, clearCart, applyFilterCriteria, applySortCriteria }
}