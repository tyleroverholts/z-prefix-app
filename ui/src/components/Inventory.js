import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import Context from '../Context';
import cookie from 'cookie';

const Inventory = () => {
  const navigate = useNavigate();
  const cookies = cookie.parse(document.cookie)
  const [items, setItems] = useState(null)
  const [postBody, setPostBody] = useState(null)
  const {currentItem, setCurrentItem} = useContext(Context)

  useEffect(() => {
    console.log(cookies)
    cookies.loggedIn ?
      fetch(`http://localhost:8080/inventory/${cookies.username}`, {
        credentials: "include"
      })
      .then(res => res.json())
      .then(items => setItems(items))
    :
    fetch('http://localhost:8080/inventory')
    .then(res => res.json())
    .then(items => setItems(items))
  }, [])

  return(
    <>{items !== null ?
      <>
        <h1>Welcome {cookies.username}</h1>
        <Link to="/CreateItem">
          <button>Create New Item</button>
        </Link>
        <div>
          {typeof items !== 'string' && items.length ? items.map((item, index) => {
          return(
            <div key={index}>
              <Link onClick={async()=> {
                try{
                  await setCurrentItem(item)
                  navigate(`/inventory/items/${item.item_name}`)
                }catch(err){
                  console.log(err)
                }
              }
              }><p>Item: {item.item_name}</p></Link>
              <p>Description: {item.description}</p>
              <p style={{overflow: 'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis', maxWidth: '600px'}}>Quantity: TestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTesting</p>
            </div>
          )}
          )
          : <p>There are no items to display.</p>}
        </div>
      </>
      :
      <p>Page is loading...</p>
      }
    </>
  )
}

export default Inventory;