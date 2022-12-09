import React, { useState, useEffect, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import Context from '../Context';
import '../styles/CreateItem.css'

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

  const validateName = () => {
    if(postBody.itemname){
      return postBody.itemname.length ? true : false
    }
    return false
  }

  useEffect(() => {
    if(itemDefaults) setPostBody(itemDefaults)
  }, [itemDefaults])

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateName()){
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
          setTimeout(() => navigate(`/inventory/${cookies.username}`),500);
          alert(res)
        })
      .catch(err => {
        console.log(err);
      })
    }else{
      alert('Item must have a name.')
    }
  }

  //BEGIN RENDER
  return(
    <>
    {postBody ?
    <div className='create-item'>
      <div className='create-div'>
          {editEnabled ? <h1>Edit Item</h1> : <h1>Create New Item</h1>}
          <form className='item-input'>
            <div>
              <div className='single-item-edit'>
                <label htmlFor='item-name'>Item Name:</label>
                <input className='create-input'type='text' required='required'value={postBody.itemname} onChange={handleItemName}/><br/>
              </div>
              <br/>
              <div className='single-item-edit'>
                <label htmlFor='item-description'>Item Description:</label>
                <input className='create-input' type='text' value={postBody.description} onChange={handleDescription}/><br/>
              </div>
              <br/>
              <div className='single-item-edit'>
                <label htmlFor='item-quantity' >Item Quantity:</label>
                <input className='create-input'type='number' required='required' value={postBody.quantity > 1 ? postBody.quantity : 1} onChange={handleQuantity}/><br/>
              </div>
              </div>
              <p>Entered by: {cookies.username}</p>
              <div className='create-buttons'>
                <button type='submit' onClick={handleSubmit}>Submit</button>
                <button onClick={editEnabled ? ()=>setEditEnabled(false) : () => {navigate('/inventory/:username'); }}>Cancel</button>
            </div>
          </form>
      </div>
    </div>
    :
    <p>Page is loading...</p>
    }
    </>
  )
}

export default CreateItem