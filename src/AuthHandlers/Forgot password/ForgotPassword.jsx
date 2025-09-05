import React, { useState, useEffect, useContext } from "react";
import './ForgotPassword.css'   
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const {url, token} = useContext(StoreContext)

  // Helper function to format seconds into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setMessage(""); // Clear previous messages
    setIsSuccess(false);

    try {
        setLoading(true);
        const response = await axios.post(url+'/api/user/forgot-password',{email:email});
        setMessage("A password reset link has been sent to your email.");
        setIsSuccess(true);
        setResendTimer(120); 
    } catch (error) {
        setMessage("Something went wrong. Try again!");
    }
     setLoading(false)


};

// Email resend timer
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  return (
    <>
      
      <div className="page-container">
        <div className="form-card">
          <h2 className="form-title">Forgot Password</h2>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          {isSuccess ? (
            <div>
              <p className="message success">
                {message}
              </p>
              {resendTimer > 0 && (
                <span className="timer-text">
                  Resend available in {formatTime(resendTimer)}
                </span>
              )}
              <button
                onClick={handleForgotPassword}
                disabled={resendTimer > 0 || loading}
                className="submit-btn"
                style={{ marginTop: '1rem' }}
              >
                {loading ? "Sending..." : "Resend Link"}
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleForgotPassword}
                disabled={loading}
                className="submit-btn"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              {message && (
                <p className={`message ${email.includes("error") ? "error" : "success"}`}>
                  {message}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
