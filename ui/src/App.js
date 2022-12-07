import React, { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './components/Home.js';
import CreateAccount from './components/CreateAccount.js';
import Context from './Context.js';
import Login from './components/Login.js';
import Inventory from './components/Inventory.js'
import CreateItem from './components/CreateItem.js';
import Item from './components/Item.js'

function App() {
  // const [ searchParam, setSearchParam ] = useState(null);
  // const [ addParam, setAddParam ] = useState(null);
  const [ redirect, setRedirect ] = useState(false);
  const [currentItem, setCurrentItem]= useState(null)

  // useEffect(() => {

  // },[cookie])
  // useEffect(() => {
  //   fetch('http://localhost:8080')
  //   .then(res => res.json())
  //   .then(movies => setMovies(movies))
  // }, [])

  //const searchMovies = movies.filter(movie => movie.title.includes(searchParam))
  return (
        <>
    {/* {movies !== null ? */}
    <>
    <Context.Provider value={{currentItem, setCurrentItem, redirect, setRedirect}}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/CreateAccount' element={<CreateAccount />}/>
        <Route path='/Login' element={<Login />} />
        <Route path='/inventory/all' element={<Inventory />}/>
        <Route path='/inventory/:username' element={<Inventory />}/>
        <Route path='/CreateItem' element={<CreateItem />}/>
        <Route path='/inventory/items/:item' element={<Item />}/>
      </Routes>
    </Context.Provider>
    </>
    {/* :
      <p>Page is loading...</p> */}
      {/* } */}
    </>
  );
}

export default App;
