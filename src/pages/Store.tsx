import * as React from 'react';
import { isLoggedIn, ProductDataModel } from '../api';
import { Redirect } from 'react-router';
import { ProductList } from '../components/products/ProductList';
import { ShoppingCart } from '../components/cart';
import { Search } from '../components/search'

export const Store: React.FC = props => {
    const [filterCriteria, setFilterCriteria] = React.useState(["",""]); // either all products in store or ones searched for
    const [productsToBuy, setProductsToBuy] = React.useState(new Map<ProductDataModel, number>());
    
    // callback function passed to ProductList to save desired products and then pass down to ShoppingCart
    const addToCart = (productToBuy: ProductDataModel, quantity: number): void => {
        let productsToBuyCopy = new Map(productsToBuy);
        setProductsToBuy(productsToBuyCopy.set(productToBuy, quantity));
    }

    // callback function passed to ShoppingCart to clear the cart here once the user checks out
    const clearCart = (): void => {
        setProductsToBuy(new Map());
    } 

    // callback function passed to Search to save search critera here and then pass down to ProductList
    const applyFilterCriteria = (input: string, type: string): void => {
        let newCriteria: string[] = [input, type];
        setFilterCriteria(newCriteria);
    }

    // props object for each child component
    const shoppingCartProps = { productsToBuy: productsToBuy, clearCart: clearCart }
    const searchProps = { applyFilterCriteria: applyFilterCriteria }
    const productListProps = { addToCart: addToCart, filterCriteria: filterCriteria }

    return (
        <div className="container is-fluid has-background-dark">
            <Search {...searchProps}/>
            <div className="columns">   
                <div className="column is-two-thirds">
                    <p className="notification is-primary">Product list</p>
                    <ProductList {...productListProps}/>
                </div>
                <div className="column">
                    <p className="notification is-danger">Shopping cart</p>
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