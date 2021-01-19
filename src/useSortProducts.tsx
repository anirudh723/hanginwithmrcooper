import { ProductDataModel } from './api';
import { ORDER } from './Order';

const _ = require("lodash");

// custom hook that returns a function to sort products
export const useSortProducts = (): ((products: ProductDataModel[], sortTypes: Map<string, ORDER>) => ProductDataModel[]) => {

    const sortProducts = (products: ProductDataModel[], sortTypes: Map<string, ORDER>): ProductDataModel[] => {
        var sortedProducts = Array.from(products);
        if (!(_.isEmpty(sortTypes))) {
            let types = Array.from(sortTypes.keys());
            let orders = Array.from(sortTypes.values());
            sortedProducts = _.orderBy(sortedProducts, types, orders);
        }
        return sortedProducts;
    }
    
    return sortProducts;
}