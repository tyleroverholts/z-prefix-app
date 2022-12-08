import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import Context from '../Context';
import cookie from 'cookie';
import Item from './Item.js'
import '../styles/Inventory.css'
import SingleItem from './SingleItem';

const Inventory = () => {
  const navigate = useNavigate();
  // const cookies = cookie.parse(document.cookie)
  const [items, setItems] = useState(null)
  const {isSpecificInventory, setIsSpecificInventory, cookies,  setCurrentItem, resetItemDefaults} = useContext(Context)
  //DETERMINE ITEMS TO FETCH
  useEffect(() => {
    isSpecificInventory ?
      fetch(`http://localhost:8080/inventory/${cookies.username}`, {
        credentials: "include"
      })
      .then(res => res.json())
      .then(items => {
        if(typeof items === 'string'){
          setItems([])
          throw items
        }else setItems(items)

      })
      .catch(err => {
        console.log(err)
      })
    :
    window.history.replaceState(null, 'Inventory', '/inventory')
    fetch('http://localhost:8080/inventory')
    .then(res => res.json())
    .then(items => {
      setItems(items);
      return;
    })
  }, [isSpecificInventory, cookies])

  //HELPERS
  const inventoryRedirect = async () => {
    await setIsSpecificInventory(true)
    navigate(`/inventory/${cookies.username}`);
  }

  const viewCurrentItem = async (item) => {
        await setCurrentItem(item)
        setTimeout(() => navigate(`/inventory/items/${item.item_name}`), 500)
  }

  //BEGIN RENDER
  return(
    <div className='inventory-page'>{items !== null ?
      <div className='page-contents'>
        <div className='page-header'>
          <h1>Current Inventory:</h1>
        </div>

        {isSpecificInventory ?
        <div>
            <button onClick={()=> {navigate('/CreateItem'); resetItemDefaults()}}>Create New Item</button>
            <button onClick={()=> {navigate('/'); setIsSpecificInventory(false)}}>View Full Inventory</button>
        </div>
        : <></>}

        <div className='item'>
          {cookies.username.length && !isSpecificInventory ? <button onClick={inventoryRedirect}>See My Inventory</button> : <></>}
          {typeof items !== 'string' && items.length ? items.map((item, index) => {
          return(
            <div key={index}>
              <Link className='item-link' onClick={()=>viewCurrentItem(item)}>
              <p>Name: {item.item_name}</p>
              <p>Description: {item.description}</p>
              </Link>
            </div>
          )}
          )
          : <p>There are no items to display.</p>}
        </div>
      </div>
      :
      <p>Page is loading...</p>
      }
    </div>
  )
}

export default Inventory;