import * as React from 'react';
import { LoginForm } from '../components/login';

export const Login: React.FC = props => {
    return (
        <div className="container">
            <div className="is-fluid has-background-dark has-text-light is-size-3">
                Welcome!
            </div>
            <LoginForm />
        </div> 
    );
}