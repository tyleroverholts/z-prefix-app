import React, { useState, useEffect, useContext} from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Context from '../Context';
import cookie from 'cookie';
import '../styles/Header.css'



const Header = () => {
  const navigate = useNavigate()
  const { cookies, logout, refresh, setRefresh} = useContext(Context)

  useEffect(() => {
    setRefresh(false)
  }, [refresh, cookies])

  return(
    <>
    {cookies.username ?
      <div className='header'>
        <p>Welcome {cookies.username}!</p>
        <h3 className='page-title' onClick={() => {navigate('/')}}>Inventory Manager</h3>
        <button className='buttons' onClick={logout}>Logout</button>
      </div>
    :
      <div className='header'>
        <p>Welcome!</p>
        <h3 className='page-title' onClick={() => {navigate('/')}}>Inventory Manager</h3>
        <div className='buttons'>
          <button onClick={()=> navigate('/Login')}>Login</button>
          <button onClick={() => navigate('/CreateAccount')}>Create New Account</button>
        </div>
      </div>
    }
    </>
  )
}

export default Header;