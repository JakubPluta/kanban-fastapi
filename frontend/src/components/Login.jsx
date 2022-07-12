
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios'

const Login = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const history = useNavigate();


    const loginUser = async () => {
        const searchParams = new URLSearchParams();
        searchParams.append('username', username);
        searchParams.append('password', password);


         
        const response = await axios.post('/token', searchParams.toString(), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded',},
        })
        const data = await response.data
        return data
    }

      const handleSubmit = (e) => {
        e.preventDefault();
        
        loginUser().then(data => {
            props.setToken(data.access_token);
            localStorage.setItem('token', JSON.stringify(data.access_token));
            history("/");
        });
    }

    return (
            <div>
                <form onSubmit={handleSubmit}>
                    <p>Username: <input type="text" onChange={e => setUsername(e.target.value)} /></p> 
                    <p>Password: <input type="password" onChange={e => setPassword(e.target.value)} /></p>
                <p><button>Login</button></p>
                <p><Link to='/register'>Need an account? Register here!</Link></p>
                </form>
            </div>
        )
    }

export default Login;
