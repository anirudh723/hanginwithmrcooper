import * as React from 'react';
import { isLoggedIn, ProductDataModel } from '../api';
import { Redirect } from 'react-router';
import { ProductList } from '../components/products/ProductList';
import { ShoppingCart } from '../components/cart';
import { Search } from '../components/search/Search'
import { Sort } from '../components/sort/Sort';
import { useStoreState } from '../useStoreState';
  
export const StoreContext = React.createContext({
    productsToBuy: new Map(), 
    accountBalance: "", 
    filterCriteria: new Map(), 
    sortTypes: new Map(), 
    addToCart: (productToBuy: ProductDataModel, quantity: number) => {return;}, 
    clearCart: (cartTotal: number) => {return;}
});

export const Store: React.FC = props => {
    const { productsToBuy, accountBalance, filterCriteria, sortTypes, addToCart, clearCart, applyFilterCriteria, applySortCriteria } = useStoreState();

    return (
        <div className="container is-fluid has-background-dark">
            <div>
                <Search {...{ applyFilterCriteria: applyFilterCriteria }}/>
            </div>
            <div className="column is-half">
                <Sort {...{ applySortCriteria: applySortCriteria}} />
            </div>
            <div className="columns">
                <StoreContext.Provider value={ { productsToBuy, accountBalance, filterCriteria, sortTypes, addToCart, clearCart } }> 
                    <div className="column is-two-thirds">
                        <p className="notification is-primary">Product list</p>
                        <ProductList />
                    </div>
                    <div className="column">
                        <p className="notification is-danger">Shopping cart</p>
                        <ShoppingCart />
                    </div>
                </StoreContext.Provider>
            </div>
            {
                !isLoggedIn() &&
                <Redirect to="/" />
            }
        </div>
    );
}