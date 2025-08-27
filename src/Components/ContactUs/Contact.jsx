import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <div className='contact'>
      <h2>Contact Us</h2>
        <form>
            <div>
            <label htmlFor="name">Name: </label>
            <input type="text" name='name' id='name' placeholder='Full name' required/>
            </div>
            <div>
            <label htmlFor="email">Email: </label>
            <input type="email" name='email' id='email' placeholder='example@gmail.com' required/>
            </div>
            <div>
            <label htmlFor="message">Message: </label>
            <textarea name="message" id="message" rows="10" cols="50" ></textarea>
            </div>
            <button className='submit-btn' type='submit'>Send Message</button>
        </form>
      
    </div>
  )
}

export default Contact
