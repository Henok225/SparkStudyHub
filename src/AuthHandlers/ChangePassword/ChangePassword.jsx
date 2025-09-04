import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import './ChangePassword.css'
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [resetSuccess,setResetSuccess] = useState(null)
  const [loading, setLoading] = useState(false);
  const {url, token, setShowPopup} = useContext(StoreContext)
  
  const navigate = useNavigate();
  const {resetToken} = useParams();
  const myToken = resetToken || token;

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setMessage("Please fill in both password fields.");
      setResetSuccess(false)
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setResetSuccess(false)
      return;
    }
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setResetSuccess(false)
      return;
    }

    setLoading(true);
    setMessage("");

    try {
       console.log(myToken+ " : "+password)
        const response = await axios.post(url+'/api/user/reset-password',{newPassword:password, token:myToken});
        setResetSuccess(response.data.success)
        setMessage(response.data.message);
        setPassword("");
        setConfirmPassword("");
        if(response.data.success){
            setTimeout(()=>{
                navigate('/')
            },2000)
        }

    } catch (error) {
        console.log("Error reseting emai",error)
        setMessage("Invalid or expired token. Please try again.");
        setResetSuccess(false)
    }
    setLoading(false);

  };

  return (
    <>
      
      {/* <div className="page-container"> */}
        <div className="res-form-card">
          <h2 className="res-form-title">Reset Password</h2>
          <div className="res-form-group">
            <label htmlFor="password" className="res-form-label">
              New Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="res-form-input"
            />
            <span 
              className="res-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </div>
          <div className="res-form-group">
            <label htmlFor="confirmPassword" className="res-form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="res-form-input"
            />
          </div>
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="res-submit-btn"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          {message && (
            <p className={`res-message ${resetSuccess ? "res-success" : "res-error"}`}>
              {message}
            </p>
          )}
        </div>
      {/* </div> */}
    </>
  );
}
