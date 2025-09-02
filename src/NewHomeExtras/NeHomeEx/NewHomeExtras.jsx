import React, { useContext, useEffect, useRef } from 'react';
import './NewHomeExtras.css'; 
import { StoreContext } from '../../Context/StoreContext';
import { ArrowRight, Target } from 'lucide-react';
import { assets } from '../../assets/assets';
import {useNavigate} from 'react-router-dom'


// Data for sections
const whySparkStudyData = [
  { icon: '🧠', title: 'Interactive Quizzes', description: 'Test your knowledge with fun, engaging quizzes at the end of each lesson.' },
  { icon: '📝', title: 'Curriculum Aligned', description: 'Our content is perfectly aligned with the national curriculum for a focused learning journey.' },
  { icon: '📈', title: 'Track Your Progress', description: 'Monitor your growth and see your skills improve with detailed progress reports.' },
  { icon: '📚', title: 'Easy to Use', description: 'Intuitive design and simple navigation make learning a seamless and enjoyable experience.' },
];

const howItWorksData = [
    { step: '1', title: 'Create Your Account', description: 'Sign up for free in just a few clicks to unlock all the lessons and quizzes.' },
    { step: '2', title: 'Choose Your Subject', description: 'Browse our comprehensive library of subjects and find the topic you need to master.' },
    { step: '3', title: 'Start Learning', description: 'Dive into our engaging lessons and quizzes to build your knowledge and confidence.' },
];

const testimonialsData = [
  { text: "Spark Study has completely changed how I learn. The lessons are so clear, and the quizzes really help me remember everything.", author: "Lina M.", image: "https://placehold.co/100x100/9b59b6/ffffff?text=LM" },
  { text: "I struggled with my math classes, but after using this platform, my grades have gone up! It's an amazing tool for students.", author: "Tewodros A.", image: "https://placehold.co/100x100/3498db/ffffff?text=TA" },
  { text: "The curriculum-based approach saved me so much time. I know I'm studying the right things for my exams.", author: "Selamawit B.", image: "https://placehold.co/100x100/1abc9c/ffffff?text=SB" },
];

const NewHomeExtras = () => {
  const revealRefs = useRef([]);
  const {setShowLogin} = useContext(StoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      console.log('IntersectionObserver not supported. Animations will not play.');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add the 'is-visible' class when the element is intersecting the viewport
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve the element after it has become visible to prevent re-triggering
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // use the viewport
        rootMargin: '0px',
        threshold: 0.2, // trigger when 20% of the element is visible
      }
    );

    // Observe all elements in the ref array
    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleHwLink = (index)=>{
     switch (index) {
      case 0:
        setShowLogin(true)
        break;
      case 1:
        navigate('/explain')
        break;
      default:navigate('/explain')
        break;
     }
  }

  return (
    <div className="spark-study-homepage">
     
      {/* Why Spark Study Section */}
      <section className="section why-spark-study-section">
        <h1 className="scroll-reveal" ref={(el) => (revealRefs.current.push(el))}>Why Spark Study?</h1>
        <p className="scroll-reveal" ref={(el) => (revealRefs.current.push(el))}>
          Learn with structured explanations, quizzes, and lessons designed to make studying easier and more effective.
        </p>
        <div className="wy-cards-container">
          {whySparkStudyData.map((card, index) => (
            <div
              key={index}
              className="wy-card scroll-reveal"
              ref={(el) => (revealRefs.current.push(el))}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="wy-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p className="wy-card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-it-works-section">
          <h2 className="scroll-reveal" ref={(el) => (revealRefs.current.push(el))}>How It Works</h2>
          <div className="step-list">
              {howItWorksData.map((step, index) => (
                  <div 
                      key={index} 
                      className="step scroll-reveal"
                      ref={(el) => (revealRefs.current.push(el))}
                      style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                      <div className="step-number">{step.step}</div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      
                      <p 
                      onClick={()=>handleHwLink(index)}
                      style={{cursor:'pointer',display:'flex',alignItems: 'center',color:'var(--button-bgh)',gap:'5px'}}> <span>Learn more</span> <ArrowRight size={18}/></p>
                  </div>
              ))}
          </div>
      </section>
      

      {/* Testimonial Section */}
      <section className="section testimonial-section">
        <h2 className="scroll-reveal" ref={(el) => (revealRefs.current.push(el))}>What Our Students Say</h2>
        <div className="wy-cards-container">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card scroll-reveal"
              ref={(el) => (revealRefs.current.push(el))}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <img src={testimonial.image} alt={testimonial.author} className="testimonial-image" />
              <blockquote>"{testimonial.text}"</blockquote>
              <cite>- {testimonial.author}</cite>
            </div>
          ))}
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section className="section">
      <span>
              <Target size={70}/>
            </span>
          <h2 className="scroll-reveal" ref={(el) => (revealRefs.current.push(el))}>Our Mission</h2>
          <p className="scroll-reveal" ref={(el) => (revealRefs.current.push(el))}>
             
              Our mission is to empower every student with the tools they need to succeed in their education. We believe
              that learning should be accessible, effective, and tailored to the unique needs of Ethiopian students.
          </p>
      </section>

      {/* Call to Action Section */}
      <section className="section cta-section">
        <h2 className="scroll-reveal" ref={(el) => (revealRefs.current.push(el))}>Ready to Spark Your Learning?</h2>
        <a 
          className="cta-button scroll-reveal" 
          ref={(el) => (revealRefs.current.push(el))}
          style={{ transitionDelay: '0.2s' }}
          onClick={()=>setShowLogin(true)}
        >
          Start Learning Today
        </a>
      </section>

     
    </div>
  );
};

export default NewHomeExtras;
