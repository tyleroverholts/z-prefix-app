import React, { useState, useEffect, useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import Context from '../Context';
import cookie from 'cookie'
import '../styles/Login.css'

const Login = () => {
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState(null);
  const [loginPass, setLoginPass] = useState(null);
  const [postBody, setPostBody] = useState(null)
  const { setIsSpecificInventory, setRefresh, setCookies} = useContext(Context)


  const handleLoginName = (event) => {
    setLoginName(event.target.value)
    return;
  }

  const handleLoginPass = (event) => {
    setLoginPass(event.target.value)
    return;
  }

  const clearFields = () => {
    setLoginPass('')
    setLoginName('')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let username = postBody.username
    fetch('http://localhost:8080/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody),
      credentials: 'include'
    })
    .then(res => {
      if(res.status === 202){
        document.cookie = `username=${username}`
        document.cookie = "loggedIn=true"
        setCookies(cookie.parse(document.cookie))
        setIsSpecificInventory(true)
        setRefresh(true)
        setTimeout(() =>navigate(`/inventory/${username}`), 500);
        return res.json()
      }else{
        return res.json()
      }
      })
      .then(res => {
        clearFields()
        alert(res)
      })
    .catch(err => {
      console.log(err);
    })
  }

  //SET THE POST BODY EACH TIME A FIELD CHANGES
  useEffect(() => {
    setPostBody({
      username: loginName,
      password: loginPass
    })
  }, [loginName, loginPass])

  return(
    <>
    <div className='home-button'>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
      <label htmlFor='input-field'>New User:</label>
      <form className='create-user'>
        <label htmlFor='username' minLength='1'>Username:</label>
        <input type='text' required='required' id='username' onChange={handleLoginName}/>
        <label htmlFor='password'minLength='1'>Password:</label>
        <input type='password' required='required' id='password' onChange={handleLoginPass}/>
        <div>
          <input type='submit' value='Login' onClick={handleSubmit}/>
        </div>
       </form>
    </>
  )
}

export default Login;