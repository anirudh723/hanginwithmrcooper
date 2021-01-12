import * as React from 'react';
import { isLoggedIn } from "./api";
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Login } from './pages/Login';
import { Store } from './pages/Store';
import { ProductDetails } from './pages/ProductDetails';
import { Logout } from './pages/Logout';

export const App: React.SFC = () => {
    return (
        <Router>
            <section className="hero is-dark">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Dwayne "The Store" Johnson</h1>
                        <h2 className="subtitle">Can you buy what The Store is selling?!</h2>
                    </div>
                </div>
            </section>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/store">
                    <Store />
                </Route>
                <Route path="/details/:id">
                    <ProductDetails />
                </Route>
                <Route path="/logout">
                    <Logout />
                </Route>
                <Route path="/">
                    {
                        isLoggedIn()
                            ? <Redirect to="/store" />
                            : <Redirect to="/login" />
                    }
                </Route>
            </Switch>
        </Router>
    );
}
