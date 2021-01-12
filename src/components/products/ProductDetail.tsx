import * as React from 'react';
import { getProductById, isAdmin, ProductDataModel } from '../../api';
import { useParams } from 'react-router';
import './ProductDetail.css'

const _ = require("lodash")

export const ProductDetail: React.FC = props => {
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

    const handleProductDetailChange = () => {
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
        <div className="columns">
            {/* Conditional rendering to make sure we fetch product data before rendering */}
            {product ? (
                <div className="column is-half">
                    <a href={`/details/${product.id}`}>
                        <img alt="Product" src={product.imageUrl} width="500" />
                        <h3>Name: {product.name}</h3>
                    </a>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <p>Rating: {product.rating}</p>
                </div>
            ) : <div></div>}

            {isUserAdmin ? (
                <div className="rows column is-one-quarter changeDetailsContainer">
                    <h2 className="is-size-4">Change product details:</h2>
                    <div>
                        <label>What product detail would you like to change? </label>
                        <input
                            className="p-2 mb-5 detailChangeBox"
                            type="text"
                            placeholder="Enter product detail here..."
                            value={detailToChange}
                            onChange={(e) => { setDetailToChange(e.target.value) }} 
                        />
                    </div>
                    <div>
                        <label>Specify the change below: </label>
                        <input
                            className="p-2 mb-5 detailChangeBox"
                            type="text"
                            placeholder="Enter adjustment here..."
                            value={changeToDetail}
                            onChange={(e) => { setChangeToDetail(e.target.value) }} 
                        />
                    </div>
                    <button className="mt-2 is-size-6" onClick={handleProductDetailChange}>Submit change</button>
                </div>
            ) :
                <div></div>}
        </div>
    );
}