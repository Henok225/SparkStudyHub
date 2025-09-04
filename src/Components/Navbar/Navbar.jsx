import React, { useContext, useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import { Archive, BookOpenCheck, ClipboardList, HelpCircle, Home, Mail, Menu, MessageCircle, ScrollText, User, UserRoundSearch, UsersRound, X, Zap } from 'lucide-react'; // Using lucide-react for icons
import Flagged from '../ReusableComponents/Flagging/Flagged';


const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const { token, setToken, userData, setUserData, setShowLogin } = useContext(StoreContext)
  const [dropDownProfile,setDropDownProfile] = useState(false)
  const menuClickHandler = () => {
    setShowMenu(!showMenu);
  }
  // if(showMenu){
  //   document.body.addEventListener("click", (event)=>{
  // //  event.target.className === "menu" ? console.log("outside menu"):setShowMenu(false)
  // let eventClassName = event.target.className;
  // eventClassName === "menu"? console.log(true):setShowMenu(false);
  // })
  // }

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    localStorage.removeItem("userData");
    setUserData({})
    navigate("/");
  }
  const menuListHide = (event) => {
    event.target.className === "menu-container" ? setShowMenu(false) : null
  }

  const NavigationsList = (props) => {

    return (
      <>



        <p onClick={() => { navigate("/"); props.isMenu ? menuClickHandler() : "" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
          </svg>

          {" "} Home</p>
        {/* <p onClick={()=>{ navigate("/"); props.isMenu ? menuClickHandler():""}}>Services</p> */}
        {/* <p onClick={()=>{ navigate("/plans"); props.isMenu ? menuClickHandler():""}}>Plans</p> */}
        <p onClick={() => { navigate("/explain"); props.isMenu ? menuClickHandler() : "" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" width="20" height="20" stroke-width="2" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4z" />
            <path d="M8 8h8M8 12h6M8 16h4" />
          </svg>
          {" "} Learn</p>
        <p onClick={() => { navigate("/quizzes"); props.isMenu ? menuClickHandler() : "" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 1 1 5.83 1c-.23.58-.82 1-1.42 1.27-.61.27-1.5.83-1.5 1.73v.5" />
            <line x1="12" y1="17" x2="12" y2="17" />
          </svg>


          {" "}
          Take quiz</p>
        {/* <p onClick={()=>{ navigate("/exams"); props.isMenu ? menuClickHandler():""}}>Previous exams</p> */}
        <p onClick={() => { navigate("/about"); props.isMenu ? menuClickHandler() : "" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          {" "}
          About us</p>
        <p onClick={() => { navigate("/contact"); props.isMenu ? menuClickHandler() : "" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4z" />
            <path d="M4 4l8 8 8-8" />
          </svg>
          {" "}
          Contact us</p>
        <p onClick={() => { navigate("/feedback"); props.isMenu ? menuClickHandler() : "" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>

          {" "}
          Feedback </p>

      </>
    )
  }
  return (
    <>
      {/* <div className="navbar-container"> */}
      <div id='header-bar' className='navbar'>
        <div onClick={()=>navigate('/')} className="logo"><p> <Zap /> <span className='logo-text'>SparkStudy</span> </p></div>
        <div className="navbar-right">
          <div className="signin-login">
            {!token ? <p onClick={() => setShowLogin(true)}><User size={18} /><span>Log In</span></p>
              : <div className='navbar-profile' onClick={()=>setDropDownProfile(!dropDownProfile)}> <User size={30} />
                <div style={dropDownProfile?{display:'flex'}:null} className="nav-profile-dropdown ">
                 <span style={{display:'inline-block',textAlign:'right'}}><X/></span>
                  <div className="profile-img">
                    <img src={assets.profile_icon} alt="" />

                    <p className='user-name'>{userData !== null ? userData.name : ""}</p>
                    <p className='email'>{userData !== null ? userData.email : ""}</p>
                    <p className='plan'>{userData !== null ? userData.plan : ""} user</p>
                  </div>
                  <div className="links">
                    <p onClick={() => navigate('/profile')}> <User size={18}/><span>my profile</span> </p>
                    <p onClick={() => navigate('/profile')}> <Mail size={18}/><span>change email</span> </p>
                    <p onClick={() => navigate('/feedback')}> <MessageCircle size={18}/><span>feedback</span> </p>
                    <p onClick={() => navigate('/help')}> <HelpCircle size={18}/><span>help</span> </p>
                    <div className='logout-icon' onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></div>
                  </div>
                </div>

              </div>
            }
          </div>
          <div className={showMenu ? "menu-icon  hide-menu-icon" : "menu-icon"} onClick={menuClickHandler}>
            <button className="menu-button">
              <Menu size={24} />
            </button>

          </div>
        </div>



      </div>
      <div className="nav-lists">
        <p onClick={() => { navigate("/") }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
          </svg> Home</p>
        <p className='res-nav' onClick={() => { setShowResources(!showResources) }}><Archive size={18}/> Resources</p>
        <p onClick={() => { navigate("/about") }}>
          <UsersRound size={18} />
          About us</p>
        <p onClick={() => { navigate("/contact") }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4z" />
            <path d="M4 4l8 8 8-8" />
          </svg>
          {" "}{" "}
          Contact us</p>
        <p onClick={() => { navigate("/feedback") }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>

          {" "}
          Feedback </p>
      </div>
      <div className={showResources ? "resources show-resources" : "resources"} onMouseLeave={() => setShowResources(false)}>

        <div className="tit">
          <h3> <Archive size={30} /> Resources</h3>
          <div className="reso-list">
            <ul>
              <li onClick={()=>{navigate('/explain'); setShowResources(false)}}> <BookOpenCheck size={18} /> Learn</li>
              <li onClick={()=>{navigate('quizzes'); setShowResources(false)}}> <ClipboardList size={18} /> Quizzes</li>
              <li onClick={()=>{navigate('ethiopian-curriculum'); setShowResources(false)}}> <ScrollText size={18} /> Ethiopian Curriculum</li>
              <li> <UserRoundSearch size={18} /> Find tutor</li>

            </ul>
          </div>
        </div>


        <div className="res-list">

          <p onClick={() => { navigate("/explain"); setShowResources(false) }}> <span className="image"><img src={assets.explanation_icon} alt="" /></span> <span className="res-tit">Learn</span></p>
          <p onClick={() => { navigate("/quizzes"); setShowResources(false) }}> <span className="image"><img src={assets.quiz_icon1} alt="" /></span> <span className="res-tit">Take quiz</span></p>
          <p onClick={() => { navigate("/"); setShowResources(false) }}> <span className="image"><Flagged title="Coming Soon"/><img src={assets.previous_exam_icon1} alt="" /></span> <span className="res-tit">Previous exams </span><span></span></p>
          <p onClick={() => { navigate("/"); setShowResources(false) }}> <span className="image"><Flagged title="Coming Soon"/><img src={assets.books_icon1} alt="" /></span> <span className="res-tit">Books</span></p>

        </div>
      </div>
      <div onClick={(event) => menuListHide(event)} className={showMenu ? "menu-container" : ""}>
        <div className={showMenu ? "menu" : "menu menu-hide"}>
          <div className="menu-list">
            <h2 className="logo-name">SparkStudy</h2>

            <NavigationsList isMenu={true} />

          </div>


        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default Navbar
