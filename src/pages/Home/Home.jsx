import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Service from '../../Components/Services/Service'
import About from '../../Components/AboutUs/About'
import Plans from '../Plans/Plans'
import Contact from '../../Components/ContactUs/Contact'
import { StoreContext } from '../../Context/StoreContext'
import NewHomeExtras from '../../NewHomeExtras/NeHomeEx/NewHomeExtras'
import RegisteredHomeExtras from '../../RegisteredHomeExtras/RgHomeex/RegisteredHomeExtras'
import ImageOptimizerSpin from '../../Components/Utilities/ImageOptimizer/ImageOptimizerSpin'

const Home = () => {

  const{token} = useContext(StoreContext);
  const [headerLoaded,setHeadrLoaded] = useState(false)
  useEffect(()=>{
     setTimeout(()=>{
        setHeadrLoaded(true)
     },3000)
  },[])

  return (
    <div className='home'>
        
        {
          headerLoaded ?  <Header/>:<ImageOptimizerSpin/>
        }
       
        <Service/>
        <div className="extras">
          {
         token? <RegisteredHomeExtras/> : <NewHomeExtras/>
        }
        </div>
        
        <Contact/>
      
    </div>
  )
}

export default Home
