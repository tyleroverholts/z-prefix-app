import React, { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import Header from './Header.js'
import Inventory from './Inventory.js'


const Home = () => {
  return(
    <>
      <Inventory />
    </>
  )
}

export default Home;