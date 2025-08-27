import './About.css'

// const About = () => {
//   return (
//     <div className='about'>
//         <div className="about-description">
//         <h1>About Spark Study</h1>
//         <p>Empowering Students to Succeed Through Clear Explanations, Interactive Quizzes, and Solved Exams.</p>
//         <h2>Our Mission</h2>
//         <div className="mision">
//           <div className="image"><img src="#" alt="" /></div>
//           <div>
//           <p>At Spark Study, we believe that every student deserves access to high-quality educational resources. Our mission is to make learning engaging, accessible, and effective by providing expertly curated content that helps students master complex topics and excel in their exams.</p>
//       </div>
//         </div>
//         <h2>Our Story</h2>
//         <div className="our">
//           <div className="image"><img src="#" alt="" /></div>
//           <div>
//           <p>Spark Study was born out of a shared passion for education and a desire to make learning more accessible. As university students ourselves, we experienced firsthand the challenges of understanding complex topics and preparing for high-stakes exams. We often found ourselves wishing for a platform that could break down difficult concepts into simple, easy-to-understand explanations and provide practical tools like quizzes and solved exams to reinforce learning.</p>
//     <p>Inspired by our own struggles and successes, we came together to create Spark Study—a platform designed by students, for students. Our goal is to empower learners like you with the resources and support you need to excel academically and achieve your dreams.</p>
    
//           </div>
//         </div>
    
      
        
//     <h2>What We Offer</h2>
//     <div className="offer">
//       <div className="image"><img src="#" alt="" /></div>
//       <ul>
//         <li><strong>Expertly Curated Content</strong>: Clear and concise explanations for complex topics.</li>
//         <li><strong>Interactive Quizzes</strong>: Test your knowledge and track your progress.</li>
//         <li><strong>Solved Entrance Exams</strong>: Practice with real exams and learn from detailed solutions.</li>
//         <li><strong>Personalized Learning</strong>: Learn at your own pace with our flexible plans.</li>
//     </ul>
//     </div>
    
//         </div>
//         <div className="about-founders">
//         {/* <h2>Meet the Team</h2> */}
//         </div>
//         <div className="about-team">
//         <h2>Join the Spark Study Community</h2>
//         <p>Ready to take your learning to the next level? Join Spark Study today and start your journey toward academic success.</p>
//         </div>
//         <button className='join-btn'>Get started for free</button>
      
//     </div>
//   )
// }


import { useState, useEffect } from 'react';
import { BookOpen, Lightbulb, GraduationCap, Users } from 'lucide-react';

