import React, { useContext, useEffect, useState } from 'react'
import './PopUp.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const PopUp = (props) => {
    const navigate = useNavigate()
    const {setShowPopup,showPopup} = useContext(StoreContext)
    // const [response,setResponse] = useState()

   return (
    <div className="popup-container">

    
   {
    
    props.response?<div className='popup' >
        <div className="nav-btns">
        
        <button onClick={()=>setShowPopup({show:false})} className="hide-popup">x</button>
   <h2 >{props.title}</h2>
        </div>
         
    <p>{props.response}{props?"":"Nothing to show"} </p>
    <button onClick={()=>setShowPopup({show:false})}>Ok</button>
</div>
:" "
   } 
  </div>)
}

export default PopUp
