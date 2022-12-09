import React, { useState, useEffect } from 'react';
// import Context from './Context.js';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateAccount.css'
import config from './config.js';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const CreateAccount = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [postBody, setPostBody] = useState(null);

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

  const validateInputs = () =>{
    const { firstName, lastName, username, password } = postBody;
    let validFN = firstName ? (firstName.length ? true : false) : false;
    let validLN = lastName ? (lastName.length ? true : false) : false;
    let validPass = password ? (password.length > 7 ? true : alert('Password must be at least 8 characters.')) : false;
    let validUN = userName ? (userName.length ? true : false) : false;

    if(validFN && validLN && validPass && validUN) return true;
    else return false;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateInputs()){
      fetch(ApiUrl +'/CreateAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
      })
      .then(res => res.json())
      .then(res => {
        clearFields();
        alert(res);
        navigate(`/Login`);
        })
      .catch(err => {
        console.log(err);
      })
    }else{
      alert('All highlighted fields must be filled out.')
    }
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
    <div className='create-item'>
      <div className='create-accnt-header'>
        <h1 className='create-new-user'>Create New User</h1>
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
          <input type='submit' className='submit-button' value='Create User' onClick={handleSubmit}/>
        </div>
       </form>
    </div>
  )
}

export default CreateAccount