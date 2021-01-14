import * as React from 'react';
import { getProductById, isAdmin, ProductDataModel } from '../../api';
import { Product } from './Product'
import { useParams } from 'react-router';
import './ProductDetail.css'
import { StarRating } from '../star/StarRating';

const _ = require("lodash")

export const ProductDetail: React.FC = props => {
    const initialState = { productName: "", productPrice: null, productDescription: "", productRating: null }
    let { id } = useParams<{ id: string }>();

    const [product, setProduct] = React.useState<ProductDataModel>();
    const [isUserAdmin, setIsUserAdmin] = React.useState(false);
    const [productName, setProductName] = React.useState(initialState.productName);
    const [productPrice, setProductPrice] = React.useState<number | null>(initialState.productPrice);
    const [productDescription, setProductDescription] = React.useState(initialState.productDescription);
    const [productRating, setProductRating] = React.useState<number>(0);
    
    React.useEffect(() => {
        (async function() {
            let productResult = await getProductById(+id);
            let adminResult = await isAdmin();
            setProduct(productResult);
            setIsUserAdmin(adminResult);
        })()
    }, []);

    const handleProductChange = (event: React.MouseEvent) => {
        event.preventDefault();
        if (product) {
            if (!(_.isEmpty(productName))) setProduct(_.clone(_.set(product, "name", productName)));
            if (productPrice) setProduct(_.clone(_.set(product, "price", "$" + productPrice.toString())));
            if (!(_.isEmpty(productDescription))) setProduct(_.clone(_.set(product, "description", productDescription)));
            if (productRating != 0) setProduct(_.clone(_.set(product, "rating", productRating)));
            setFieldsToDefault(event);
        }
    }

    const setFieldsToDefault = (event: React.MouseEvent) => {
        event.preventDefault();
        setProductName(initialState.productName);
        setProductPrice(initialState.productPrice);
        setProductDescription(initialState.productDescription);
        setProductRating(0);
    }

    const starRatingProps = {rating: productRating, setProductRating: setProductRating}
    return (
        <div className="columns">
            {product ? (
                <div className="column is-half">
                    <Product {...{ product: product, store: false }}/>
                </div>
            ) : <div></div>}

            {isUserAdmin ? (
                <form className="rows column is-one-quarter changeDetailsContainer p-4">
                    <h2 className="is-size-4">Change product details</h2>
                    <div className="field pt-2">
                        <label>Change Product Name</label>
                        <input
                            className="p-2 mb-5 detailChangeBox"
                            type="text"
                            placeholder="Enter new name here..."
                            value={productName}
                            onChange={(e) => { setProductName(e.target.value) }} 
                        />
                    </div>
                    <div className="field">
                        <label>Change Product Price</label>
                        <input
                            className="p-2 mb-5 detailChangeBox"
                            type="number"
                            placeholder="Enter new price here..."
                            value={productPrice || ""}
                            onChange={(e) => { setProductPrice(e.target.valueAsNumber) }} 
                        />
                    </div>
                    <div className="field">
                        <label>Change Product Description</label>
                        <textarea
                            className="p-2 mb-3 detailChangeBox"
                            placeholder="Enter new description here..."
                            value={productDescription}
                            onChange={(e) => { setProductDescription(e.target.value) }} 
                        />
                    </div>
                    <div className="field">
                        <label>Change Product Rating</label>
                        <StarRating {...starRatingProps}/>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button disabled={productPrice !== null && productPrice < 0} onClick={handleProductChange} className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button onClick={setFieldsToDefault} className="button is-link is-light">Cancel</button>
                        </div>
                    </div> 
                </form>
            ) :
                <div></div>}
        </div>
    );
}