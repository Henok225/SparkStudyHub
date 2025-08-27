import React, { useContext, useState } from 'react'
import './UserProfile.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import SavedQuizzes from './profilecomponents/SavedQuizzes/SavedQuizzes'
import SavedExplanations from './profilecomponents/SavedExplanations/SavedExplanations'
import QuizzesHistory from './profilecomponents/QuizzesHistory/QuizzesHistory'
import SavedBooks from './profilecomponents/SavedBooks/SavedBooks'
import Notes from './profilecomponents/Notes/Notes'
const UserProfile = () => {

    const {token,userData,setShowLogin} = useContext(StoreContext);
    const [viewTitle,setViewTitle] = useState('')
    const navigate = useNavigate();
    const [showprofileMenu,setShowProfileMenu] = useState(false);

    const ProfileHome = () => {
        return (
            <div className="profile-home">
                <h1>Welcome to your profile</h1>
                <p>Here you can manage your account, view your saved quizzes, and more.</p>
            </div>
        )
    }
   
   
    
    const SavedExams = () => {
        return (
            <div className="saved-exams">
                <h1>Saved Exams</h1>
                <p>Here you can view your saved exams.</p>
            </div>
        )
    }
   
    const TakenExplanations = () => {
        return (
            <div className="taken-explanations">
                <h1>Taken Explanations</h1>
                <p>Here you can view your taken explanations.</p>
            </div>
        )
    }
   
    const renderContent = () => {
        switch (viewTitle) {
            case 'Home':
                return <ProfileHome />
            case 'Saved quizzes':
                return <SavedQuizzes />
            case 'Saved explanations':
                return <SavedExplanations />
            case 'Saved books':
                return <SavedBooks />
            // case 'Saved exams':
            //     return <SavedExams />
            case 'Quizzes history':
                return <QuizzesHistory />
            case 'Notes':
                return <Notes />
            default:
                return <ProfileHome />
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.reload();
    }
    const handleLogin = () => {
        setShowLogin(true);
    }

  return (
    <>
    <button className='hide-sidebar' onClick={()=>setShowProfileMenu(!showprofileMenu)}>{showprofileMenu?"hide":"menu"}</button>
    {
        token?
        <div className={showprofileMenu?'profile profile-show-sb':'profile'}>
            
        <div className="sidebar">

          <figure>
              <div className="profile-img">
              <img src={assets.profile_icon} alt="profile image" />
          </div>
          <figcaption>
              <p className="name">{userData.name}</p>
              <p className="user-email">{userData.email}</p>
              <p className="plan">{userData.plan} user</p>
          </figcaption>
          </figure>
          <div className="profile-contents">
          <p onClick={()=>{setViewTitle("Home");setShowProfileMenu(false)}}>  <img src={assets.home_icon} alt=">" /> <span>Home</span></p>
              <p onClick={()=>{setViewTitle("Saved quizzes");setShowProfileMenu(false)}}>  <img src={assets.quiz_icon1} alt=">" /> <span>Saved quizzes</span></p>
              <p onClick={()=>{setViewTitle("Saved explanations");setShowProfileMenu(false)}}>  <img src={assets.explanation_icon} alt=">" /> <span>Saved explanations</span></p>
              <p onClick={()=>{setViewTitle("Saved books");setShowProfileMenu(false)}}>  <img src={assets.books_icon1} alt=">" /> <span>Saved books</span></p>
              <p onClick={()=>{setViewTitle("Saved exams");setShowProfileMenu(false)}}>  <img src={assets.previous_exam_icon1} alt=">" /> <span>Saved exams</span></p>
              <p onClick={()=>{setViewTitle("Quizzes history");setShowProfileMenu(false)}}>  <img src={assets.history_icon} alt=">" />_-- <span>Quizzes history</span></p>
              <p onClick={()=>{setViewTitle("Taken explanations");setShowProfileMenu(false)}}>  <img src={assets.history_icon} alt=">" /> <span>Taken explanations</span></p>
              <p onClick={()=>{setViewTitle("Notes");setShowProfileMenu(false)}}>  <img src={assets.note_icon1} alt=">" /> <span>Notes</span></p>
          </div>
        </div>
        <div className="content-view">
         {renderContent()}
        </div>
        
      </div>
      :<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}><p style={{textAlign:'center',fontSize:'20px',color:'green',fontWeight:'600'}}>You've not logged in! login / sign-in to see you profile</p>
      <button onClick={()=>setShowLogin(true)} style={{padding:'10px',border:'none',fontSize:'16px',backgroundColor:'var(--button-color)',color:'white',cursor:'pointer',borderRadius:'5px'}}>Login / Signn-in</button></div>
      }
   </>
  )
}

export default UserProfile
