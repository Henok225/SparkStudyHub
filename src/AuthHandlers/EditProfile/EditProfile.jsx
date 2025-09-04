import React, { useContext, useState } from "react";
import { User, Mail } from "lucide-react";
import './EditProfile.css'
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

export default function EditProfile() {
  const {url, userData, token, setShowPopup} = useContext(StoreContext)
  const [username, setUsername] = useState("JaneDoe");
  const [email, setEmail] = useState("jane.doe@example.com");
  // const [bio, setBio] = useState("A passionate learner and student.");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(url+"/api/user/update-profile", {name:username},{
        headers:{
          "Content-Type":"application/json",
          "token":token
        }
        
      } )
      if(response.data.success){
        setLoading(false);
        // setMessage(response.data.message)
        setUsername("")
        setShowPopup({show:true, response:response.data.message, title:"Profile Update"})

      }
      else{setLoading(false);}
      
    } catch (error) {
      console.log("Error! updating profile is not successful!", error)
      setLoading(false);
    }
    
    
  };

  return (
    <>
      
      {/* <div className="profile-page-container"> */}
        <div className="profile-ed-form-card">
          <h2 className="profile-ed-form-title">
            <User size={24} />
            Edit Profile
          </h2>
          <form onSubmit={handleUpdateProfile}>
            <div className="profile-ed-form-group">
              <label htmlFor="username" className="profile-ed-form-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="profile-ed-form-input"
              />
            </div>
            {/* <div className="profile-ed-form-group profile-ed-form-group-with-icon">
              <label htmlFor="email" className="profile-ed-form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="profile-ed-form-input"
              />
              <Mail size={18} className="profile-ed-input-icon" />
            </div> */}
           
            <button
              type="submit"
              disabled={loading}
              className="profile-ed-submit-btn"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
            {message && (
              <p className={`profile-ed-message ${message.includes("success") ? "success" : "error"}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      {/* </div> */}
    </>
  );
}
