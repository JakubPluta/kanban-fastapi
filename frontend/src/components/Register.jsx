import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios'

const Register = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const history = useNavigate();


    const createUser = async () => {
        const formData = {
            username: username,
            hashed_password: password,
        }

        const headers = {
                'Content-Type' : 'application/json',
            }

        const response = axios.post('/users', formData, {
            headers: headers,
        })
        const data = await response.data
        return data


    }

    const handleSubmit = (event) => {
        event.preventDefault();

        createUser().then(
            data => {
                props.setToken(data.access_token);
                localStorage.setItem('token', JSON.stringify(data.access_token));
                history('/')
            }
        )

    }

   return (
        <div>
            <form onSubmit={handleSubmit}>
                Username <input type="text" onChange={e => setUsername(e.target.value)} />
                Password <input type="password" onChange={e => setPassword(e.target.value)} /> 
               <button>Register</button>
                <p><Link to='/login'>Already have account ? Log in here!</Link></p>
            </form>
        </div>
    )
}

export default Register;
