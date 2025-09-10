import React, { useState, useEffect, useContext } from 'react';
import { User, Bookmark, Settings, Pencil, Lock, LogOut, BarChart3, Book, Brain, Star, MapPin, DeleteIcon, Loader } from 'lucide-react';
import './Newprofile.css'
import { StoreContext } from '../../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SmallLoader from '../../../Components/SmallLoaderSpin/SmallLoader';
import EditProfile from '../../../AuthHandlers/EditProfile/EditProfile';
import ResetPassword from '../../../AuthHandlers/ChangePassword/ChangePassword';

const fetchUserData = (userData) => {

  // const {userData} = useContext(StoreContext);


  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        profile: {
          username: userData ? userData.name : 'Anonymous',
          email: userData ? userData.email : 'Anonymous',
          grade: userData ? userData.grade : 'N/A',
          profilePicture: null,
          bio: userData ? userData.bio : 'This is your bio. Update it in settings.',
          location: userData ? userData.location : 'N/A',
          memberSince: userData ? new Date(userData.createdAt).toLocaleDateString() : 'N/A',

        },
        progress: userData.progress ? userData.progress : null,
        recentActivity: userData.recentActivity ? userData.recentActivity : [
          { title: 'Intro to React Hooks', type: 'Lesson', date: '2 days ago' },
          { title: 'Algebra I Quiz', type: 'Quiz', date: '3 days ago' },
          { title: 'The Scientific Method', type: 'Lesson', date: '1 week ago' },
        ],
        savedItems: userData.savedItems ? userData.savedItems : {
          quizzes: ['Chemistry Basics Quiz', 'World History - WWI Quiz', 'Physics - Motion Quiz'],
          lessons: ['Introduction to Java', 'Poetry Analysis', 'Human Anatomy'],
        }
      });
    }, 1500);
  });
};

// Main Export Component
// This component now wraps all the other components and handles navigation.
export default function NewProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const { token, userData, setShowLogin } = useContext(StoreContext);


  useEffect(() => {
    const getData = async () => {
      const data = await fetchUserData(userData);
      setUserInfo(data);
      setIsLoading(false);
    };


    getData();
  }, []);

  const renderContent = () => {
    if (!userInfo) return null;

    switch (activeSection) {
      case 'profile':
        return (
          <>
            <ProfileHeader profileData={userInfo.profile} />
            <div className="section-grid">
              <ProgressTracker />
              <RecentActivity />
            </div>
          </>
        );
      case 'progress':
        return (
          <>
            <ProgressTracker />
            <RecentActivity recentItems={userInfo.recentActivity} />
          </>
        );
      case 'saved':
        return <SavedItems />;
      case 'settings':
        return <AccountSettings />;
      default:
        return (
          <>
            <ProfileHeader profileData={userInfo.profile} />
            <div className="section-grid">
              <ProgressTracker />
              <RecentActivity />
            </div>
          </>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="spark-study-app loading-state">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading ...</p>
      </div>
    );
  }

  return (
    <div className="spark-study-app">
      <Navigation setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="profile-content">
        {renderContent()}
      </div>
    </div>
  );
}

