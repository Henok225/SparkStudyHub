import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './Contact.css'
import { assets } from '../../assets/assets'
import { Send } from 'lucide-react'
import { StoreContext } from '../../Context/StoreContext'


const Contact = () => {

  const [status, setStatus] = useState(null) // success or error
  const {url, token, userData} = useContext(StoreContext) 
  const [sending,setSending] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: userData?.email || '',
    message: ''
  })

 
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      setSending(true)
      const response = await axios.post(url+'/api/messages/contact',
         {name:formData.name,email:formData.email, message:formData.message}, {
        headers:{
          'Content-Type':'application/json',
          'token': token
        }
      })
      if(response.data.success){
        setStatus('success')
      }
      
      
    } catch (error) {
      console.error(error)
      setStatus('error')
    }finally{
      setSending(false)
      setFormData({ name: '', email: '', message: '' })
    }
    // alert(status)
  }

  useEffect(()=>{
    status !== null ?
    setTimeout(()=>{
      setStatus(null)
    },7000) :null
  },[status])

  return (
    <div className='contact'>
      <div className="status-annuncer">
  {status === 'success' && <p className="success">✅ Message sent successfully!</p>}
      {status === 'error' && <p  className="error">❌ Failed to send. Try again later.</p>}
   
</div>
      <h2>Contact Us</h2>
      <div className="contact-img-container">
        <img src={assets.contact_us_side_image} alt="contact-us" />
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name='name'
              id='name'
              placeholder='Full name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name='email'
              id='email'
              placeholder='example@gmail.com'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message: </label>
            <textarea
              name="message"
              id="message"
              rows="10"
              cols="50"
              value={formData.message}
              onChange={handleChange}
              placeholder='Message'
              required
            ></textarea>
          </div>
          <button disabled={sending}  className='submit-btn' type='submit'>
            <Send size={14}/> Send Message
          </button>
        </form>
      </div>

       </div>
  )
}

export default Contact
