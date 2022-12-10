import React, { useEffect, useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import Context from '../Context';
import '../styles/Header.css'
import cookie from 'cookie'


const Header = () => {
  const navigate = useNavigate()
  const { cookies, logout, setRefresh} = useContext(Context)
  useEffect(() => {
    setRefresh(false)
  }, [cookies])

  return(
    <>
    {cookies.username ?
      <div className='header'>
        <div className='header-text'>
          <h4>Welcome {cookies.username}!</h4>
          <h2 className='page-title' onClick={() => {navigate('/')}}>Inventory Manager</h2>
        </div>
        <button className='buttons' onClick={logout}>Logout</button>
      </div>
    :
      <div className='header'>
        <div className='header-text'>
          <h4>Welcome!</h4>
          <h2 className='page-title' onClick={() => {navigate('/')}}>Inventory Manager</h2>
        </div>
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