// Navigation Component
function Navigation({ setActiveSection, activeSection }) {
  const navItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'progress', icon: BarChart3, label: 'Progress' },
    { id: 'saved', icon: Bookmark, label: 'Saved' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="navigation">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-button ${activeSection === item.id ? 'active' : ''}`}
          onClick={() => setActiveSection(item.id)}
        >
          <item.icon size={24} />
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ProfileHeader Component
function ProfileHeader({ profileData }) {
  const profilePicture = profileData.username.charAt(0).toUpperCase();
  return (
    <div className="profile-header">
      <div className="profile-photo-container">
        <div style={{
          backgroundImage: ` url('https://placehold.co/120x120/d1c4e9/673ab7?text=${profilePicture}')`
        }} className="profile-photo"></div>
      </div>
      <div className="profile-info">
        <h1 className="profile-name">{profileData.username}</h1>
        <p className="profile-email">{profileData.email}</p>
        <div className="profile-details">
          <p><MapPin size={18} /> <span className="detail-value">{profileData.location ? profileData.location : 'Unknown'}</span></p>
        </div>
      </div>
    </div>
  );
}

// AnimatedCounter Component
function AnimatedCounter({ endValue, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1500;

    const animateCount = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const currentCount = Math.min(
        Number(((progress / duration) * endValue).toFixed(2))
      );

      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [endValue]);

  return (
    <div className="counter">
      <span className="count-number">{count}</span>
      <span className="count-label">{label}</span>
    </div>
  );
}

// ProgressTracker Component
function ProgressTracker() {
  // We'll keep the state variables as they are, but fix how they're used.
  const [progressWidths, setProgressWidths] = useState({});
  const { url, token } = useContext(StoreContext);
  const [progressData, setProgressData] = useState({});
  const [loaded, setLoaded] = useState(false);

  // This useEffect runs only once when the component mounts.
  // Its sole purpose is to fetch the data and update the progressData state.
  useEffect(() => {
    const getProgress = async () => {
      try {
        const response = await axios.get(url + "/api/user/get-progress", {
          headers: {
            "Content-Type": "application/json",
            token: token
          }
        });
        // Set the progress data here.
        // The component will re-render, and the next useEffect will run.
        setProgressData(response.data.progress);
        setLoaded(true); // Set loaded to true after a successful fetch.
      } catch (error) {
        console.log("Error fetching user progress!", error);
      }
    };
    getProgress();
  }, [url, token]); // Added dependencies to fix React's exhaustive-deps warning

  useEffect(() => {
    // We check to make sure the data is valid before calculating.
    if (progressData.totalLessons && progressData.totalQuizzes) {
      const lessonsWidth = (progressData.completedLessons.length / progressData.totalLessons) * 100;
      const quizzesWidth = (progressData.completedQuizzes.length / progressData.totalQuizzes) * 100;

      setProgressWidths({
        lessons: `${lessonsWidth}%`,
        quizzes: `${quizzesWidth}%`,
      });
    }
  }, [progressData]);

  // Destructure the data here, so it's always up-to-date.
  const { learningHours, completedLessons, totalLessons, completedQuizzes, totalQuizzes } = progressData;

  return (
    <div className="progress-tracker-card">
      <h2>Your Progress <BarChart3 className="section-icon" /></h2>
      <div className="progress-container">
        <div className="progress-item">
          <span className="progress-label">Completed Lessons</span>
          <div className="progress-bar-container">
            <div
              className="progress-bar lessons-bar"
              style={loaded ? { width: progressWidths.lessons } : { width: 0 }}
            ></div>
          </div>
          <span className="progress-value">{completedLessons ? completedLessons.length : ""}/{totalLessons||0}</span>
        </div>
        <div className="progress-item">
          <span className="progress-label">Completed Quizzes</span>
          <div className="progress-bar-container">
            <div
              className="progress-bar quizzes-bar"
              style={loaded ? { width: progressWidths.quizzes } : { width: 0 }}
            ></div>
          </div>
          <span className="progress-value">{completedQuizzes ? completedQuizzes.length : ""}/{totalQuizzes||0}</span>
        </div>
      </div>
      <div className="learning-hours">
        <AnimatedCounter endValue={learningHours||0} label="Total Learning Hours" />
      </div>
    </div>
  );
}

// RecentActivity Component
function RecentActivity() {

  const { url, token, timeAgo } = useContext(StoreContext)
  const [recentItems, setRecentItems] = useState([]);
  const navigate = useNavigate();

  // fetch recent activity
  useEffect(() => {
    const fetchRecentViewdItem = async () => {
      try {
        const response = await axios.get(`${url}/api/user/get-recently-viewed`, {

          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        })
        setRecentItems(response.data.recentActivity)
        // console.log("recent items fetched: ", response.data)

      } catch (error) {
        console.log("Error fetching recently viewed items!", error)
      }
    }

    fetchRecentViewdItem()
  }, [])


  return (
    <div className="recent-activity-card">
      <h2>Recently Viewed</h2>
      <div className="recent-items-container">
        {recentItems && recentItems.length > 0 ? recentItems.map((item, index) => (
          <div key={index} onClick={()=>navigate('/'+item.itemId)} className="recent-item-wrapper">
            <div className="recent-item-card">
              <div className="item-icon">
                {item.itemType === 'lessons' ? <Book size={30} /> : <Brain size={30} />}
              </div>
              <div className="item-info">
                <h3>{item.itemTitle}</h3>
                <p>{item.itemType}</p>
              </div>
              <span className="item-date">{timeAgo(new Date(item.date))}</span>
            </div>
          </div>
        ))
          : <p>No recent activity </p>
        }
      </div>
    </div>
  );
}

// SavedItems Component
function SavedItems() {
  const [expandedQuiz, setExpandedQuiz] = useState(false);
  const [expandedLessons, setExpandedLessons] = useState(false);
  const [savedItems, setSavedItems] = useState({ quizzes: [], lessons: [] });
  const { url, token, userData, timeAgo, setShowPopup } = useContext(StoreContext);
  const [removeItem, setRemoveItem] = useState(false)
  const [removing, setRemoving] = useState(false);

  const date = (d) => new Date(d);
  // console.log(date.toLocaleString());
  const navigate = useNavigate();

  useEffect(() => {
    //  fetching saved items from backend 
    const fetchSavedItems = async () => {

      try {
        const response = await axios.get(`${url}/api/user/get-saved-items`, {
          headers: { token: token }
        });
        setSavedItems(response.data.savedItems);
      } catch (error) {
        console.log("Error fetching saved items", error);
      }
    }



    fetchSavedItems();

  }, [removeItem])

  // Removing saved item
  const removeSavedItem = async (itemAddress, itemTitle, itemType, date) => {
    // Logic to save the explanation 
    try {
      setRemoving(true);
      const response = await axios.post(`${url}/api/user/update-saved-items`, {
        userId: userData?.userId, // Assuming token is the user ID; adjust as necessary
        itemType: itemType, // or 'quizzes' or 'flashCards'
        itemAddress: itemAddress,
        itemTitle: itemTitle,
        date: new Date().toISOString()
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRemoving(false);
    } catch (error) {
      console.log("Error removing saved item", error);
      setRemoving(false);

    }
    // You can also update the UI to reflect the saved state
    setShowPopup({ show: true, response: "success!", title: `${itemType} removed!` })
    setRemoveItem(!removeItem);


  };



  return (
    <div className="saved-items-container">
      <div className="saved-section">
        <h2 onClick={() => setExpandedQuiz(!expandedQuiz)}>
          Saved Quizzes <Brain className="section-icon" />
          <span className={`expand-icon ${expandedQuiz ? 'rotated' : ''}`}>▼</span>
        </h2>
        <div className={`expandable-content ${expandedQuiz ? 'expanded' : ''}`}>
          <ul>
            {savedItems.quizzes.length > 0 ? savedItems.quizzes.map((quiz, index) => (
              <>
                <li style={{ cursor: 'pointer', display:'flex', flexDirection:'column',alignItems: 'flex-start' }} key={index}>
                <div style={{display:'flex', gap: '20px', justifyContent: 'space-betweeen', alignItem:'center', width:'100%'}}>
                  <span onClick={() => navigate(lesson.itemAddress)} style={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                    <Star size={16} className="item-icon-small" />
                    <span>{quiz.itemTitle}</span>
                  </span>
                  <span>
                    <DeleteIcon className='remove-icon' onClick={(e) => { removeSavedItem(quiz.itemAddress, quiz.itemTitle, "quizzes", quiz.date,e) }} size={18} />
                     
                  </span>
                  </div>
                  <span style={{ fontSize: '0.6rem', color: 'gray' }}>{timeAgo(new Date(quiz.date))}</span>

                </li>
                
              </>

            ))
              : <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                    color: "#374151",
                  }}
                >
                  <li
                    style={{
                      listStyle: "none",
                      fontSize: "18px",
                      fontWeight: "500",
                      marginBottom: "8px",
                    }}
                  >
                    No saved quizzes
                  </li>
                  <button
                    style={{
                      padding: "8px 16px",
                      marginTop: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "white",
                      backgroundColor: "#2563EB",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#1D4ED8")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#2563EB")}
                    onClick={() => navigate('/quizzes')}
                  >
                    Explore more quizzes
                  </button>
                </div>
              </>

            }
          </ul>
        </div>
      </div>
      <div className="saved-section">
        <h2 onClick={() => setExpandedLessons(!expandedLessons)}>
          Saved Lessons <Book className="section-icon" />
          <span className={`expand-icon ${expandedLessons ? 'rotated' : ''}`}>▼</span>
        </h2>
        <div className={`expandable-content ${expandedLessons ? 'expanded' : ''}`}>
          <ul>
            {savedItems.lessons.length > 0 ? savedItems.lessons.map((lesson, index) => (
              <>
                <li  style={{ cursor: 'pointer', display:'flex', flexDirection:'column',alignItems: 'flex-start' }} key={index}>
                  <div style={{display:'flex', gap: '20px', justifyContent: 'space-betweeen', alignItem:'center', width:'100%'}}>
                  <span onClick={() => navigate(lesson.itemAddress)} style={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                    <Book size={18} className="item-icon-small" />
                    <span>{lesson.itemTitle}</span>
                  </span>
                  <span>
                     <DeleteIcon className='remove-icon' onClick={() => { removeSavedItem(lesson.itemAddress, lesson.itemTitle, "lessons", lesson.date) }} size={18} />
                     
                  </span>
                  </div>
                  <span style={{ fontSize: '0.6rem', color: 'gray' }}>{timeAgo(new Date(lesson.date))}</span>

                </li>
                
              </>
            ))
              : <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                    color: "#374151",
                  }}
                >
                  <li
                    style={{
                      listStyle: "none",
                      fontSize: "18px",
                      fontWeight: "500",
                      marginBottom: "8px",
                    }}
                  >
                    No saved lessons
                  </li>
                  <button
                    style={{
                      padding: "8px 16px",
                      marginTop: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "white",
                      backgroundColor: "#2563EB",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#1D4ED8")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#2563EB")}
                    onClick={() => navigate('/explain')}
                  >
                    Explore more lessons
                  </button>
                </div>
              </>

            }
          </ul>
        </div>
      </div>

    </div>
  );
}

// AccountSettings Component
function AccountSettings() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const {userData,setUserData,token, setToken} = useContext(StoreContext);
  const navigate = useNavigate();
  const [confirmer, setConfirmer] = useState(null)
  const [settingFocus,setSettingFocus] = useState("")

  const handleEditProfile = () => {
    setModalTitle('Edit Profile');
    setModalMessage('This is a placeholder for the edit profile form.');
    setShowModal(true);
  };

  const handleChangePassword = () => {
    navigate('/auth/reset-password')
  };

  const handleLogout = () => {
    setModalTitle('Confirm Logout');
    setModalMessage('Are you sure you want to log out?');
    setShowModal(true);
    setConfirmer(logout)
  };
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    localStorage.removeItem("userData");
    setUserData({})
    navigate("/");
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalMessage('');
  };
  const handleConfirmModal = ()=>{
    confirmer();
    handleCloseModal();

  }

  return (
    <div className="account-settings-container">
      <h2>Account Settings <Settings className="section-icon" /></h2>
      <div className="settings-buttons-grid">
        <button className="settings-button" onClick={()=>setSettingFocus("edit profile")}>
          <Pencil size={20} />
          <span>Edit Profile</span>
        </button>
        <button className="settings-button" onClick={()=>setSettingFocus("reset password")}>
          <Lock size={20} />
          <span>Change Password</span>
        </button>
        <button className="settings-button logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

     <div className="profile-page-container">

     <div className="profile-page-container">
      {
        settingFocus === "edit profile" ? <EditProfile />:" "
      }
      {
        settingFocus === "reset password" ? <ResetPassword/>:" "
      }
      </div>
      
     </div>
      

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalTitle}</h3>
            <p>{modalMessage}</p>
            <div className="md-btns">
            <button className="modal-close-button" onClick={handleCloseModal}>Close</button>
            <button className="modal-close-button" onClick={()=>handleConfirmModal()}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


