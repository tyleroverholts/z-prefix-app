import React, { useEffect, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import Context from '../Context';
import CreateItem from './CreateItem';
import SingleItem from './SingleItem';
import '../styles/Item.css'
import config from '../config.js';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

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
      fetch(ApiUrl +'/getUser',
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
      .catch(err => {
        console.log(err)
      })
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
    <div className='create-item'>
      <div className='item-div'>
        <div className='item-header'>
        <h1 className='title'>{currentItem.item_name}</h1>
        <div className='item-buttons'>
        <button className='item-button' onClick={cookies.username ? ()=> {setCurrentItem(null); navigate(`/inventory/${cookies.username}`)} : ()=>navigate('/')}>Back to Inventory</button>
          {cookies.username === currentItem.username?
          <>
              <button className='item-button' onClick={()=> setEditEnabled(true)}>Edit Item</button>
              <button className='item-button' onClick={() => deleteItem(currentItem.id)}>Delete Item</button>
          </>
          :
          <></>}
        </div>
        </div>
          <SingleItem />
      </div>
    </div>
      :
     <p>Page loading...</p>

    }
    </>
  )
}

export default Item