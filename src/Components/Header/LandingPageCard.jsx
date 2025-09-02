const LandingPageCard = () => {
    return (
      <div>
        <style>{`
          .landing-pg-container {
            font-family: 'Inter', sans-serif;
            background-color: #121212;
            color: #E0E0E0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
            background-image: linear-gradient(45deg, #1f2022, #2d3444);
          }
          .landing-pg-card {
            border-radius: 2rem;
            width: 100%;
            margin:auto;
            max-width: 72rem;
            padding: 3rem 1rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            transition: transform 0.3s;
            background-color: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
            @media screen and(max-width:700px){
            .landing-pg-card{
                padding:1rem 2rem;
            }
            }
          .landing-pg-link {
            display: inline-block;
            padding: 1rem 2rem;
            font-size: 1.125rem;
            font-weight: 600;
            color: #fff;
            background-color: #0077B6;
            border-radius: 9999px;
            transition: background-color 0.3s, transform 0.3s;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          }
          .landing-pg-link:hover {
            background-color: #00509D;
          }
  
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
          
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 192, 255, 0.5); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(0, 192, 255, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 192, 255, 0); }
          }
          .animate-pulse-button { animation: pulse 2s infinite; }
  
          @media (min-width: 768px) {
            .md-flex { display: flex; align-items: center; }
            .md-space-x-12 > *:not(:last-child) { margin-right: 3rem; }
          }
        `}</style>
        <div className="landing-pg-card" onMouseOver={e => e.currentTarget.style.transform = 'scale(1.01)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
          <div className="md-flex md-space-x-12">
            <div style={{ flex: '1 1 50%', textAlign: 'left', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }} className="landing-pg-animate-fadeIn">
                <svg style={{ height: '2.5rem', width: '2.5rem', fill: 'currentColor', color: '#00C0FF' }} viewBox="0 0 24 24">
                  <path d="M13.8 2.6c-.6-.7-1.7-1-2.6-.2l-5 4.5c-.7.6-.8 1.7-.2 2.6l6.8 7.5c.6.7 1.7.8 2.6.2l5-4.5c.7-.6.8-1.7.2-2.6L13.8 2.6z" />
                </svg>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginLeft: '0.5rem', color: '#fff' }}>SparkStudy</h1>
              </div>
              <h2 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.2' }} className="landing-pg-animate-fadeIn">
                Unlock Your Potential with SparkStudy
              </h2>
              <p style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: '500' }} className="landing-pg-animate-fadeIn">
                Your Ultimate Guide to Mastering High School Subjects and Acing University Entrance Exams.
              </p>
              <p style={{ marginTop: '1.5rem', fontSize: '1rem', lineHeight: '1.5' }} className="landing-pg-animate-fadeIn">
                Get access to expertly explained topics, interactive quizzes, and solved entrance exams—all designed to help you succeed.
              </p>
              <div style={{ marginTop: '2rem' }} className="landing-pg-animate-fadeIn">
                <a className="landing-pg-link landing-pg-animate-pulse-button">
                  Start now
                </a>
              </div>
            </div>
            <div style={{ display: 'none', flex: '1 1 50%', textAlign: 'right' }} className="md-block">
              <img src="https://placehold.co/400x400/1F284B/FFFFFF?text=Learning+Made+Easy" alt="Learning illustration" style={{ width: '100%', height: 'auto', borderRadius: '0.75rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default LandingPageCard ;