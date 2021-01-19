import * as React from 'react';
import { getUserAccountBalance, isLoggedIn, ProductDataModel } from '../api';
import { Redirect } from 'react-router';
import { ProductList } from '../components/products/ProductList';
import { ShoppingCart } from '../components/cart';
import { Search } from '../components/search/Search'
//import { Sort } from '../components/sort';
import { Sort } from '../components/sort/Sort';
import { ORDER } from '../Order';
import { getNumericBalance } from '../utils/getNumericBalance'

const NOT_ENOUGH_QUANTITY = "Not enough quantity for this product. Please select a lower value";

export const Store: React.FC = props => {
    const [productsToBuy, setProductsToBuy] = React.useState(new Map<ProductDataModel, number>());
    const [accountBalance, setAccountBalance] = React.useState("");
    const [filterCriteria, setFilterCriteria] = React.useState(new Map<string, string | number[]>());
    const [sortTypes, setSortTypes] = React.useState(new Map<string, ORDER>());
    
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
    const applyFilterCriteria = (filters: Map<string, string | number[]>): void => {
        setFilterCriteria(new Map(filters));
    }

    // // callback function passed to Search to save sort critera here and then pass down to ProductList
    // const applySortCriteria = (sortCriteria: string): void => {
    //     setSortCriteria(sortCriteria);
    // }

    // props object for each child component
    const shoppingCartProps = { productsToBuy: productsToBuy, accountBalance: accountBalance, clearCart: clearCart }
    const searchProps = { applyFilterCriteria: applyFilterCriteria }
    const sortProps = {sortTypes: sortTypes, setSortTypes: setSortTypes}
    const productListProps = { addToCart: addToCart, filterCriteria: filterCriteria, sortTypes: sortTypes }

    return (
        <div className="container is-fluid has-background-dark">
            <div>
                <Search {...searchProps}/>
            </div>
            <div className="column is-half">
                <Sort {...sortProps} />
            </div>
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