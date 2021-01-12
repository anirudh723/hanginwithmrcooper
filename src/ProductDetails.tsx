import * as React from 'react';
import { getProductById, isLoggedIn, isAdmin, ProductDataModel } from './api';
import { Redirect, useParams } from 'react-router';
import './styles/ProductDetails.css'

const _ = require("lodash")

export const ProductDetails: React.FC = props => {
    const [product, setProduct] = React.useState<ProductDataModel>();
    const [isUserAdmin, setIsUserAdmin] = React.useState(false);
    const [detailToChange, setDetailToChange] = React.useState("");
    const [changeToDetail, setChangeToDetail] = React.useState("");
    let { id } = useParams<{ id: string }>();


    React.useEffect(() => {
        (async function() {
            let productResult = await getProductById(+id);
            let adminResult = await isAdmin();
            setProduct(productResult);
            setIsUserAdmin(adminResult);
        })()
    }, []);

    const handleDetailToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setDetailToChange(event.target.value);
    }

    const handleChangeToDetail = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setChangeToDetail(event.target.value);
    }

    const handleProductDetailChange = (event: React.MouseEvent) => {
        event.preventDefault();
        if (product) {
            let originalValue = _.get(product, detailToChange.toLowerCase())
            if (originalValue) {
                +originalValue 
                    ? setProduct(_.clone(_.set(product, detailToChange.toLowerCase(), parseInt(changeToDetail)))) 
                    : setProduct(_.clone(_.set(product, detailToChange.toLowerCase(), changeToDetail)));
            }
        }
    }

    return (
        <div className="container is-fluid has-text-light">
            <h2>This is the product details page!</h2>
            {
                !isLoggedIn() &&
                <Redirect to="/" />
            }

            <div className="columns">
              {/* Conditional rendering to make sure we fetch product data before rendering */}
                {product ? (
                    <div className="column is-half">
                        <a href={`/details/${product.id}`}>
                            <img src={product.imageUrl} width="500"/>
                            <h3>Name: {product.name}</h3>
                        </a>
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price}</p>
                        <p>Rating: {product.rating}</p>
                    </div>
                ) : <div></div>}

                {isUserAdmin ? (
                    <div className="rows column is-half changeDetailsContainer">
                        <h2>Change product details:</h2>
                        <div>
                            <label>What product detail would you like to change?
                                <input 
                                    type="text" 
                                    placeholder="Enter product detail here..."
                                    value={detailToChange}
                                    onChange={handleDetailToChange}/>
                            </label>
                        </div>
                        <div>
                            <label>Specify the change below
                                <input 
                                    type="text" 
                                    placeholder="Enter adjustment here..."
                                    value={changeToDetail}
                                    onChange={handleChangeToDetail}/>
                            </label>    
                        </div>
                        <button onClick={handleProductDetailChange}>Submit change</button>
                    </div>
                ) :
                <div></div>}  
            </div>
            
        </div>
    );
}