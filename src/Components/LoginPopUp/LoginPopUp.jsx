import React, { useEffect } from 'react'
import './LoginPopUp.css'
import axios from 'axios'
import { useContext, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import Loader from '../loaderSpin/Loader'
import PopUp from '../PopUp/PopUp'
import { useNavigate } from 'react-router-dom'
import { X, Zap } from 'lucide-react'


const LoginPopUp = () => {

  const { url, setToken, userData, setUserData,showPopup, setShowPopup, setShowLogin } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Log In")
  const [loading, setLoading] = useState(false)
  const [serverResponse, setServerResponse] = useState(null)
   const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }


  const onLogin = async (event) => {

    event.preventDefault()
    let newUrl = url;
    if (currState === "Log In") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }

    try {
      setServerResponse(null)
      setLoading(true)
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        if (currState === "Log In") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token)
          setUserData(response.data.data);
        }
        
        const tempUserData = JSON.stringify(response.data.data);
        localStorage.setItem("userData", tempUserData)
        
      }
      setServerResponse(response.data.message)
      showPopup.show ? 
      setTimeout(()=>{
        setShowLogin(false)
      },1000 ) 
      : null
    
      
    } catch (error) {
      console.log("Error", error)
      setServerResponse("Server error try again later!")
     
      showPopup.show ? 
      setTimeout(()=>{
        setShowLogin(false)
      },10 ) 
      : null
      
    } finally {
      setLoading(false)
    }

  }

  useEffect(()=>{
    setShowPopup(prev=>({...prev,show:true,response:serverResponse,title:currState}))
   
  },[serverResponse])

  const Verify = () => {
    const [reverify, setReverify] = useState(false);

    useEffect(() => {

    }, [reverify])

    return (
      <>
        <div className="verify">
          <p className="title">Verify with email</p>
          <div className="btns">
            <button>Verify</button>
          </div>
        </div>
      </>
    )
  }

  const popUpHide = (event)=>{
    event.target.className === "login-popup"?setShowLogin(false):null
  }


  return (
    <div className='login-popup' onClick={(event)=>popUpHide(event)}>
      <Loader isOpen={loading} />
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState} to <span style={{color:'var(--button-color)'}}> <br /><Zap size={18}/>Spark</span>Study</h2>

          <p onClick={() => setShowLogin(false)} ><X/></p>

        </div>
        <p style={{ color: 'red' }}>{serverResponse}</p>
        <div className="login-popup-inputs">
          {currState === "Log In" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
          }
          <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Your email' autoComplete="username" required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Log In"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the <span style={{color:'blue'}} onClick={()=>{navigate('/terms-and-privacy-policy'); setShowLogin(false)}} >terms of use & privacy policy</span></p>

        </div>
        {currState === "Log In"
          ? <p>create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Log In")}>Log In here</span></p>}

      </form>
      
    </div>
  )
}

export default LoginPopUp
