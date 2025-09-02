import React, { useEffect, useState, useRef } from 'react';
import {
  GraduationCap, Lightbulb, BookText, Sparkles, Rocket, History, Star,
  Trophy, Medal, Check, X,
  BarChart2, CircleDot, Clock, CheckCircle, Award,
} from 'lucide-react';

import './Rghmex.css'
import { useNavigate } from 'react-router-dom';
// Data for demonstration purposes
const recommendedLessons = [
  { id: 1, title: 'Introduction to React Hooks', progress: 75, type: 'Lesson' },
  { id: 2, title: 'Data Structures with Python', progress: 50, type: 'Lesson' },
  { id: 3, title: 'Historical Facts Quiz', progress: 100, type: 'Quiz' },
  { id: 4, title: 'Chemistry 101: Atoms & Molecules', progress: 25, type: 'Lesson' },
  { id: 5, title: 'Algebra Fundamentals', progress: 0, type: 'Lesson' },
  { id: 6, title: 'World Geography Quiz', progress: 60, type: 'Quiz' },
];

const recentlyViewed = [
  { id: 1, title: 'World War II: The European Theater', progress: 60, type: 'Lesson' },
  { id: 2, title: 'React State Management', progress: 80, type: 'Lesson' },
  { id: 3, title: 'Periodic Table Quiz', progress: 40, type: 'Quiz' },
  { id: 4, title: 'Introduction to Financial Accounting', progress: 95, type: 'Lesson' },
  { id: 5, title: 'Beginner Spanish Vocabulary', progress: 20, type: 'Lesson' },
];

const featuredCourse = {
  id: 1,
  title: 'Mastering Machine Learning with Python',
  description: 'Dive deep into algorithms like neural networks, decision trees, and more. This course includes hands-on projects to build your portfolio.',
  link: '#',
};

const learningStats = {
  hoursSpent: 125,
  lessonsCompleted: 42,
  quizzesPassed: 18,
};

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Learning is not a spectator sport.", author: "George Bernard Shaw" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" }
];

const learningTechniques = [
  { id: 1, title: 'Spaced Repetition', description: 'Reviewing information at increasing intervals over time to improve retention.' },
  { id: 2, 'title': 'The Feynman Technique', description: 'Explaining a complex topic in simple terms to uncover gaps in your understanding.' },
  { id: 3, title: 'Active Recall', description: 'Testing your memory by retrieving information rather than just rereading it.' },
  { id: 4, title: 'Interleaving', description: 'Mixing different subjects or types of problems to improve your ability to discriminate between concepts.' },
  { id: 5, title: 'Mind Mapping', description: 'Visually organizing information to create a clear, interconnected structure.' },
  { id: 6, title: 'Pomodoro Technique', description: 'Using a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks.' },
];

const challengeQuestion = {
  question: "What is the capital of Australia?",
  options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
  correctAnswer: "Canberra"
};

const achievements = [
  { id: 1, title: 'React Basics', type: 'Course', date: 'Oct 25, 2024' },
  { id: 2, title: 'Python Intermediate', type: 'Course', date: 'Nov 10, 2024' },
  { id: 3, title: 'Math Fundamentals', type: 'Certification', date: 'Dec 1, 2024' },
  { id: 4, title: 'Historical Facts', type: 'Quiz Master', date: 'Dec 5, 2024' },
];

const pollQuestion = {
  question: "How do you prefer to learn?",
  options: ["Video Courses", "Reading Articles", "Interactive Quizzes", "Hands-on Projects"],
};

