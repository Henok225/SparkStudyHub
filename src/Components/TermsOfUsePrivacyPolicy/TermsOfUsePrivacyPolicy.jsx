import React from 'react';
import { BookOpen, Shield, Lock, FileText, CheckCircle, Lightbulb, Share2, Globe, Sparkles } from 'lucide-react';

const TermsAndPrivacy = () => {

  return (
    // Style block for pure CSS
    <>
      <style>
        {`
          /* Global styles */
          .app-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background-color: #f3e8ff; /* purple-50 */
            min-height: 100vh;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Main content card */
          .content-card {
            width: 90%;
            max-width: 64rem; /* 1024px */
            padding: 2rem;
            background-color: #fff;
            border-radius: 2rem; /* 32px */
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            display: flex;
            flex-direction: column;
            // overflow:hidden;
            gap: 2rem;
          }
          
          @media (min-width: 640px) {
            .content-card {
              padding: 3rem;
            }
          }

          /* Section heading styles */
          .section-heading-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 0.5rem;
          }

          .section-heading {
            font-size: 1.5rem;
            font-weight: 800;
            color: #5b21b6; /* purple-800 */
            text-align: center;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          @media (min-width: 640px) {
            .section-heading {
              font-size: 2.5rem;
            }
          }
          
          /* Icon animation */
          .animate-pulse-icon {
            animation: pulse-icon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          @keyframes pulse-icon {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }

          /* Content styles */
          .content-paragraph {
            font-size: 1rem;
            // line-height: 1.625;
            color: #4b5563; /* gray-700 */
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          @media (min-width: 640px) {
            .content-paragraph {
              font-size: 1.125rem;
            }
          }

          .content-list {
            width:80%
            list-style-type: disc;
            list-style-position: inside;
            margin:0;
            padding:0;
            // margin-left: rem;
            font-size: 1rem;
            line-height: 1.625;
            color: #4b5563;
            display;flex;
            flex-direction:column;
            justify-content:flex-start;
          }

          @media (min-width: 640px) {
            .content-list {
              font-size: 1.125rem;
            }
          }
          
          .content-list li {
            margin-bottom: 0.5rem;
            // text-wrap:wrap;
          }

          .content-title {
            font-weight: 700;
            color: #6d28d9; /* purple-700 */
          }

          .sub-heading {
            font-size: 20px;
            font-weight: 700;
            color: #6d28d9; /* purple-700 */
            margin:0;
            margin-bottom: 0.5rem;
          }

          @media (min-width: 640px) {
            .sub-heading {
              font-size: 20px;
            }
          }

          .icon-item-container {
            display: flex;
            justify-content:flex-start;
            align-items: center;
            gap: 1rem;
          }

          .icon-item-container .icon {
            flex-shrink: 0;
            margin-top: 0.25rem; /* 4px */
          }
        `}
      </style>

      {/* Main container */}
      <div className="app-container">
        <div className="content-card">

          {/* Terms of Use section */}
          <section>
            <div className="section-heading-container">
              <Sparkles size={48} className="text-purple-600 animate-pulse-icon" />
              <h1 className="section-heading">Terms of Use</h1>
            </div>
            
            <div className="content-paragraph">
              <div className="icon-item-container">
                <BookOpen size={28} className="text-purple-600 icon" />
                <p><strong className="content-title">Purpose:</strong> Spark Study provides educational notes, quizzes, and exam preparation materials for students.</p>
              </div>
              <div className="icon-item-container">
                <CheckCircle size={28} className="text-purple-600 icon" />
                <p><strong className="content-title">Use of Service:</strong> By using Spark Study, you agree to use the platform only for personal learning and not for any illegal or harmful purposes.</p>
              </div>
              <div className="icon-item-container">
                <Lock size={28} className="text-purple-600 icon" />
                <p><strong className="content-title">Content Ownership:</strong> All materials on Spark Study are for educational use. You may not copy, sell, or redistribute content without permission.</p>
              </div>
              <div className="icon-item-container">
                <Lightbulb size={28} className="text-purple-600 icon" />
                <p><strong className="content-title">Accuracy:</strong> While we aim to provide correct information, Spark Study does not guarantee that all content is free of errors. Users are encouraged to cross-check with official resources.</p>
              </div>
              <div className="icon-item-container">
                <Globe size={28} className="text-purple-600 icon" />
                <p><strong className="content-title">Changes:</strong> Spark Study may update or change its content and services at any time.</p>
              </div>
            </div>
          </section>

          {/* Divider line */}
          <hr style={{ borderTop: '2px solid #ddd' }} />

          {/* Privacy Policy section */}
          <section>
            <div className="section-heading-container">
              <Shield size={48} className="text-purple-600 animate-pulse-icon" />
              <h1 className="section-heading">Privacy Policy</h1>
            </div>
            
            <div className="content-paragraph">
              <div>
                <div className="icon-item-container">
                  <FileText size={24} className="text-purple-600" />
                  <h2 className="sub-heading">Data We Collect:</h2>
                </div>
                <ul className="content-list">
                  <li>Basic account details (name, email) when you sign up.</li>
                  <li>Quiz results and progress to improve your learning experience.</li>
                </ul>
              </div>
              
              <div>
                <div className="icon-item-container">
                  <Lightbulb size={24} className="text-purple-600" />
                  <h2 className="sub-heading">How We Use Data:</h2>
                </div>
                <ul className="content-list">
                  <li>To personalize your learning journey.</li>
                  <li>To improve Spark Study’s features and services.</li>
                </ul>
              </div>
              
              <div>
                <div className="icon-item-container">
                  <Share2 size={24} className="text-purple-600" />
                  <h2 className="sub-heading">Data Sharing:</h2>
                </div>
                <ul className="content-list">
                  <li>We do not sell or share your personal information with third parties.</li>
                  <li>Data may only be shared if required by law.</li>
                </ul>
              </div>
              
              <div>
                <div className="icon-item-container">
                  <Lock size={24} className="text-purple-600" />
                  <h2 className="sub-heading">Security:</h2>
                </div>
                <p>We take reasonable measures to keep your data safe, but we cannot guarantee 100% security.</p>
              </div>
              
              <div>
                <div className="icon-item-container">
                  <Shield size={24} className="text-purple-600" />
                  <h2 className="sub-heading">Your Control:</h2>
                </div>
                <p>You may request deletion of your account and data at any time by contacting us.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );

};

export default TermsAndPrivacy ;
