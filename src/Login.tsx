import * as React from 'react';
import { LoginForm } from './components/LoginForm';

export const Login: React.SFC = props => {
    return (
        <div className="container">
            <div className="is-fluid has-background-dark has-text-light">
                This is the login page!
            </div>
            <LoginForm/>
        </div> 
    );
}