import { LockKeyholeOpenIcon } from 'lucide-react';
import React from 'react';

const AdminHome = () => {
  const adminActions = [
    {
      title: "Create New Content",
      description: "Start creating a new explanation or quiz for the curriculum.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-circle">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      )
    },
    {
      title: "View My Submissions",
      description: "Check the status of your submitted explanations and quizzes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-clock">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <path d="M14 2v6h6" />
          <circle cx="12" cy="15" r="4" />
          <path d="M12 13v2.5" />
          <path d="M12 15h2.5" />
        </svg>
      )
    },
    {
      title: "My Content Performance",
      description: "View analytics and user engagement for your published work.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      )
    },
    {
      title: "Edit My Profile",
      description: "Update your personal information and settings.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.39a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.73v.5a2 2 0 0 1-1 1.73l-.15.08a2 2 0 0 0-.73 2.73l.22.39a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.73v-.5a2 2 0 0 1 1-1.73l.15-.08a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    },
  ];

  const handleActionClick = (action) => {
    // Implement navigation logic here based on the action
    // console.log(`Navigating to: ${action.title}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');

        .admin-app-container {
          background-color: #f9fafb;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          overflow: hidden;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .welcome-section {
          width: 100%;
          max-width: 80rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding: 3rem;
          background-color: #ffffff;
          border-radius: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          animation: fadeIn 1s ease-in-out;
          text-align: center;
        }
        
        .welcome-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1f2937;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }
        
        .welcome-subtitle {
          font-size: 1.25rem;
          color: #4b5563;
          margin-bottom: 2rem;
        }

        .admin-actions-section {
          width: 100%;
          max-width: 80rem;
          margin-top: 5rem;
          text-align: center;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding: 1rem;
        }
        
        .action-card {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          animation: slideInUp 1s ease-out;
        }

        .action-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }
        
        .action-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), transparent);
          transform: translateY(100%);
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .action-card:hover::before {
          transform: translateY(0);
        }
        
        .action-icon-container {
          background-color: #dbeafe;
          color: #2563eb;
          border-radius: 9999px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 1;
        }
        
        .action-card:hover .action-icon-container {
          background-color: #2563eb;
          color: #ffffff;
        }
        
        .action-icon {
          width: 3rem;
          height: 3rem;
        }
        
        .action-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
          z-index: 1;
        }
        
        .action-card p {
          font-size: 0.95rem;
          color: #6b7280;
          z-index: 1;
          max-width: 250px;
        }
      `}</style>
      
      <div className="admin-app-container">
        <section className="welcome-section">
        <LockKeyholeOpenIcon size={28}/>
          <h3 className="welcome-title">
            Welcome, Content Contributor!
          </h3>
          <p className="welcome-subtitle">
            Your hub for creating and managing your content.
          </p>
        </section>

        <section className="admin-actions-section">
          <h2 className="welcome-title">
            Quick Actions
          </h2>
          <div className="actions-grid">
            {adminActions.map((action, index) => (
              <div
                key={index}
                className="action-card"
                onClick={() => handleActionClick(action)}
              >
                <div className="action-icon-container">
                  {action.icon}
                </div>
                <h3>
                  {action.title}
                </h3>
                <p>
                  {action.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminHome;
