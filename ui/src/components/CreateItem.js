import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Context from '../Context';
import cookie from 'cookie';

const CreateItem = () => {
  const [postBody, setPostBody] = useState(null)
  const { cookies, editEnabled, setEditEnabled, itemDefaults} = useContext(Context)
  const navigate = useNavigate();

  const handleItemName = (event) => {
    setPostBody((
      {
        ...postBody,
        itemname: event.target.value
      }
      ))
    return;
  }
  const handleDescription = (event) => {
    setPostBody((
      {
        ...postBody,
        description: event.target.value
      }
      ))
    return;
  }
  const handleQuantity = (event) => {
    setPostBody((
      {
        ...postBody,
        quantity: event.target.value
      }
      ))
    return;
  }

  useEffect(() => {
    if(itemDefaults) setPostBody(itemDefaults)
  }, [itemDefaults])

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/inventory', {
      method: (editEnabled ? 'PATCH' : 'POST'),
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...postBody,
        username: cookies.username
      }),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
        setEditEnabled(false);
        navigate(`/inventory/${cookies.username}`);
        alert(res)
      })
    .catch(err => {
      console.log(err);
    })
  }

  //BEGIN RENDER
  return(
    <>
    {postBody ?
    <div className='create-item'>
          {editEnabled ? <h1>Edit Item</h1> : <h1>Create New Item</h1>}
          <button onClick={editEnabled ? ()=>setEditEnabled(false) : () => {navigate('/inventory/:username'); }}>Cancel</button>
          <form className='item-input'>
            <div>
            <label htmlFor='item-name'>Item Name:</label>
            <input type='text' value={postBody.itemname} onChange={handleItemName}/><br/>
            <br/>
            <label htmlFor='item-description'>Item Description:</label>
            <input type='text' value={postBody.description} onChange={handleDescription}/><br/>
            <br/>
            <label htmlFor='item-quantity' >Item Quantity:</label>
            <input type='number' value={postBody.quantity}onChange={handleQuantity}/><br/>
            </div>
            <p>Entered by: {cookies.username}</p>
            <button type='submit' onClick={handleSubmit}>Submit</button>
          </form>
        </div>
    :
    <p>Page is loading...</p>
    }
    </>
  )
}

export default CreateItem