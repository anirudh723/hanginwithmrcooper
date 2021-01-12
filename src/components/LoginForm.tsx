import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../api';
import '../styles/LoginForm.css';

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

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="container">
            {redirectToStore ? <Redirect to="/store" /> : (
                <div>
                    <form className="has-text-light loginForm">
                        <label>Email</label>
                        <input
                            required
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <label>Password</label>
                        <input
                            required
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button onClick={(e) => { handleSubmit(e); }}>Log In</button>
                    </form>
                    <span className="has-text-light">{loginResult}</span>
                </div>
            )}
        </div> 
    );
}