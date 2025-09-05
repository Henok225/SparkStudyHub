import React, { useContext,useState } from 'react'
import './FeedBack.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FeedBack = () => {
    const {userData,url, token, setShowLogin, setShowPopup} = useContext(StoreContext)
    const navigate = useNavigate();
    const [feedBackSent, setFeedBackSent] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!token){
          setShowLogin(true)
          return;
        }
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };
        console.log(data)
        try {
          const response = await axios.post(`${url}/api/messages/feedback`, data, {
            headers: {
              "Content-Type": "application/json",
              "token":token
            },
          });
          if (response.data.success === true) { 
            
            setFeedBackSent(true);

          } else {
            setShowPopup(prev=>({...prev,show:true,response:response.data.message,title:"FeedBack Sent Status"}))
   
          }
        }
        catch (error) {
          console.log('Error submitting feedback:', error);

          alert('An error occurred while submitting your feedback. Please try again later.');
        }
        
    }
  return (
    <div className='feedback' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className='feedback__container' style={{ maxWidth: '600px', width: '100%' }}>
      {
         
         !feedBackSent &&
         <>
        <div className="feed-header">
        <div className='feedback__title'>
            <h1>Feedback Form</h1>
        </div>
        <p className='feedback__description'>We would love to hear your thoughts, suggestions, concerns or problems with anything so we can improve!</p>
        
        </div>
        
          <form className='feedback__form' onSubmit={handleSubmit}>
        <div className='feedback__form-group'>
            <label htmlFor='feedback-message' className='feedback__label'>Describe Your Feedback:</label>
            <textarea id='feedback-message' name='message' className='feedback__textarea' required></textarea>
          </div>
          <div className="inputs1">
          <div className='feedback__form-group'>
            <label htmlFor='feedback-name' className='feedback__label'>Full Name:</label>
            <input type='text' name='name' id='feedback-name' className='feedback__input' required />
          </div>
          <div className='feedback__form-group'>
            <label htmlFor='feedback-email' className='feedback__label'>Email:</label>
            <input type='email' name='email' id='feedback-email' defaultValue={userData? userData.email:""} className='feedback__input' required />
          </div>
          </div>
          
          <div className="btns">
          <button type='submit' className='feedback__submit'>Submit</button>
          <style>
            
          </style>
          </div>
           </form>
           </>}
          {feedBackSent && (
            <div className='feedback__thankyou' style={{ textAlign: 'center' }}>
              <div className='feedback__thankyou-icon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="9 12 12 15 16 9"></polyline>
                </svg>
              </div>
              <h2 className='feedback__thankyou-title'>Feedback Sent</h2>
              <p className='feedback__thankyou-message'>Thank you for your feedback!</p>
              <p className='feedback__thankyou-description'>We appreciate your input and will use it to improve our services.</p>  
              <button className='feedback__thankyou-button' onClick={() => navigate('/')}>Go to Home</button>
                      
            </div>

          )}
    </div>
    </div>
  )
}


export default FeedBack;
