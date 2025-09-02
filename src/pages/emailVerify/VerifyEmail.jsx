import React, { useEffect } from 'react'
import axios from 'axios'
import './Verify.css'
import { useContext, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate, useParams } from 'react-router-dom'


const VerifyEmail = () => {

    const {url} = useContext(StoreContext)
    const {token} = useParams();
    const [verifyResponse,setVerifyResponse] = useState("No response from server");
    const navigate = useNavigate();

    useEffect(() => {
    const onVerify = async ()=>{

        let newUrl = url;
        
       
        try {
          const response = await axios.get(`${url}/api/user/verifyemail`, {
            params: {token:token },
          });
          // alert(response.data.message); 
          setVerifyResponse(response.data.message)
        } catch (error) {
          console.error('Error verifying email:', error);
          if (error.response) {
            alert(error.response.data.message || 'An error occurred during verification.');
            setVerifyResponse(error.response.data.message)
          } else if (error.request) {
            alert('No response from the server. Please try again.');
          } else {
            alert('An error occurred. Please try again.');
            setVerifyResponse('An error occurred. Please try again.')
          }
        }
     
       }
       onVerify();
      }, [token]);

  return (
    <div className='email-verification' >
        <h2 >Email Verification</h2>
        <p>{verifyResponse} </p>
        <button onClick={()=>navigate("/")}>Ok</button>
    </div>
  )
}

export default VerifyEmail
