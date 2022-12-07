import React, { useContext, useState, useEffect } from 'react';
// import Context from './Context.js';
import { useNavigate } from 'react-router-dom';
import Context from '../Context';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [postBody, setPostBody] = useState(null);
  const { redirect, setRedirect } = useContext(Context);

  const handleFNChange = (event) => {
    setFirstName(event.target.value)
    return;
  }

  const handleLNChange = (event) => {
    setLastName(event.target.value)
    return;
  }

  const handleUNChange = (event) => {
    setUsername(event.target.value)
    return;
  }

  const handlePWChange = (event) => {
    setPassword(event.target.value)
    return;
  }

  const clearFields = () => {
    setLastName('');
    setFirstName('')
    setPassword('')
    setUsername('')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/CreateAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    })
    .then(res => {
      clearFields();
      alert(res);
      setRedirect(true);
      navigate('/');
      })
    .catch(err => {
      console.log(err);
    })
  }

  //SET THE POST BODY EACH TIME A FIELD CHANGES
  useEffect(() => {
    setPostBody({
      firstName: firstName,
      lastName: lastName,
      username: userName,
      password: password
    })
  }, [password, userName, firstName, lastName])

  return(
    <>
      <div className='home-button'>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
      <label htmlFor='input-field'>New User:</label>
      <form className='create-user'>
        <label htmlFor='first-name'>First Name:</label>
        <input type='text' required='required' id='first' onChange={handleFNChange}/>
        <label htmlFor='last-name'>Last Name:</label>
        <input type='text' required='required'id='last' onChange={handleLNChange}/>
        <label htmlFor='username'>Username:</label>
        <input type='text' required='required' id='username' onChange={handleUNChange}/>
        <label htmlFor='password'>Password:</label>
        <input type='password' required='required' id='password' onChange={handlePWChange}/>
        <div>
          <input type='submit' value='Add' onClick={handleSubmit}/>
        </div>
       </form>
    </>
  )
}

export default CreateAccount