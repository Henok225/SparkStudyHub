import React, { useState } from "react";
import { Sparkles, BookOpen, ClipboardList, LayoutDashboard, HelpCircle } from "lucide-react";

// Inline CSS for the component
const componentStyles = `
  .help-page {
    background-color: #f3f4f6;
    // min-height: 100vh;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    color: #374151;
  }
  
  .help-container {
    width: 100%;
    max-width: 48rem; /* Equivalent to max-w-2xl */
    background-color: var(--primary-background);
    border-radius: 0.75rem; /* Equivalent to rounded-xl */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Equivalent to shadow-lg */
    padding:  2rem;
  }
  
  .help-container h2 {
    font-size: 2.25rem; /* Equivalent to text-3xl */
    font-weight: 700; /* Equivalent to font-bold */
    text-align: center;
    color: #1e40af; /* Equivalent to text-blue-800 */
    margin-bottom: 1.5rem;
  }
  
  .help-accordion-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .help-section {
    border: 1px solid #e5e7eb; /* Equivalent to border border-gray-200 */
    border-radius: 0.5rem; /* Equivalent to rounded-lg */
    overflow: hidden;
  }

  .help-section:hover .help-title {
    background-color: #f9fafb;
  }
  
  .help-title {
    width: 100%;
    text-align: left;
    padding: 1rem 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.125rem; /* Equivalent to text-lg */
    font-weight: 600; /* Equivalent to font-semibold */
    transition: background-color 0.3s ease, color 0.3s ease;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #111827; /* Equivalent to text-gray-900 */
  }

  .help-title.open {
    color: #2563eb; /* Equivalent to text-blue-600 */
  }

  .title-content {
    display: flex;
    align-items: center;
    gap: 0.75rem; /* Equivalent to gap-3 */
  }

  .toggle-icon {
    font-size: 1.5rem; /* Equivalent to text-xl */
    color: #3b82f6; /* Equivalent to text-blue-500 */
    transform-origin: center;
    transition: transform 0.3s ease;
  }
  
  .help-content-wrapper {
    max-height: 0;
    transition: max-height 0.5s ease-in-out;
    overflow: hidden;
  }

  .help-content-wrapper.open {
    max-height: 24rem; /* Arbitrary large value to allow content to expand, equivalent to max-h-96 */
  }
  
  .help-content {
    padding: 1rem 1.25rem;
    color: #4b5563; /* Equivalent to text-gray-600 */
    line-height: 1.625;
    border-top: 1px solid #e5e7eb;
  }
`;

const helpSections = [
  {
    title: "Welcome to Spark Study!",
    content: `Track your learning progress automatically. Save lessons and quizzes to revisit later. Completed quizzes mark lessons as finished.`,
    icon: <Sparkles size={24} />,
  },
  {
    title: "How to Use Lessons",
    content: `Open a lesson → scroll through content → your time is tracked automatically. Click "Save" to bookmark lessons. Finished lessons are marked in your profile.`,
    icon: <BookOpen size={24} />,
  },
  {
    title: "Quizzes",
    content: `Complete quizzes to check your understanding. Quiz results are stored automatically.`,
    icon: <ClipboardList size={24} />,
  },
  {
    title: "Profile & Dashboard",
    content: `View your learning hours and recent activity. Track saved lessons, completed quizzes, and achievements.`,
    icon: <LayoutDashboard size={24} />,
  },
  {
    title: "Need More Help?",
    content: `Contact us via the Contact Us page, or send feedback directly through the app.`,
    icon: <HelpCircle size={24} />,
  },
];

// The main App component which renders the help sections
export default function HelpAndFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <style>{componentStyles}</style>
      <div className="help-page">
        <div className="help-container">
          <h2>Help & FAQ</h2>
          <div className="help-accordion-list">
            {helpSections.map((section, index) => (
              <div key={index} className="help-section">
                <button
                  className={`help-title ${openIndex === index ? 'open' : ''}`}
                  onClick={() => toggleSection(index)}
                >
                  <div className="title-content">
                    {section.icon}
                    <span>{section.title}</span>
                  </div>
                  <span className="toggle-icon">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                <div className={`help-content-wrapper ${openIndex === index ? 'open' : ''}`}>
                  <p className="help-content">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

