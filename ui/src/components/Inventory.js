import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Context from '../Context';
import '../styles/Inventory.css'

import config from '../config.js';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const Inventory = () => {
  const navigate = useNavigate();
  // const cookies = cookie.parse(document.cookie)
  const [items, setItems] = useState(null)
  const {isSpecificInventory, setIsSpecificInventory, cookies,  setCurrentItem, resetItemDefaults} = useContext(Context)
  //DETERMINE ITEMS TO FETCH
  useEffect(() => {
    isSpecificInventory ?
      fetch(ApiUrl +`/inventory/${cookies.username}`, {
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
    fetch(ApiUrl +'/inventory')
    .then(res => res.json())
    .then(items => {
      setItems(items);
      return;
    })
    .catch(err => {
      console.log(err)
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
          <h1 className='inv-header-text'>Current Inventory</h1>
        </div>
        <div className='inv-buttons'>
        {isSpecificInventory ?
          <>
            <button onClick={()=> {navigate('/CreateItem'); resetItemDefaults()}}>Create New Item</button>
            <button onClick={()=> {navigate('/'); setIsSpecificInventory(false)}}>View Full Inventory</button>
          </>
        : <>
          <div>Browse the current inventory</div>
        </>}
        {cookies.username && !isSpecificInventory ? <button onClick={inventoryRedirect}>See My Inventory</button> : <></>}
        </div>
        <div className='items'>
          {typeof items !== 'string' && items.length ? items.map((item, index) => {
          return(
            <div className='inventory-item' key={index}>
              <Link className='item-link' onClick={()=>viewCurrentItem(item)}>
              <p>Name: {item.item_name}</p>
              <p className='item-description'>Description: {item.description ? item.description : <>No description provided. No description provided. No description provided. No description provided. No description provided.  </>}</p>
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