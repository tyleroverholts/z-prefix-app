import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Context from '../Context';
import cookie from 'cookie';

const CreateItem = () => {
  const cookies=cookie.parse(document.cookie);
  const [itemName, setItemName] = useState(null)
  const [description, setDescription] = useState(null)
  const [quantity, setQuantity] = useState(null)
  const [postBody, setPostBody] = useState(null)
  const { setRedirect } = useContext(Context)
  const navigate = useNavigate();

  const handleItemName = (event) => {
    setItemName(event.target.value)
    return;
  }

  const handleDescription = (event) => {
    setDescription(event.target.value)
    return;
  }

  const handleQuantity = (event) => {
    setQuantity(event.target.value)
    return;
  }

  const clearFields = () => {
    setItemName('')
    setQuantity('')
    setDescription('')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(typeof postBody.quantity)
    fetch('http://localhost:8080/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody),
      credentials: 'include'
    })
    .then(res => {
      if(res.status === 201){
        clearFields();
        console.log(res.status);
        setRedirect(true);
        navigate(`/inventory/${cookies.username}`);
      }else{
        throw res
      }
      })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    setPostBody({
      username: cookies.username,
      itemname: itemName,
      description: description,
      quantity: quantity
    })
  }, [cookies.username, itemName, quantity, description])

  return(
    <>
    <div className='create-item'>
          <h1>Create New Item</h1>
          <form className='item-input'>
            <div>
            <label htmlFor='item-name'>Item Name:</label>
            <input type='text' onChange={handleItemName}/>
            <label htmlFor='item-description'>Item Description:</label>
            <input type='text' onChange={handleDescription}/>
            <label htmlFor='item-quantity' >Item Quantity:</label>
            <input type='number' onChange={handleQuantity}/>
            </div>
            <button type='submit' onClick={handleSubmit}>Add Item</button>
          </form>
        </div></>
  )
}

export default CreateItem