import React from 'react';
import './EthioCurHome.css'
import { assets } from '../../assets/assets';

// This is a placeholder for your assets.
// In a real application, you would replace this with your actual image imports.
const assetsA = {
  ethiopian_curriculum_icon: 'https://placehold.co/100x100/A0B9C9/000?text=ETHIO',
};

// All components, logic, and styling are in this single file as required.
const EthioCurHome = () => {
  // Array of grade levels to easily map and render the cards.
  const grades = [
    {
      grade: 9,
      title: "Grade 9",
      description: "Explore resources for Grade 9 students, including textbooks, study guides, and educational materials tailored to the Ethiopian curriculum."
    },
    {
      grade: 10,
      title: "Grade 10",
      description: "Access a variety of resources for Grade 10 students, including textbooks, study guides, and other educational materials designed to support learning."
    },
    {
      grade: 11,
      title: "Grade 11",
      description: "Find resources for Grade 11 students, including textbooks, study guides, and other educational materials that align with the Ethiopian curriculum."
    },
    {
      grade: 12,
      title: "Grade 12",
      description: "Discover resources for Grade 12 students, including textbooks, study guides, and other educational materials specifically designed for the Ethiopian curriculum."
    }
  ];

  return (
    <>
     
      
      <div className="app-container">
        {/* Welcome section with a clean, two-column layout */}
        <section className="welcome-section">
          <div className="welcome-text-container">
            <h1 className="welcome-title">
              Welcome to <span className="spark-study-span">Spark Study</span>
            </h1>
            <p className="welcome-paragraph">
              This section is dedicated to providing resources and information related to the Ethiopian curriculum. Whether you are a student, teacher, or parent, this section aims to support your learning journey and enhance your understanding.
            </p>
            <p className="update-note">
              Explore the available resources, access study materials, and stay updated with the latest information. We are committed to providing valuable content that aligns with the educational standards and requirements of Ethiopia.
            </p>
          </div>
          <img
            src={assets.ethiopian_curriculum_icon}
            alt="Ethiopian Flag"
            className="flag-icon"
          />
        </section>

        {/* Grade selection section with a dynamic grid and improved card design */}
        <section className="grade-section">
          <h2 className="grade-title">
            Select Your Grade
          </h2>
          <div className="grades-grid">
            {grades.map((item) => (
              <div
                key={item.grade}
                className="grade-card"
                onClick={() => window.location.href = `/ethiopian-curriculum/grade/${item.grade}`}
              >
                <div className="grade-icon-container">
                  {/* Inline SVG for a book with a checkmark, from Lucide Icons */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="grade-icon"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    <polyline points="9 11 11 13 15 9" />
                  </svg>
                </div>
                <h3>
                  {item.title}
                </h3>
                <p>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default EthioCurHome;
