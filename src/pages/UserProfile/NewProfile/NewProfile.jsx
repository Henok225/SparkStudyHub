import React, { useState, useEffect, useContext } from 'react';
import { User, Bookmark, Settings, Pencil, Lock, LogOut, BarChart3, Book, Brain, Star, MapPin } from 'lucide-react';
import './Newprofile.css'
import { StoreContext } from '../../../Context/StoreContext';
// Simulated backend data fetching
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
        progress: userData.progress ? userData.progress : {
          learningHours: userData.learningHours ? userData.learningHours : 10,
          completedLessons: userData.completedLessons ? userData.completedLessons : 0,
          totalLessons: userData.totalLessons ? userData.totalLessons : 0,
          completedQuizzes: userData.completedQuizzes ? userData.completedQuizzes : 0,
          totalQuizzes: userData.totalQuizzes ? userData.totalQuizzes : 0,
        },
        recentActivity:userData.recentActivity? userData.recentActivity : [
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
  const {token, userData, setShowLogin} = useContext(StoreContext);
  

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
              <ProgressTracker progressData={userInfo.progress} />
              <RecentActivity recentItems={userInfo.recentActivity} />
            </div>
          </>
        );
      case 'progress':
        return (
          <>
            <ProgressTracker progressData={userInfo.progress} />
            <RecentActivity recentItems={userInfo.recentActivity} />
          </>
        );
      case 'saved':
        return <SavedItems savedItems={userInfo.savedItems} />;
      case 'settings':
        return <AccountSettings />;
      default:
        return (
          <>
            <ProfileHeader profileData={userInfo.profile} />
            <div className="section-grid">
              <ProgressTracker progressData={userInfo.progress} />
              <RecentActivity recentItems={userInfo.recentActivity} />
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
        <div style={{backgroundImage:` url('https://placehold.co/120x120/d1c4e9/673ab7?text=${profilePicture}')`
  }} className="profile-photo"></div>
      </div>
      <div className="profile-info">
        <h1 className="profile-name">{profileData.username}</h1>
        <p className="profile-email">{profileData.email}</p>
        <div className="profile-details">
          <p><MapPin size={18} /> <span className="detail-value">{profileData.location?profileData.location:'Unknown'}</span></p>
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
function ProgressTracker({ progressData }) {
  const [progressWidths, setProgressWidths] = useState({});

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgressWidths({
        lessons: `${(progressData.completedLessons / progressData.totalLessons) * 100}%`,
        quizzes: `${(progressData.completedQuizzes / progressData.totalQuizzes) * 100}%`,
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [progressData]);

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
              style={{ width: progressWidths.lessons }}
            ></div>
          </div>
          <span className="progress-value">{completedLessons}/{totalLessons}</span>
        </div>
        <div className="progress-item">
          <span className="progress-label">Completed Quizzes</span>
          <div className="progress-bar-container">
            <div
              className="progress-bar quizzes-bar"
              style={{ width: progressWidths.quizzes }}
            ></div>
          </div>
          <span className="progress-value">{completedQuizzes}/{totalQuizzes}</span>
        </div>
      </div>
      <div className="learning-hours">
        <AnimatedCounter endValue={learningHours} label="Total Learning Hours" />
      </div>
    </div>
  );
}

// RecentActivity Component
function RecentActivity({ recentItems }) {
  return (
    <div className="recent-activity-card">
      <h2>Recently Viewed</h2>
      <div className="recent-items-container">
        {recentItems.length > 0 ? recentItems.map((item, index) => (
          <div key={index} className="recent-item-wrapper">
            <div className="recent-item-card">
              <div className="item-icon">
                {item.type === 'Lesson' ? <Book size={36} /> : <Brain size={36} />}
              </div>
              <div className="item-info">
                <h3>{item.title}</h3>
                <p>{item.type}</p>
              </div>
              <span className="item-date">{item.date}</span>
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
function SavedItems({ savedItems }) {
  const [expandedQuiz, setExpandedQuiz] = useState(false);
  const [expandedLessons, setExpandedLessons] = useState(false);

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
              <li key={index}><Star size={16} className="item-icon-small" /> {quiz}</li>
            ))
          : <li>No saved quizzes</li>
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
              <li key={index}><Book size={16} className="item-icon-small" /> {lesson}</li>
            ))
          : <li>No saved lessons</li>
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

  const handleEditProfile = () => {
    setModalTitle('Edit Profile');
    setModalMessage('This is a placeholder for the edit profile form.');
    setShowModal(true);
  };

  const handleChangePassword = () => {
    setModalTitle('Change Password');
    setModalMessage('This is a placeholder for the change password form.');
    setShowModal(true);
  };

  const handleLogout = () => {
    setModalTitle('Confirm Logout');
    setModalMessage('Are you sure you want to log out?');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalMessage('');
  };

  return (
    <div className="account-settings-container">
      <h2>Account Settings <Settings className="section-icon" /></h2>
      <div className="settings-buttons-grid">
        <button className="settings-button" onClick={handleEditProfile}>
          <Pencil size={20} />
          <span>Edit Profile</span>
        </button>
        <button className="settings-button" onClick={handleChangePassword}>
          <Lock size={20} />
          <span>Change Password</span>
        </button>
        <button className="settings-button logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalTitle}</h3>
            <p>{modalMessage}</p>
            <button className="modal-close-button" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}