const About = () => {

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger the fade-in animation on component mount
    setFadeIn(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .app-container {
          background-color: #f9fafb; /* bg-gray-50 */
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: #1f2937; /* text-gray-800 */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          transition-property: opacity;
          transition-duration: 1000ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-container {
          max-width: 1280px; /* container mx-auto */
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem; /* px-4 */
          padding-right: 1rem; /* px-4 */
          padding-top: 4rem; /* py-16 */
          padding-bottom: 4rem; /* py-16 */
        }
        @media (min-width: 768px) {
          .main-container {
            padding-top: 6rem; /* md:py-24 */
            padding-bottom: 6rem; /* md:py-24 */
          }
        }

        .header-section {
          text-align: center;
          margin-bottom: 4rem; /* mb-16 */
        }
        @media (min-width: 768px) {
          .header-section {
            margin-bottom: 5rem; /* md:mb-20 */
          }
        }

        .main-heading {
          font-size: 2.25rem; /* text-4xl */
          font-weight: 800; /* font-extrabold */
          color: #4338ca; /* text-indigo-700 */
          line-height: 1.25; /* leading-tight */
          letter-spacing: -0.025em; /* tracking-tight */
          margin-bottom: 1rem; /* mb-4 */
        }
        @media (min-width: 640px) {
          .main-heading {
            font-size: 3rem; /* sm:text-5xl */
          }
        }
        @media (min-width: 768px) {
          .main-heading {
            font-size: 3.75rem; /* md:text-6xl */
          }
        }
        
        .sub-heading {
          font-size: 1.125rem; /* text-lg */
          line-height: 1.75rem;
          color: #4b5563; /* text-gray-600 */
          max-width: 48rem; /* max-w-3xl */
          margin-left: auto;
          margin-right: auto;
        }
        @media (min-width: 768px) {
          .sub-heading {
            font-size: 1.25rem; /* md:text-xl */
          }
        }

        .mission-story-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem; /* gap-12 */
          max-width: 80rem; /* max-w-6xl */
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 4rem; /* mb-16 */
        }
        @media (min-width: 768px) {
          .mission-story-section {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 4rem; /* md:gap-16 */
            margin-bottom: 6rem; /* md:mb-24 */
          }
        }

        .card {
          background-color: #ffffff; /* bg-white */
          padding: 2rem; /* p-8 */
          border-radius: 1rem; /* rounded-2xl */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
          border: 1px solid #f3f4f6; /* border border-gray-100 */
          transition-property: all;
          transition-duration: 300ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card:hover {
          transform: scale(1.02);
        }
        @media (min-width: 640px) {
          .card {
            padding: 2.5rem; /* sm:p-10 */
          }
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem; /* mb-6 */
        }

        .icon-container {
          padding: 0.75rem; /* p-3 */
          border-radius: 9999px; /* rounded-full */
          margin-right: 1rem; /* mr-4 */
        }
        
        .icon-bg-indigo { background-color: #e0e7ff; }
        .icon-text-indigo { color: #6366f1; }
        .icon-bg-green { background-color: #d1fae5; }
        .icon-text-green { color: #10b981; }

        .card-title {
          font-size: 1.5rem; /* text-2xl */
          font-weight: 700; /* font-bold */
        }
        @media (min-width: 640px) {
          .card-title {
            font-size: 1.875rem; /* sm:text-3xl */
          }
        }

        .card-text {
          font-size: 1rem; /* text-base */
          line-height: 1.625; /* leading-relaxed */
          color: #4b5563; /* text-gray-600 */
        }

        .what-we-offer-section {
          max-width: 80rem; /* max-w-6xl */
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 4rem; /* mb-16 */
        }
        @media (min-width: 768px) {
          .what-we-offer-section {
            margin-bottom: 6rem; /* md:mb-24 */
          }
        }
        
        .section-title {
          font-size: 1.875rem; /* text-3xl */
          font-weight: 700; /* font-bold */
          text-align: center;
          margin-bottom: 2rem; /* mb-8 */
        }
        @media (min-width: 768px) {
          .section-title {
            font-size: 2.25rem; /* md:text-4xl */
          }
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem; /* gap-6 */
        }
        @media (min-width: 640px) {
          .features-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)); /* sm:grid-cols-2 */
          }
        }
        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr)); /* lg:grid-cols-4 */
          }
        }

        .feature-card {
          background-color: #ffffff; /* bg-white */
          padding: 1.5rem; /* p-6 */
          border-radius: 0.75rem; /* rounded-xl */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
          border: 1px solid #f3f4f6; /* border border-gray-100 */
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .feature-icon-lg {
          width: 3rem; /* w-12 */
          height: 3rem; /* h-12 */
          margin-bottom: 1rem; /* mb-4 */
        }
        
        .icon-blue { color: #3b82f6; }
        .icon-yellow { color: #eab308; }
        .icon-red { color: #ef4444; }
        .icon-teal { color: #14b8a6; }

        .feature-title {
          font-size: 1.125rem; /* text-lg */
          font-weight: 600; /* font-semibold */
          margin-bottom: 0.5rem; /* mb-2 */
        }

        .feature-description {
          font-size: 0.875rem; /* text-sm */
          line-height: 1.25rem;
          color: #4b5563; /* text-gray-600 */
        }

        .cta-section {
          text-align: center;
        }

        .cta-title {
          font-size: 1.875rem; /* text-3xl */
          font-weight: 700; /* font-bold */
          margin-bottom: 1.5rem; /* mb-6 */
        }
        @media (min-width: 768px) {
          .cta-title {
            font-size: 2.25rem; /* md:text-4xl */
          }
        }

        .cta-text {
          font-size: 1.125rem; /* text-lg */
          color: #4b5563; /* text-gray-600 */
          margin-bottom: 2rem; /* mb-8 */
          max-width: 48rem; /* max-w-2xl */
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          display: inline-block;
          background-color: #4338ca; /* bg-indigo-600 */
          color: #fff;
          font-weight: 700; /* font-bold */
          padding: 0.75rem 2rem; /* py-3 px-8 */
          border-radius: 9999px; /* rounded-full */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg */
          transition-property: all;
          transition-duration: 300ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }
        .cta-button:hover {
          background-color: #3730a3; /* hover:bg-indigo-700 */
          transform: scale(1.05);
        }

      `}</style>
      <div className="app-container" style={{ opacity: fadeIn ? 1 : 0 }}>
        
        <div className="main-container">
          
          <header className="header-section">
            <h1 className="main-heading">
              About Spark Study
            </h1>
            <p className="sub-heading">
              Empowering Students to Succeed Through Clear Explanations, Interactive Quizzes, and Solved Exams.
            </p>
          </header>

          <section className="mission-story-section">
            <div className="card">
              <div className="card-header">
                <div className="icon-container icon-bg-indigo">
                  <Lightbulb className="w-8 h-8 icon-text-indigo" />
                </div>
                <h2 className="card-title">Our Mission</h2>
              </div>
              <p className="card-text">
                At Spark Study, we believe that every student deserves access to high-quality educational resources. Our mission is to make learning engaging, accessible, and effective by providing expertly curated content that helps students master complex topics and excel in their exams.
              </p>
            </div>
            
            <div className="card">
              <div className="card-header">
                <div className="icon-container icon-bg-green">
                  <BookOpen className="w-8 h-8 icon-text-green" />
                </div>
                <h2 className="card-title">Our Story</h2>
              </div>
              <p className="card-text">
                Spark Study was born out of a shared passion for education and a desire to make learning more accessible. As university students ourselves, we experienced firsthand the challenges of understanding complex topics and preparing for high-stakes exams. We came together to create a platform designed by students, for students, to empower learners like you with the resources and support you need to excel.
              </p>
            </div>
          </section>

          <section className="what-we-offer-section">
            <h2 className="section-title">What We Offer</h2>
            <div className="features-grid">
              
              <div className="feature-card">
                <GraduationCap className="feature-icon-lg icon-blue" />
                <h3 className="feature-title">Expertly Curated Content</h3>
                <p className="feature-description">Clear and concise explanations for complex topics.</p>
              </div>
              
              <div className="feature-card">
                <Lightbulb className="feature-icon-lg icon-yellow" />
                <h3 className="feature-title">Interactive Quizzes</h3>
                <p className="feature-description">Test your knowledge and track your progress.</p>
              </div>
              
              <div className="feature-card">
                <BookOpen className="feature-icon-lg icon-red" />
                <h3 className="feature-title">Solved Entrance Exams</h3>
                <p className="feature-description">Practice with real exams and learn from detailed solutions.</p>
              </div>
              
              <div className="feature-card">
                <Users className="feature-icon-lg icon-teal" />
                <h3 className="feature-title">Personalized Learning</h3>
                <p className="feature-description">Learn at your own pace with our flexible plans.</p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <h2 className="cta-title">Join the Spark Study Community</h2>
            <p className="cta-text">
              Ready to take your learning to the next level? Join Spark Study today and start your journey toward academic success.
            </p>
            <a href="https://www.example.com" className="cta-button">
              Get started for free
            </a>
          </section>

        </div>
      </div>
    </>
  );

};

export default About

