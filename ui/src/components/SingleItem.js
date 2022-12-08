import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route} from 'react-router-dom';
import Header from './Header.js'
import Inventory from './Inventory.js'
import Context from '../Context.js';

const SingleItem = () => {
  const { currentItem } = useContext(Context)
  console.log(currentItem)
  return(
    <>{currentItem ?
      <>
      <p>Item Name: {currentItem.item_name}</p>
      <p>Item Description: {currentItem.description}</p>
      <p>Item Quantity: {currentItem.quantity}</p>
      <p>Entered by: {currentItem.username} </p>
      </>
    :
    <p>Loading...</p>
    }
    </>
  )
}

export default SingleItem;