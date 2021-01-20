import { ProductDataModel } from './api';
import { getNumericBalance } from './utils/getNumericBalance';
import { FilterType } from './FilterType';
import { NAME, DESCRIPTION, PRICE, RATING } from './utils/constants';

// custom hook that returns a function to filter products
export const useFilterProducts = (): ((products: ProductDataModel[], filterCriteria: FilterType[]) => ProductDataModel[]) => {

    // creates an array of filters (callbacks) using the given filter criteria
    const getFilters = (filterCriteria: FilterType[]): ((product: ProductDataModel) => boolean)[] => {
        let filters: { (product: ProductDataModel): boolean }[] = [];
        for (let f of filterCriteria) {
            switch (f[0]) {
                case NAME:
                    filters.push((product) => product.name.toLowerCase() === (f[1] as string).toLowerCase());
                    break;
                case DESCRIPTION:
                    filters.push((product) => product.description.toLowerCase() === (f[1] as string).toLowerCase());
                    break;
                case PRICE:
                    filters.push((product) => getNumericBalance(product.price) >= f[1][0] && getNumericBalance(product.price) <= f[1][1]);
                    break;
                case RATING:
                    filters.push((product) => product.rating >= f[1][0] && product.rating <= f[1][1]);
                    break;
            }
        }
        return filters;
    }

    // applies a chain of callbacks on the products and returns the filtered subset of them
    const filterProducts = (products: ProductDataModel[], filterCriteria: FilterType[]): ProductDataModel[] => {
        let filters = getFilters(filterCriteria);
        let filteredProducts = filters.reduce((p, f) => p.filter(f), products)
        return filteredProducts;
    }

    return filterProducts;
}