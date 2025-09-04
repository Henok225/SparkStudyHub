import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';
import {useNavigate} from 'react-router-dom'
import { Facebook, LocateFixedIcon, Mail, MapPin, Phone, Send, YoutubeIcon, Zap } from 'lucide-react';

const Footer = () => {
  
    const navigate = useNavigate()
    const date = new Date();

  return (
    <div className='footer'>
      <div className="footer-befor"></div>
      <span><Zap/>SparkStudy</span>
      <div className="links">
        <div className="quick-links">
          <p className='footer-links-title'>Quick links</p>
          <div>
          <p onClick={()=>navigate('/')}>Home</p>
          <p onClick={()=>navigate('/feedback')}>Feedback</p>
          <p onClick={()=>navigate('/about')}>about us</p>
          {/* <p onClick={()=>navigate('/plans')}>plans</p> */}
          <p onClick={()=>navigate('/contact')}>contact us</p>
          </div>
        </div>
        <div className="services">
        <p className='footer-links-title'>Services</p>
          <div>
          <p onClick={()=>navigate('/explain')}>Explanations</p>
          <p onClick={()=>navigate('/quizzes')}>Quizzes</p>
          <p onClick={()=>navigate('/ethiopian-curriculum')}>Ethiopian Curriculum</p>
          </div>
        </div>
        <div className="footer-contact">
        <p className='footer-links-title'>Get in touch</p>
          <div>
          <p><span></span><Phone/> +251 941 86 7800</p>
          <p><span></span><Mail/> contact@sparkstudy.com</p>
          <p><span></span> <MapPin/> Addis Ababa, Ethiopia</p>
          </div>
        </div>
        <div className="social-links">
          <p>
            <a style={{color:'unset'}} href="https://t.me/spark_study" target="_blank" rel="noopener noreferrer">
          <Send/>
</a>
</p>
          <p><YoutubeIcon/></p>
          <p><Facebook/></p>
          {/* <p></p> */}
        </div>
      </div>
      <div className="footer-copyright">
        <p>Read our <span style={{color:'darkblue', cursor:'pointer'}} onClick={()=>navigate('/terms-and-privacy-policy')}>Terms of use and privacy policy</span></p>
        <p>&copy; {date.getFullYear()} <span style={{color:'darkblue',cursor:'pointer'}} onClick={()=>navigate('/')}><Zap size={18}/>SparkStudy</span> All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
