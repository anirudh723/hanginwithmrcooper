import * as React from 'react';
import { checkout, getUserName, getUserAccountBalance, ProductDataModel } from '../../api';

export const ShoppingCart: React.FC<{productsToBuy: Map<ProductDataModel, number>, clearCart: () => void}> = ({ productsToBuy, clearCart }) => {
    const [checkoutResult, setCheckoutResult] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [accountBalance, setAccountBalance] = React.useState("");

    React.useEffect(() => {
        (async function() {
            let nameResult = await getUserName();
            let accountBalanceResult = await getUserAccountBalance();
            setUserName(nameResult);
            setAccountBalance(accountBalanceResult);
        })()
    }, []);

    // takes in the string dollar amount, strips the $ and commas, and returns the numeric value
    const getNumericBalance = (balance: string): number => {
        return parseFloat(balance.substring(1).replace(/,/g, ''));
    }

    const handleCheckout = () => {
        let products = Array.from(productsToBuy.keys());
        let totalCartBalance = calculateCartBalance();
        if (totalCartBalance > getNumericBalance(accountBalance)) {
            alert("You do not have enough balance to purchase everything in the cart.");
        } else {
            checkout(products)
            .then(result => {
                clearCart();
                setCheckoutResult(result);
            });
        }
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
                           return (
                                <div className="productInfo pb-3">
                                    <a href={`/details/${productAndQuantity[0].id}`}>
                                        <img alt="Product" src={productAndQuantity[0].imageUrl} width="500" />
                                        <h3>Name: {productAndQuantity[0].name}</h3>
                                    </a>
                                    <p>Price: {productAndQuantity[0].price}</p>
                                    <p>Rating: {productAndQuantity[0].rating}</p>
                                    <p>Quantity: {productAndQuantity[1]}</p>
                                    <p>Total Price: ${getNumericBalance((productAndQuantity[0]).price) * productAndQuantity[1]}</p>
                                </div>
                            ); 
                        }
                    })}
                    <button className="mt-4 is-size-6" onClick={handleCheckout}>Checkout</button>
                    <div>
                        <p>{checkoutResult}</p>
                    </div>
                </div>
            ) :
                <div></div>}
        </div>
    )
}