const RegisteredHomeExtras = () => {
  const [quote, setQuote] = useState({});
  const [inView, setInView] = useState({});
  const sectionRefs = useRef([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [pollSelected, setPollSelected] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Set a random quote on mount
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Observer to handle scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInView(prev => ({ ...prev, [entry.target.id]: true }));
          } else {
            // Re-hide the element when it's out of view, so the animation can play again on scroll
            setInView(prev => ({ ...prev, [entry.target.id]: false }));
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3, // Trigger when 50% of the section is visible
      }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const handleAnswerClick = (answer) => {
    if (!showResult) {
      setSelectedAnswer(answer);
      setShowResult(true);
    }
  };

  const handlePollClick = (option) => {
    if (!pollSelected) {
      setPollSelected(option);
      // Simulate sending data to a backend or state for results
      console.log(`User voted for: ${option}`);
    }
  };

  return (
    <>
      <div className="home-extras-container">
        {/* Recommended Lessons Section */}
        <section id="recommended-lessons" ref={el => sectionRefs.current[0] = el} className={`section section-animation horizontal-scroll-section fade-in-slide-up ${inView['recommended-lessons'] ? 'in-view' : ''}`}>
          <div className="content-wrapper">
            <div className="section-header">
              <GraduationCap size={40} color="#5e72e4" />
              <h2 className="section-title">Recommended Lessons & Quizzes</h2>
            </div>
          </div>
          <div className="card-grid">
            {recommendedLessons.map((item, index) => (
              <div key={item.id} className={`lesson-card`} style={{ transitionDelay: `${inView['recommended-lessons'] ? index * 0.15 : 0}s` }}>
                <div className="card-content">
                  <span className="card-type">{item.type}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${item.progress}%` }}></div>
                  </div>
                  <span className="progress-text">{item.progress}% Complete</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Viewed Section */}
        <section id="recently-viewed" ref={el => sectionRefs.current[1] = el} className={`section section-animation horizontal-scroll-section slide-in-right ${inView['recently-viewed'] ? 'in-view' : ''}`}>
          <div className="content-wrapper">
            <div className="section-header">
              <History size={40} color="#e67e22" />
              <h2 className="section-title">Recently Viewed</h2>
            </div>
          </div>
          <div className="card-grid">
            {recentlyViewed.map((item, index) => (
              <div key={item.id} className={`lesson-card`} style={{ transitionDelay: `${inView['recently-viewed'] ? index * 0.15 : 0}s` }}>
                <div className="card-content">
                  <span className="card-type">{item.type}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${item.progress}%` }}></div>
                  </div>
                  <span className="progress-text">{item.progress}% Complete</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Your Learning Statistics Section */}
        <section id="learning-statistics" ref={el => sectionRefs.current[2] = el} className={`section section-animation scale-in ${inView['learning-statistics'] ? 'in-view' : ''}`}>
          <div className="content-wrapper">
            <div className="section-header">
              <BarChart2 size={40} color="#3498db" />
              <h2 className="section-title">Your Learning Statistics</h2>
            </div>
            <div className="stats-grid">
              <div className="stats-card-item fade-in-slide-up" style={{ transitionDelay: `${inView['learning-statistics'] ? 0.2 : 0}s` }}>
                <Clock size={40} className="stats-icon hours" />
                <span className="stat-number">{learningStats.hoursSpent}</span>
                <span className="stat-label">Hours Spent</span>
              </div>
              <div className="stats-card-item fade-in-slide-up" style={{ transitionDelay: `${inView['learning-statistics'] ? 0.4 : 0}s` }}>
                <CheckCircle size={40} className="stats-icon lessons" />
                <span className="stat-number">{learningStats.lessonsCompleted}</span>
                <span className="stat-label">Lessons Completed</span>
              </div>
              <div className="stats-card-item fade-in-slide-up" style={{ transitionDelay: `${inView['learning-statistics'] ? 0.6 : 0}s` }}>
                <Award size={40} className="stats-icon quizzes" />
                <span className="stat-number">{learningStats.quizzesPassed}</span>
                <span className="stat-label">Quizzes Passed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Challenge Question Section */}
        {/* <section id="challenge-question" ref={el => sectionRefs.current[3] = el} className={`section section-animation slide-in-left ${inView['challenge-question'] ? 'in-view' : ''}`}>
          <div className="content-wrapper">
            <div className="section-header">
              <Lightbulb size={40} color="#ffbe0b" />
              <h2 className="section-title">Daily Challenge</h2>
            </div>
            <div className="challenge-card">
              <p className="challenge-question">{challengeQuestion.question}</p>
              <div className="challenge-options">
                {challengeQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    className={`challenge-option-btn ${showResult ? (option === challengeQuestion.correctAnswer ? 'correct' : (selectedAnswer === option ? 'incorrect' : '')) : ''}`}
                    disabled={showResult}
                  >
                    {option}
                    {showResult && (
                      <span className="icon">
                        {option === challengeQuestion.correctAnswer ? <Check size={20} /> : <X size={20} />}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {showResult && (
                <div className="challenge-result">
                  {selectedAnswer === challengeQuestion.correctAnswer ? (
                    <span>✅ Correct!</span>
                  ) : (
                    <span>❌ Incorrect. The correct answer is **{challengeQuestion.correctAnswer}**.</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section> */}

        {/* Featured Course Section */}
        {/* <section id="featured-course" ref={el => sectionRefs.current[4] = el} className={`section section-animation scale-in ${inView['featured-course'] ? 'in-view' : ''}`}>
          <div className="content-wrapper">
            <div className="section-header">
              <Star size={40} color="#fff" style={{ fill: '#ffbe0b', stroke: '#ffbe0b' }} />
              <h2 className="section-title">Featured Course</h2>
            </div>
            <div className="featured-course-card">
              <h3 className="featured-course-title">{featuredCourse.title}</h3>
              <p className="featured-course-desc">{featuredCourse.description}</p>
              <button className="featured-course-btn">Enroll Now</button>
            </div>
          </div>
        </section> */}

        {/* Learning Techniques Section */}
        <section id="learning-techniques" ref={el => sectionRefs.current[5] = el} className={`section section-animation horizontal-scroll-section fade-in-slide-up ${inView['learning-techniques'] ? 'in-view' : ''}`}>
          <div className="content-wrapper">
            <div className="section-header">
              <BookText size={40} color="#45b8ac" />
              <h2 className="section-title">Effective Learning Techniques</h2>
            </div>
          </div>
          <div className="card-grid">
            {learningTechniques.map((technique, index) => (
              <div key={technique.id} className={`technique-card`} style={{ transitionDelay: `${inView['learning-techniques'] ? index * 0.15 : 0}s` }}>
                <h3 className="technique-title">{technique.title}</h3>
                <p className="technique-description">{technique.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Your Progress & Achievements Section */}
        {/* <section id="achievements" ref={el => sectionRefs.current[6] = el} className={`section section-animation horizontal-scroll-section fade-in-slide-up ${inView['achievements'] ? 'in-view' : ''}`}>
          <div className="content-wrapper">
            <div className="section-header">
              <Trophy size={40} color="#f9a623" />
              <h2 className="section-title">Your Progress & Achievements</h2>
            </div>
          </div>
          <div className="card-grid">
            {achievements.map((achievement, index) => (
              <div key={achievement.id} className={`achievement-card`} style={{ transitionDelay: `${inView['achievements'] ? index * 0.15 : 0}s` }}>
                <div className="achievement-icon">
                  <Medal size={30} color="#fff" strokeWidth={2.5} />
                </div>
                <h4>{achievement.title}</h4>
                <p>{achievement.type}</p>
                <p className="mt-2 text-sm text-gray-500">Completed: {achievement.date}</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* Quick Poll Section */}
        {/* <section id="quick-poll" ref={el => sectionRefs.current[7] = el} className={`section section-animation slide-in-left ${inView['quick-poll'] ? 'in-view' : ''}`}>
          <div className="content-wrapper">
            <div className="section-header">
              <BarChart2 size={40} color="#45b8ac" />
              <h2 className="section-title">Quick Poll</h2>
            </div>
            <div className="poll-card">
              <p className="poll-question">{pollQuestion.question}</p>
              <div className="poll-options">
                {pollQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handlePollClick(option)}
                    className={`poll-option-btn ${pollSelected === option ? 'selected' : ''}`}
                    disabled={!!pollSelected}
                  >
                    <CircleDot size={20} className="icon" />
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* Quote of the Day Section */}
        <section id="quote-of-day" ref={el => sectionRefs.current[8] = el} className={`section section-animation scale-in ${inView['quote-of-day'] ? 'in-view' : ''}`}>
          <div className="content-wrapper">
            <div className="section-header">
              <Sparkles size={40} color="#2c3e50" />
              <h2 className="section-title">Motivational Quote</h2>
            </div>
            <div className="quote-container">
              <p className="quote-text">{quote.text}</p>
              <span className="quote-author">– {quote.author}</span>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="cta" ref={el => sectionRefs.current[9] = el} className={`section section-animation fade-in-slide-up ${inView['cta'] ? 'in-view' : ''}`}>
          <div className="content-wrapper">
            <div className="cta-card">
              <div className="section-header cta-title">
                <Rocket size={40} color="#fff" />
                <h3 className="cta-title">Ready to Start Learning?</h3>
              </div>
              <p className="cta-text">Join thousands of students and unlock your full potential.</p>
              <button className="cta-btn" onClick={()=>navigate('explain')}>Get Started</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RegisteredHomeExtras;
