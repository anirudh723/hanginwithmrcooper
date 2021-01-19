import * as React from 'react';
import { checkout, getUserName } from '../../api';
import { Product } from '../products/Product'
import { StoreContext } from '../../pages/Store'
import './index.css'

const PRICELESS = "priceless"
const CART_BALANCE_TOO_MUCH = "You cannot checkout because your cart balance is higher than your account balance."

export const ShoppingCart: React.FC = props => {
    const [checkoutResult, setCheckoutResult] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [cartTotal, setCartTotal] = React.useState(0);
    const { productsToBuy, accountBalance, clearCart } = React.useContext(StoreContext);

    React.useEffect(() => {
        (async function() {
            let nameResult = await getUserName();
            setUserName(nameResult);
            setCartTotal(calculateCartBalance());
        })()
    }, [productsToBuy]);

    // takes in the string dollar amount, strips the $ and commas, and returns the numeric value
    const getNumericBalance = (balance: string): number => {
        if (balance === PRICELESS) { // I'm making priceless just be 0.
            return 0;
        }
        return +parseFloat(balance.substring(1).replace(/,/g, '')).toFixed(2);
    }

    const handleCheckout = () => {
        let products = Array.from(productsToBuy.keys());
        checkout(products)
        .then(result => {
            clearCart(cartTotal);
            setCheckoutResult(result);
        });
    }

    const calculateCartBalance = () => {
        let totalCartBalance = 0;
        Array.from(productsToBuy.entries()).map((productAndQuantity) => {
            let productPrice = getNumericBalance((productAndQuantity[0]).price) * productAndQuantity[1];
            totalCartBalance += productPrice;
        });
        return totalCartBalance;
    } 

    return (
        <div className="has-text-light">
            {userName !== "" ? (
                <div>
                    <p className="pb-4">Hello, {userName}. Your account balance is {accountBalance}.</p>
                    {Array.from(productsToBuy.entries()).map((productAndQuantity) => {
                        if (productAndQuantity[1] > 0) {
                            const productProps = { product: productAndQuantity[0], store: false }
                            return (
                                <div className="productInfo pt-3 pb-3">
                                    <Product {...productProps}/>
                                    <div className="quantityAndTotalPrice">
                                        <p>Quantity: {productAndQuantity[1]}</p>
                                        <p>Total Price: ${getNumericBalance((productAndQuantity[0]).price) * productAndQuantity[1]}</p>
                                    </div>   
                                </div>
                            );
                        }
                    })}
                    <p>Your cart total is ${cartTotal}.</p>
                    <button disabled={cartTotal > getNumericBalance(accountBalance)} className="mt-4 is-size-6" onClick={handleCheckout}>Checkout</button>
                    <div>
                        <p>{checkoutResult}</p>
                        {cartTotal > getNumericBalance(accountBalance) ? <span>{CART_BALANCE_TOO_MUCH}</span> : <span></span>}
                    </div>
                </div>
            ) :
                <div></div>}
        </div>
    )
}