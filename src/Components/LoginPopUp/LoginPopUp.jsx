import React, { useEffect } from 'react'
import './LoginPopUp.css'
import axios from 'axios'
import { useContext, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import Loader from '../loaderSpin/Loader'
import PopUp from '../PopUp/PopUp'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, X, Zap } from 'lucide-react'


const LoginPopUp = () => {

  const { url, setToken, userData, setUserData,showPopup, setShowPopup, setShowLogin } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Log In")
  const [loading, setLoading] = useState(false)
  const [signUpSuccess, setSignUpSuccess] = useState(false)
  const [serverResponse, setServerResponse] = useState(null)
   const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [resendTimer, setResendTimer] = useState(0)

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  // Email resend timer for registration
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer])

  // Helper function to format seconds into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

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
      setSignUpSuccess(false)
      setServerResponse(null)
      setLoading(true)
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        if (currState === "Log In") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token)
          setUserData(response.data.data);
           const tempUserData = JSON.stringify(response.data.data);
        localStorage.setItem("userData", tempUserData)
      
        }
        
        setSignUpSuccess(true) 
        setResendTimer(60); 
      }
      setServerResponse(response.data.message)
      showPopup.show ? 

      setTimeout(()=>{
        if (currState === "Log In") {
            setShowLogin(false)
        }
        // else if(currState === "Sign Up"){
        //   setResendTimer(60);
        // }
        
        setTimeout(()=>{
          setShowPopup({show:false, response:"", title:""})
        },3000 ) 
      },1000 ) 
      : null
     
    
      
    } catch (error) {
      console.log("Error", error)
      setServerResponse("Server error try again later!")
     
      // showPopup.show ? 
      // setTimeout(()=>{
      //   setShowLogin(false)
      // },10 ) 
      // : null
      
    } finally {
      
      setLoading(false)
    }

  }

  
// popup message
  useEffect(()=>{
    setShowPopup(prev=>({...prev,show:true,response:serverResponse,title:currState}))
   
  },[serverResponse])

  // pingroute waking the server 
  useEffect(() => {
    axios.get(`${url}/api/ping`)
      // .then(() => console.log("Backend pinged successfully!"))
      .catch(() => console.log("Ping failed."));
  }, []);
  

  const popUpHide = (event)=>{
    event.target.className === "login-popup"?setShowLogin(false):null
  }
  // toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-popup' onClick={(event)=>popUpHide(event)}>
      <Loader isOpen={loading} />
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState} to <span style={{color:'var(--button-color)'}}> <br /><Zap size={18}/>Spark</span>Study</h2>

          <p onClick={() => setShowLogin(false)} ><X/></p>

        </div>
        <p style={{ color: 'red' }}>{serverResponse}</p>

        {
          signUpSuccess ? null
          :<div className="login-popup-inputs">
          {currState === "Log In" ? <></> : <div className="inpt-cont">
            <label htmlFor="name">Name:</label>
            <input id='name' name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' autoComplete='name' required />
          </div>
          }
          <div className="email-cont">
          <label htmlFor="email">Email:</label>
          <input id='email' name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Your email' autoComplete="username"  required />
          
          </div>
          
          <div className="password-cont">
          <label htmlFor="password">Password:</label>
          <div className="password-input-wrapper">
            
          <input id='password' name='password' onChange={onChangeHandler} value={data.password} type={showPassword ? "text" : "password"} className='password-input' placeholder='password' autoComplete='current-password' required />
          <button
                type="button"
                className="toggle-button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              
              </div>
              <p onClick={()=>{navigate('/auth/forgot-password'); setShowLogin(false)}} style={{textAlign:'right', cursor:'pointer'}} className="forgot-pass">Forgot password?</p>
          </div>
              
        </div>
        }
        
        {
          currState === "Log In" ? <button disabled={loading} className='send-btn' type='submit'>{currState === "Sign Up" ? "Create Account" : "Log In"}</button>
           : <div>
            {
              signUpSuccess ?
              <div>
           
              {resendTimer > 0 && (
                <span className="timer-text">
                  Resend available in {formatTime(resendTimer)}
                </span>
              )}
              <button
                type='submit'
                disabled={resendTimer > 0 || loading}
                className="submit-btn"
                style={{ marginTop: '1rem' }}
              >
                {loading ? "Sending..." : "Resend Confirmation Link"}
              </button>
            </div>
            : <button disabled={loading} className='send-btn' type='submit'>{currState === "Sign Up" ? "Create Account" : "Log In"}</button>
            }
           </div>
           
        }
        
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
