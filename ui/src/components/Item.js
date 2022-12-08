import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import Context from '../Context';
import cookie from 'cookie';
import CreateItem from './CreateItem';
import SingleItem from './SingleItem';

const Item = () => {
  const navigate = useNavigate()
  const { setCurrentItem,currentItem, itemDefaults, editEnabled, setEditEnabled, setItemDefaults, deleteItem, cookies } = useContext(Context);
  useEffect(() => {
    if(currentItem){
      setItemDefaults({
        itemname: currentItem.item_name,
        description: currentItem.description,
        quantity: currentItem.quantity
      })
    }
  }, [currentItem])

  //GET USERNAME FOR CURRENT ITEM
  useEffect(() => {
    if(currentItem){
      fetch('http://localhost:8080/getUser',
      {method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userID: currentItem.user_id}),
        credentials: 'include'
      })
      .then(res => res.json())
      .then(user => {
        setItemDefaults({
          ...itemDefaults,
          username: user
        })
        setCurrentItem({
          ...currentItem,
          username: user
        })
        setEditEnabled(false)
      })
      .then(console.log(itemDefaults))
    }
  }, [])

  //BEING RENDER
  return(
    <>
    {editEnabled ?
      <div>
        <CreateItem />
      </div>
    :
    currentItem !== null?
      <div>
          {cookies.username ?
            <div>
              {console.log(itemDefaults)}
              <h1>{currentItem.item_name}</h1>
              <button className='enable-edit' onClick={()=> setEditEnabled(true)}>Edit Item</button>
              <button className='delete-item' onClick={() => deleteItem(currentItem.id)}>Delete Item</button>
            </div>
          :
          <></>}
          <button onClick={cookies.username ? ()=> {setCurrentItem(null); navigate(`/inventory/${cookies.username}`)} : ()=>navigate('/')}>Back to Inventory</button>
          <SingleItem />
      </div>
      :
     <p>Page loading...</p>

    }
    </>
  )
}

export default Item