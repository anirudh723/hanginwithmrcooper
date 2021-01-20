import * as React from 'react';
import { getUserAccountBalance, ProductDataModel } from './api';
import { ORDER } from './Order';
import { getNumericBalance } from './utils/getNumericBalance'
import { SortType } from './SortType'
import { FilterType } from './FilterType';

const NOT_ENOUGH_QUANTITY = "Not enough quantity for this product. Please select a lower value";

// custom hook to hold the state of the Store
export const useStoreState = () => {
    const [productsToBuy, setProductsToBuy] = React.useState(new Map<ProductDataModel, number>());
    const [accountBalance, setAccountBalance] = React.useState("");
    const [filterCriteria, setFilterCriteria] = React.useState<FilterType[]>([]);
    const [sortTypes, setSortTypes] = React.useState<SortType[]>([]);

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
    const applyFilterCriteria = (filters: FilterType[]): void => {
        setFilterCriteria(Array.from(filters));
    }

    // callback function passed to Search to save search critera here and then pass down to ProductList
    const applySortCriteria = (sortType: keyof ProductDataModel, order: ORDER): void => {
        let newSortType: SortType = [sortType, order];
        for (const { currentSortType, index } of sortTypes.map((currentSortType, index) => ({ currentSortType, index }))) {
            if (currentSortType[0] === sortType) {
                sortTypes.splice(index, 1, newSortType); // replace the existing sortType
                setSortTypes(Array.from(sortTypes));
                return;
            }
        }
        // this sort type was never added before, just add it now
        sortTypes.push(newSortType);
        setSortTypes(Array.from(sortTypes));
    }

    return { productsToBuy, accountBalance, filterCriteria, sortTypes, addToCart, clearCart, applyFilterCriteria, applySortCriteria }
}