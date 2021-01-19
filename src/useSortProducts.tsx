import * as React from 'react';
import { ProductDataModel } from './api';
import { ORDER } from './Order';

const _ = require("lodash");

// custom hook for sorting
export const useSortProducts = (products: ProductDataModel[], sortTypes: Map<string, ORDER>) => {
    const [sortedProducts, setSortedProducts] = React.useState(products);
    React.useEffect(() => {
        if (!(_.isEmpty(sortTypes))) {
            var temp = Array.from(products);
            let types = Array.from(sortTypes.keys());
            let orders = Array.from(sortTypes.values());
            temp = _.orderBy(temp, types, orders);
            setSortedProducts(temp)
        }
    }, [sortTypes])
    return sortedProducts;
}