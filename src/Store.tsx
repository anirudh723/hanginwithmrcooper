import * as React from 'react';
import { isLoggedIn, ProductDataModel } from './api';
import { Redirect } from 'react-router';
import { ProductList } from './components/ProductList';
import { ShoppingCart } from './components/ShoppingCart';
import { Search } from './components/Search'

export const Store: React.FC = props => {
    const [filterCriteria, setFilterCriteria] = React.useState(["",""]); // either all products in store or ones searched for
    const [productsToBuy, setProductsToBuy] = React.useState(new Map<ProductDataModel, number>());
    
    // callback function passed to ProductList in order to pass the desired item (and its quantity) to ShoppingCart as a prop
    const addToCart = (productToBuy: ProductDataModel, quantity: number): void => {
        let productsToBuyCopy = new Map(productsToBuy);
        setProductsToBuy(productsToBuyCopy.set(productToBuy, quantity));
    }

    const applyFilterCriteria = (input: string, type: string): void => {
        let newCriteria: string[] = [input, type];
        setFilterCriteria(newCriteria);
    }

    const shoppingCartProps = { productsToBuy: productsToBuy }
    const searchProps = { applyFilterCriteria: applyFilterCriteria }
    const productListProps = { addToCart: addToCart, filterCriteria: filterCriteria }

    return (
        <div className="container is-fluid has-background-dark">
            <Search {...searchProps}/>
            <div className="columns">
                
                <div className="column is-two-thirds">
                    
                    <p className="notification is-primary">
                        Product list
                    </p>
                    <ProductList {...productListProps}/>
                </div>
                <div className="column">
                    <p className="notification is-danger">
                        Shopping cart
                    </p>
                    <ShoppingCart {...shoppingCartProps}/>
                </div>
            </div>
            {
                !isLoggedIn() &&
                <Redirect to="/" />
            }
        </div>
    );
}