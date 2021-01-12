import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../../api';
import './index.css';

export const LoginForm: React.FC = props => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginResult, setLoginResult] = React.useState("");
    const [redirectToStore, setRedirectToStore] = React.useState(false);

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        login(email, password)
            .then(() => {setRedirectToStore(true)})
            .catch((err) => setLoginResult(err));
    }

    return (
        <div className="container mt-4">
            {redirectToStore ? <Redirect to="/store" /> : (
                <div>
                    <form className="has-text-light p-4 loginForm">
                        <label>Email</label>
                        <input
                            required
                            className="p-2 mb-5 loginInput"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <label>Password</label>
                        <input
                            required
                            className="p-2 mb-5 loginInput"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                        <button onClick={handleSubmit}>Log In</button>
                    </form>
                    <span className="has-text-light">{loginResult}</span>
                </div>
            )}
        </div> 
    );
}