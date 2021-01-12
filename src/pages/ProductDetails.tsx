import * as React from 'react';
import { isLoggedIn } from '../api';
import { Redirect } from 'react-router';
import { ProductDetail } from '../components/products/ProductDetail'

export const ProductDetails: React.FC = props => {

    return (
        <div className="container is-fluid has-text-light">
            {
                !isLoggedIn() &&
                <Redirect to="/" />
            }
            <ProductDetail />
        </div>
    );
}