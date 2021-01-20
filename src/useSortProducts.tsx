import { ProductDataModel } from './api';
import { ORDER } from './Order';
import { SortType } from './SortType';

const _ = require("lodash");

// custom hook that returns a function to sort products
export const useSortProducts = (): ((products: ProductDataModel[], sortTypes: SortType[]) => ProductDataModel[]) => {

    const sortProducts = (products: ProductDataModel[], sortTypes: SortType[]): ProductDataModel[] => {
        var sortedProducts = Array.from(products);
        if (!(_.isEmpty(sortTypes))) {
            let [types, orders] = getTypesAndOrders(sortTypes);
            sortedProducts = _.orderBy(sortedProducts, types, orders);
        }
        return sortedProducts;
    }

    const getTypesAndOrders = (sortTypes: SortType[]): [(keyof ProductDataModel)[], ORDER[]] => {
        let types: (keyof ProductDataModel)[] = [];
        let orders: ORDER[] = [];
        for (let sortType of sortTypes) {
            types.push(sortType[0]);
            orders.push(sortType[1]);
        }
        return [types, orders];
    }
    
    return sortProducts;
}