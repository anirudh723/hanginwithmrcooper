import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../api';

export const Logout: React.FC = props => {
    const [redirect, setRedirect] = React.useState(false);

    const handleLogout = (event: React.MouseEvent) => {
        logout().then(() => {setRedirect(true)});
    }

    return (
        <div className="container">
            {redirect ? <Redirect to="/login" /> : (
                <div>
                    <div className="is-fluid has-background-dark has-text-light">
                        Thank you for visiting. Click the button below to logout.
                    </div>
                    <button className="mt-2 is-size-6" onClick={handleLogout}>Click here to logout!</button>
                </div>
            )}
        </div> 
    );
}