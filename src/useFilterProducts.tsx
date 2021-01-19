import * as React from 'react';
import { ProductDataModel } from './api';
import { getNumericBalance } from './utils/getNumericBalance'

const NAME = "Name";
const DESCRIPTION = "Description";
const PRICE = "Price";
const RATING = "Rating";

const _ = require("lodash");

// custom hook for filtering
export const useFilterProducts = (products: ProductDataModel[], filterCriteria: Map<string, string | number[]>) => {
    const [filteredProducts, setFilteredProducts] = React.useState(products);

    React.useEffect(() => {
        var temp = Array.from(filteredProducts);
        Array.from(filterCriteria.entries()).map(([type, filter]) => {
            switch (type) {
                case NAME:
                    temp = _.filter(temp, product => product.name === filter);
                    break;
                case DESCRIPTION:
                    temp = _.filter(temp, product => product.description === filter);
                    break;
                case PRICE:
                    temp = _.filter(temp, product => getNumericBalance(product.price) >= filter[0] && getNumericBalance(product.price) <= filter[1]);
                    break;
                case RATING:
                    temp = _.filter(temp, product => product.rating >= filter[0] && product.rating <= filter[1]);
                    break;
            }
        })
        setFilteredProducts(temp);

    }, []);
    return filteredProducts
}