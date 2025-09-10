import React, { useContext, useState } from 'react';
import { LayoutDashboard, LogIn, FileText, List, Plus, TrendingUp, Settings, BarChart2, PieChart, Users, Zap, X, Eye, Trash2, CheckCircle, Circle, MessageSquare, Menu, Globe, User } from 'lucide-react';
import './AdminPage.css'
// import FeedbackPage from './Components/FeedBack/FeedBack';
// import QuizzesPage from './Components/Quizzes/Quizzes';
// import ExplanationsPage from './Components/Explanation/Explanaion';
import AdminDashboard from './Dashboard/adminDashboard/AdminDashboard';
import SupAdmin from './Dashboard/SupAdmin/SupAdmin';
import QuizzesPage from './Quizzes/Quizzes';
import ExplanationsPage from './Explanation/Explanaion';
import FeedbackPage from './FeedBack/FeedBack';
import { StoreContext } from '../Context/StoreContext';


const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 const {userData} = useContext(StoreContext)
  const handlePreviewExplanation = (content) => {
    setPreviewContent(content);
    setIsModalOpen(true);
  };
  

  const renderPage = () => {
    switch (currentPage) {
      
      case 'dashboard':
        return userData.role.toLowerCase() === "superadmin" ? <SupAdmin /> : <AdminDashboard />;
      case 'explanations':
        return <ExplanationsPage onPreviewExplanation={handlePreviewExplanation} />;
      case 'quizzes':
        return <QuizzesPage  />;
      case 'feedback':
        return <FeedbackPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <style>
        {` 
          /* --- Media Queries for Mobile-First Design --- */
          @media (max-width: 768px) {
            
            .mobile-menu {
              display: ${isSidebarOpen ? 'flex' : 'none'};
            }
          }
         
          
        `}
      </style>

      <div className="admin-page">
        {/* Mobile Top Navigation */}
      {currentPage !== 'login' && (
        <header className="sidebar-mobile">
          <div className="flex-1">
            <h1 style={{fontSize:'30px',fontWeight:800, color:'violet'}} className="mobile-nav-logo">Spark Study Admin</h1>
          </div>
          <button className="nav-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu />
          </button>
          <nav className="mobile-menu" style={{ display: isSidebarOpen ? 'flex' : 'none' }}>
           
          <div className={`nav-item`} >
              <User size={20} />
              <span>Admin</span>
            </div>
            <div className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => { setCurrentPage('dashboard'); setIsSidebarOpen(false); }}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </div>
            <div className={`nav-item ${currentPage === 'explanations' ? 'active' : ''}`} onClick={() => { setCurrentPage('explanations'); setIsSidebarOpen(false); }}>
              <FileText size={20} />
              <span>Explanations</span>
            </div>
            <div className={`nav-item ${currentPage === 'quizzes' ? 'active' : ''}`} onClick={() => { setCurrentPage('quizzes'); setIsSidebarOpen(false); }}>
              <List size={20} />
              <span>Quizzes</span>
            </div>

            {/* <div className={`nav-item ${currentPage === 'feedback' ? 'active' : ''}`} onClick={() => { setCurrentPage('feedback'); setIsSidebarOpen(false); }}>
              <MessageSquare size={20} />
              <span>Feedback & Contact</span>
            </div> */}

            
          </nav>
        </header>
      )}

      <div className="app-container">
        {/* Desktop Sidebar */}
        {currentPage !== 'login' && (
          <aside className="sidebar-desktop">
            <div className="sidebar-brand">Spark Study Admin</div>
            <nav className="sidebar-nav">
            <div className={`nav-item `} >
              <User size={20} />
              <span>Admin</span>
            </div>
              <div className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentPage('dashboard')}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </div>
              <div className={`nav-item ${currentPage === 'explanations' ? 'active' : ''}`} onClick={() => setCurrentPage('explanations')}>
                <FileText size={20} />
                <span>Explanations</span>
              </div>
              <div className={`nav-item ${currentPage === 'quizzes' ? 'active' : ''}`} onClick={() => setCurrentPage('quizzes')}>
                <List size={20} />
                <span>Quizzes</span>
              </div>
              {/* <div className={`nav-item ${currentPage === 'feedback' ? 'active' : ''}`} onClick={() => setCurrentPage('feedback')}>
                <MessageSquare size={20} />
                <span>Feedback & Contact</span>
              </div> */}
              {/* <div className="nav-item" onClick={() => setCurrentPage('login')}>
                <LogIn size={20} />
                <span>Log Out</span>
              </div> */}
            </nav>
          </aside>
        )}

        <main className="main-content">
          {renderPage()}
        </main>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </button>
            <div className="modal-body">
              <h3>{previewContent.title}</h3>
              <p><strong>Subject:</strong> {previewContent.subject} | <strong>Grade:</strong> {previewContent.grade}</p>
              {previewContent.coverImage && <img src={previewContent.coverImage} alt="Cover" />}
              {previewContent.videoLink && (
                <iframe width="1232" height="693" src={previewContent.videoLink} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encryptedMedia; gyroscope; picture-in-picture; " referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          
              )}
              <p><strong>Description:</strong> {previewContent.description}</p>
              <p><strong>Learning Plan:</strong> {previewContent.plan}</p>
              <h4>Explanation Text:</h4>
              <p>
              <div dangerouslySetInnerHTML={{__html:previewContent.explanationText}} >
        </div>
                </p>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default AdminPage
