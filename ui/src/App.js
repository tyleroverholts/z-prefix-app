import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Home from './components/Home.js';
import CreateAccount from './components/CreateAccount.js';
import Context from './Context.js';
import Login from './components/Login.js';
import Inventory from './components/Inventory.js'
import CreateItem from './components/CreateItem.js';
import Item from './components/Item.js'
import cookie from 'cookie';
import Header from './components/Header.js';
import './styles/App.css'

function App() {
  const navigate = useNavigate()
  const [cookies, setCookies ] = useState(cookie.parse(document.cookie))
  const [isSpecificInventory, setIsSpecificInventory] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [currentItem, setCurrentItem]= useState(null)
  const [editEnabled, setEditEnabled] = useState(false)
  const [itemUser, setItemUser] = useState(null)
  const [itemDefaults, setItemDefaults] = useState({
    username: '',
    itemname: '',
    description: '',
    quantity: 0
  })

  const resetItemDefaults = () => {
    setItemDefaults({
    username: '',
    itemname: '',
    description: '',
    quantity: 0
    })
  }

  const logout = () => {
    let noUser = ''
    fetch('http://localhost:8080/logout',{
      method: 'POST',
      credentials: 'include'
    })
    .then(res=> {
      if(res.status !== 400){
        document.cookie = "username=" + noUser
        document.cookie = "loggedIn=" + false
        setCookies(cookie.parse(document.cookie))
        setIsSpecificInventory(false)
        navigate('/', {replace: true})
      }
      return res.json()
    })
    .then(res=>alert(res))
    .catch(err => console.log(err))
  }

  const deleteItem = (itemID) => {
    fetch('http://localhost:8080/inventory', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: itemID
      }),
    })
    .then(res => res.json())
    .then(response => {
      alert(response)
    })
    .then(() => navigate('/inventory/:username'))
  }

  useEffect(() => {
    setCookies(cookie.parse(document.cookie))
  },[])

  //BEGIN RENDER
  return (
    <>
    <Context.Provider value={{itemUser, setItemUser, cookies, setCookies, refresh, setRefresh, isSpecificInventory, setIsSpecificInventory, logout, deleteItem, resetItemDefaults, editEnabled, setEditEnabled, itemDefaults, setItemDefaults, currentItem, setCurrentItem}}>
      <Header />
      <div className='app'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/CreateAccount' element={<CreateAccount />}/>
        <Route path='/Login' element={<Login />} />
        <Route path='/inventory' element={<Inventory />}/>
        <Route path='/inventory/:username' element={<Inventory />}/>
        <Route path='/CreateItem' element={<CreateItem />}/>
        <Route path='/inventory/items/:item' element={<Item />}/>
      </Routes>
      </div>
    </Context.Provider>
    </>
  );
}

export default App;
