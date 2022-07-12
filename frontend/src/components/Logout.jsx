import React from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Logout = (props) => {

    const history = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('token')
        history('/login');


    }


  return (
    <div>
      <button onClick={logoutUser}>Log Out</button>
    </div>
  )
}

export default Logout
