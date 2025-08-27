import React, { useContext, useState } from 'react'
import './Header.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const {setShowLogin,token,userData} = useContext(StoreContext)
  return (
    <div className='header'>
      {
        !token?
      <div className="new-user-welcoming">

        <div className="welcoming">
            <h2 className='big-title'>Unlock Your Potential with Spark Study </h2>
            <p>Your Ultimate Guide to Mastering High School Subjects and Acing University Entrance Exams.</p>
            <p>Get access to expertly explained topics, interactive quizzes, and solved entrance exams—all designed to help you succeed.</p>
        </div>
        <button className='start-btn' onClick={()=>setShowLogin(true)}>Start now</button>
        </div>
          :
        <div className="customer-welcoming">
          <div className='welcoming-text'>
            <h2> 👋 Welcome back, {userData.name}</h2>
          <h1>🎓 Spark Study</h1>
          <br /><br />
          <h3>Continue your learning journey today.</h3>
          <div className="tracking-user">
            <div className="continue-learning">
              <p onClick={()=>navigate('/explain')}><span>📚 </span> Continue Learning</p>
            </div>
            <div className="view-progress">
              <p onClick={()=>navigate('/profile')}><span>📊 </span> View Progress</p>
            </div>
            {/* <div className="explore">
              <p><span>🔍</span> Explore</p>
            </div> */}
          </div>
          </div>
          <div className="welcoming-pic">
            <img src={assets.heropic3} alt="" />
          </div>
          
        </div>
}
    </div>
  )
}

export default Header
