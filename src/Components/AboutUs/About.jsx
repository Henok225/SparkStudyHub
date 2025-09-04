import './About.css'
import { useState, useEffect, useContext } from 'react';
import { BookOpen, Lightbulb, GraduationCap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import Flagged from '../ReusableComponents/Flagging/Flagged';

const About = () => {

  const [fadeIn, setFadeIn] = useState(false);
  const {token,setShowLogin} = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the fade-in animation on component mount
    setFadeIn(true);
  }, []);

  

  return (
    <>
      
    
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
            <div className="about-card">
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
            
            
            <div className="about-card">
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
                <Flagged title="Comming soon"/>
                <BookOpen className="feature-icon-lg icon-red" />
                <h3 className="feature-title">Solved Entrance Exams</h3>
                <p className="feature-description">Practice with real exams and learn from detailed solutions.</p>
              </div>
              
              <div className="feature-card">
              <Flagged title="Comming soon"/>
                <Users className="feature-icon-lg icon-teal" />
                <h3 className="feature-title">Personalized Learning</h3>
                <p className="feature-description">Learn at your own pace with our flexible plans.</p>
              </div>
            </div>
          </section>

         

          <section className="about-cta-section">
            <h2 className="about-cta-title">Join the Spark Study Community</h2>
            <p className="about-cta-text">
              Ready to take your learning to the next level? Join Spark Study today and start your journey toward academic success.
            </p>
            <a onClick={()=> token ? navigate('/') :setShowLogin(true)} className="about-cta-button">
              Get started for free
            </a>
          </section>

        </div>
      </div>
    </>
  );

};

export default About

