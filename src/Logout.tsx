import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from './api';

export const Logout: React.FC = props => {
    const [redirect, setRedirect] = React.useState(false);

    const handleLogout = async (event: React.MouseEvent) => {
        event.preventDefault();
        await logout()
        .then(() => {setRedirect(true)});
    }

    return (
        <div className="container">
            {redirect ? <Redirect to="/login" /> : (
                <div>
                    <div className="is-fluid has-background-dark has-text-light">
                        Thank you for visiting. Click the button below to logout.
                    </div>
                    <button onClick={handleLogout}>Click here to logout!</button>
                </div>
            )}
        </div> 
    );
}