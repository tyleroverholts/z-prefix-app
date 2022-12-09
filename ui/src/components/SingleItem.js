import React, { useContext } from 'react';
import Context from '../Context.js';
import '../styles/SingleItem.css'

const SingleItem = () => {
  const { currentItem } = useContext(Context)
  return(
    <div className='single-item-div'>{currentItem ?
      <>
      <p className='item'>Item Name: {currentItem.item_name}</p>
      <p className='item'>Item Description: {currentItem.description ? currentItem.description : <>No description provided.No description provided.No description provided.No description provided.No description provided.No description provided.</>}</p>
      <p className='item'>Item Quantity: {currentItem.quantity}</p>
      <p className='item'>Entered by: {currentItem.username} </p>
      </>
    :
    <p>Loading...</p>
    }
    </div>
  )
}

export default SingleItem;