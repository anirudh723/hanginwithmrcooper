import * as React from 'react';
import { checkout, getUserName, getUserAccountBalance, ProductDataModel } from '../api';


export const ShoppingCart: React.FC<{productsToBuy: Map<ProductDataModel, number>}> = ({ productsToBuy }) => {
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

    const handleCheckout = () => {
        let products = Array.from(productsToBuy.keys());
        let totalCartBalance = calculateCartBalance();
        console.log(totalCartBalance, parseInt(accountBalance.substring(1).replace(/,/g, '')));
        if (totalCartBalance > parseInt(accountBalance.substring(1).replace(/,/g, ''))) {
            alert("You do not have enough balance to purchase everything in the cart.");
        } else {
            checkout(products)
            .then(result => setCheckoutResult(result));
        }
          
    }

    const calculateCartBalance = () => {
        let totalCartBalance = 0;
        Array.from(productsToBuy.entries()).map((productAndQuantity) => {
            let productPrice = parseFloat((productAndQuantity[0]).price.substring(1).replace(/,/g, '')) * productAndQuantity[1];
            totalCartBalance += productPrice;
        });
        return totalCartBalance;
    } 

    return (
        <div className="has-text-light">
            {userName != "" ? (
                <div>
                    <p>Hello, {userName}. Your account balance is {accountBalance}.</p>
                    {Array.from(productsToBuy.entries()).map((productAndQuantity) => {
                        if (productAndQuantity[1] > 0) {
                           return (
                                <div className="productInfo">
                                    <a href={`/details/${productAndQuantity[0].id}`}>
                                        <img src={productAndQuantity[0].imageUrl} width="500" />
                                        <h3>Name: {productAndQuantity[0].name}</h3>
                                    </a>
                                    <p>Price: {productAndQuantity[0].price}</p>
                                    <p>Rating: {productAndQuantity[0].rating}</p>
                                    <p>Quantity: {productAndQuantity[1]}</p>
                                    <p>Total Price: ${parseFloat((productAndQuantity[0]).price.substring(1).replace(/,/g, '')) * productAndQuantity[1]}</p>
                                </div>
                            ); 
                        }
                    })}
                    <button onClick={handleCheckout}>Checkout</button>
                    <span>{checkoutResult}</span>
                </div>
            ) :
                <div></div>}
        </div>
    )
}