import { ProductDataModel } from './api';
import { getNumericBalance } from './utils/getNumericBalance'

const NAME = "Name";
const DESCRIPTION = "Description";
const PRICE = "Price";
const RATING = "Rating";

const _ = require("lodash");

// custom hook that returns a function to filter products
export const useFilterProducts = (): ((products: ProductDataModel[], filterCriteria: Map<string, string | number[]>) => ProductDataModel[]) => {

    const filterProducts = (products: ProductDataModel[], filterCriteria: Map<string, string | number[]>): ProductDataModel[] => {
        var filteredProducts = Array.from(products);
        Array.from(filterCriteria.entries()).map(([type, filter]) => {
            switch (type) {
                case NAME:
                    filteredProducts = _.filter(filteredProducts, product => product.name === filter);
                    break;
                case DESCRIPTION:
                    filteredProducts = _.filter(filteredProducts, product => product.description === filter);
                    break;
                case PRICE:
                    filteredProducts = _.filter(filteredProducts, product => getNumericBalance(product.price) >= filter[0] && getNumericBalance(product.price) <= filter[1]);
                    break;
                case RATING:
                    filteredProducts = _.filter(filteredProducts, product => product.rating >= filter[0] && product.rating <= filter[1]);
                    break;
            }
        })
        return filteredProducts;
    }
    
    return filterProducts;
}