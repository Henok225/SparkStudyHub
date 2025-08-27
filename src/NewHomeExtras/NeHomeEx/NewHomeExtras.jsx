import React, { useEffect, useRef } from 'react';

// NOTE: In a real project, this CSS should be moved to a separate file
// (e.g., 'SparkStudy.css') and imported.
const SparkStudyCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

  /* Base Styles */
  .spark-study-homepage {
    font-family: 'Inter', sans-serif;
    color: #333;
    background-color: #f7f9fc;
    overflow-x: hidden;
  }

  /* Shared Section Styles */
  .section {
    padding: 6rem 2rem;
    text-align: center;
    transition: opacity 1s ease, transform 1s ease;
  }

  .section h1, .section h2 {
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1a237e;
    transition: opacity 1s ease, transform 1s ease;
  }
  .section h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
  .section h2 { font-size: clamp(1.8rem, 4vw, 3rem); }

  .section p {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    max-width: 700px;
    margin: 0 auto 3rem;
    line-height: 1.6;
    transition: opacity 1s ease, transform 1s ease;
  }
  
  .section-content {
      opacity: 0;
      transform: translateY(30px);
  }

  .section-content.is-visible {
      opacity: 1;
      transform: translateY(0);
  }


  /* Why Spark Study Section */
  .why-spark-study-section {
    background-color: #f7f9fc;
  }

  .cards-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .card {
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 2.5rem 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    max-width: 350px;
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* Initial state for scroll-reveal animation */
    opacity: 0;
    transform: translateY(50px) rotate(-10deg) scale(0.8);
    transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .card.is-visible {
    opacity: 1;
    transform: translateY(0) rotate(0deg) scale(1);
  }

  .card:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }

  .card-icon {
    font-size: 3rem;
    color: #4CAF50;
    margin-bottom: 1rem;
    background-color: #e8f5e9;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 0 4px #c8e6c9;
  }

  .card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1a237e;
  }

  .card-description {
    font-size: 1rem;
    line-height: 1.5;
    color: #555;
    text-align: center;
  }
  
  /* How It Works Section */
  .how-it-works-section {
      background-color: #ecf0f1;
  }

  .step-list {
      display: grid;
      gap: 2rem;
      max-width: 900px;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .step {
    background-color: #fff;
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.4s ease-in-out;
    opacity: 0;
    transform: translateX(-50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
  }
  
  .step:hover {
    transform: translateY(-5px) scale(1.02);
  }
  
  .step.is-visible {
    opacity: 1;
    transform: translateX(0);
  }

  .step-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    background-color: #1a237e;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    box-shadow: 0 4px 10px rgba(26, 35, 126, 0.2);
  }

  .step h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #1a237e;
  }

  /* Testimonial Section */
  .testimonial-section {
    background-color: #e0f2f1;
  }

  .testimonial-card {
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 2rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    text-align: left;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    max-width: 450px;
    flex: 1 1 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    /* Initial state for scroll-reveal */
    opacity: 0;
    transform: translateX(50px) rotate(10deg);
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
  }

  .testimonial-card.is-visible {
      opacity: 1;
      transform: translateX(0) rotate(0deg);
  }

  .testimonial-card:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
  
  .testimonial-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 3px solid #4CAF50;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .testimonial-card blockquote {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #444;
    margin: 0 0 1rem;
  }
  
  .testimonial-card cite {
    display: block;
    font-style: normal;
    font-weight: 600;
    color: #1a237e;
  }
  
  /* Call to Action Section */
  .cta-section {
    background: linear-gradient(135deg, #1a237e, #4CAF50);
    color: #fff;
  }
  
  .cta-section h2, .cta-section p {
    color: #fff;
  }

  .cta-button {
    background-color: #fff;
    color: #1a237e;
    padding: 1rem 2.5rem;
    border-radius: 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: inline-block;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border: none;
    cursor: pointer;
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  
  .cta-button.is-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
  }
  
  .cta-button:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
  
  
  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .section {
      padding: 4rem 1rem;
    }
    
    .cards-container {
      gap: 1.5rem;
    }
    
    
  }
`;

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

  return (
    <div className="spark-study-homepage">
      <style>{SparkStudyCSS}</style>

      {/* Why Spark Study Section */}
      <section className="section why-spark-study-section">
        <h1 className="scroll-reveal" ref={(el) => (revealRefs.current.push(el))}>Why Spark Study?</h1>
        <p className="scroll-reveal" ref={(el) => (revealRefs.current.push(el))}>
          Learn with structured explanations, quizzes, and lessons designed to make studying easier and more effective.
        </p>
        <div className="cards-container">
          {whySparkStudyData.map((card, index) => (
            <div
              key={index}
              className="card scroll-reveal"
              ref={(el) => (revealRefs.current.push(el))}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p className="card-description">{card.description}</p>
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
                  </div>
              ))}
          </div>
      </section>

      {/* Testimonial Section */}
      <section className="section testimonial-section">
        <h2 className="scroll-reveal" ref={(el) => (revealRefs.current.push(el))}>What Our Students Say</h2>
        <div className="cards-container">
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
          href="#" 
          className="cta-button scroll-reveal" 
          ref={(el) => (revealRefs.current.push(el))}
          style={{ transitionDelay: '0.2s' }}
        >
          Start Learning Today
        </a>
      </section>

     
    </div>
  );
};

export default NewHomeExtras;
