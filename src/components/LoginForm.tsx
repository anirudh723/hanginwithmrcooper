import * as React from 'react';
import '../LoginForm.css';
import { login } from '../api';

export const LoginForm: React.SFC = props => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginResult, setLoginResult] = React.useState("");

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        login(email, password)
        .then(() => setLoginResult("Logged in successfully!"))
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

                <button onClick={(e) => {handleSubmit(e);}}>Log In</button>  
            </form>
            <span className="has-text-light">{loginResult}</span>
        </div> 
    );
}