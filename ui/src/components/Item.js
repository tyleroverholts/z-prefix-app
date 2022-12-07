import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import Context from '../Context';
import cookie from 'cookie';

const Item = () => {
  const { currentItem } = useContext(Context);
  // console.log(currentItem)
  return(
    <>Hello</>
  )
}

export default Item