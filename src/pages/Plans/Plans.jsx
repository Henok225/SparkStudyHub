import React, { useContext, useState } from 'react'
import './Plans.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import PopUp from '../../Components/PopUp/PopUp'

const Plans = () => {
  const {token,userData,setShowLogin,showPopup,setShowPopup} = useContext(StoreContext)
  // const [PopMessage,setPopMessage] = useState(false)
  return (
    <>
    <h2 className='plans-tit'>Simple subscription plans</h2>
    <div className='plans'>
      
      <div className="pro-plan plan">
        <div className="image">
          <img src={assets.diamond_icon} alt="" />
         </div>
         <div className='plan-title'>
         <h2>Pro Plan</h2>
        <p className="price"><span className="currency">$</span><span>9.99</span>/month</p>
        <p className="description">Unlock the full potential of Spark Study.</p>
        </div>
       
        <ul>
            <li><strong>Unlimited access</strong> to all topic explanations.</li>
            <li><strong>Interactive quizzes</strong> with detailed solutions.</li>
            <li><strong>Full access</strong> to solved entrance exams.</li>
            <li><strong>Advanced progress tracking</strong> and analytics.</li>
            <li><strong>Priority support</strong> for faster assistance.</li>
        </ul>
        <button onClick={()=>setShowPopup(prev=>({...prev,show:true,response:"Pro Plan isn't available yet",title:"Pro Plan"}))}>Choose pro</button>
        
      </div>

      <div className="free-plan plan">
      
      <div className="image">
        <img src={assets.free_plan_icon} alt="" />
      </div>
      <div className='plan-title'>
      <h2>Free Plan</h2>
      <p className="price"><span className="currency">$</span> <span>0</span>/month</p>
      <p className="description">Start your learning journey with essential resources.</p>
      </div>
    
      <ul>
          <li>Access to <strong>basic topic explanations</strong> in all subjects.</li>
          <li><strong>Limited quizzes</strong> to test your knowledge.</li>
          <li><strong>Sample solved exams</strong> to practice with.</li>
          <li><strong>Community support</strong> through forums.</li>
      </ul>
      <button onClick={()=>setShowLogin(true)}>Sign in</button>
    </div>
    </div>
    
    </>
  )
}

export default Plans
