import { LockKeyholeOpenIcon } from 'lucide-react';
import React from 'react';

const SupAdminHome = () => {
  const adminActions = [
    {
      title: "Manage Content",
      description: "Create, edit, and publish new explanations and quizzes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      )
    },
    {
      title: "View Analytics",
      description: "Monitor user engagement, views, and performance trends.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-2">
          <line x1="18" x2="18" y1="20" y2="10" />
          <line x1="12" x2="12" y1="20" y2="4" />
          <line x1="6" x2="6" y1="20" y2="14" />
        </svg>
      )
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts and their permissions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: "Review Pending",
      description: "Approve or decline submissions from other authors.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    },
  ];

  const handleActionClick = (action) => {
    // Implement navigation logic here based on the action
    console.log(`Navigating to: ${action.title}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');

        .admin-welcome-page {
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

        .admin-welcome-page .welcome-section {
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
        
        .admin-welcome-page .welcome-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1f2937;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }
        
        .admin-welcome-page .welcome-subtitle {
          font-size: 1.25rem;
          color: #4b5563;
          margin-bottom: 2rem;
        }

        .admin-welcome-page .admin-actions-section {
          width: 100%;
          max-width: 80rem;
          margin-top: 5rem;
          text-align: center;
        }

        .admin-welcome-page .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding: 1rem;
        }
        
        .admin-welcome-page .action-card {
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

        .admin-welcome-page .action-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }
        
        .admin-welcome-page .action-card::before {
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
        
        .admin-welcome-page .action-card:hover::before {
          transform: translateY(0);
        }
        
        .admin-welcome-page .action-icon-container {
          background-color: #dbeafe;
          color: #2563eb;
          border-radius: 9999px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 1;
        }
        
        .admin-welcome-page .action-card:hover .action-icon-container {
          background-color: #2563eb;
          color: #ffffff;
        }
        
        .admin-welcome-page .action-icon {
          width: 3rem;
          height: 3rem;
        }
        
        .admin-welcome-page .action-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
          z-index: 1;
        }
        
        .admin-welcome-page .action-card p {
          font-size: 0.95rem;
          color: #6b7280;
          z-index: 1;
          max-width: 250px;
        }
      `}</style>
      
      <div className="admin-welcome-page">
        <section className="welcome-section">
            <LockKeyholeOpenIcon size={28}/>
          <h3 className="welcome-title">
            Welcome, Administrator!
          </h3>
          <p className="welcome-subtitle">
            Your hub for managing Spark Study content and users.
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

export default SupAdminHome;
