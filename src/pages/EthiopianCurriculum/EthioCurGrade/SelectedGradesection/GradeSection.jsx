import { Book, ClipboardCheck, Video, Rocket, Menu, BackpackIcon, LucideStepBack, LogOut } from 'lucide-react'; // Using lucide-react for icons
import './GradeSection.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../../../Context/StoreContext';
import Tooltip from '../../../../Components/Utilities/Tooltip';

// This is the main component for the curriculum section.
// It displays four interactive cards for different learning activities.
// const GradeSection = ({
//     explanationsLink,
//     quizzesLink,
//     videosLink,
//     examsLink
// }) => {
//   // Define the data for the four cards.
//   const cards = [
//     {
//       title: "Explanations",
//       description: "Dive into comprehensive lessons and summaries for every subject.",
//       icon: <Book size={48} />, // Book icon for explanations
//       color: "bg-indigo-50",
//       textColor: "text-indigo-600",
//       link:explanationsLink
//     },
//     {
//       title: "Quizzes",
//       description: "Test your knowledge with interactive quizzes and practice questions.",
//       icon: <ClipboardCheck size={48} />, // Clipboard icon for quizzes
//       color: "bg-green-50",
//       textColor: "text-green-600",
//       link:quizzesLink
//     },
//     {
//       title: "Videos",
//       description: "Watch engaging video tutorials to grasp complex concepts easily.",
//       icon: <Video size={48} />, // Video icon for video content
//       color: "bg-red-50",
//       textColor: "text-red-600",
//       link:videosLink
//     },
//     {
//       title: "Prepare for Exam",
//       description: "Access mock exams and past papers to get ready for your tests.",
//       icon: <Rocket size={48} />, // Rocket icon for exam preparation
//       color: "bg-yellow-50",
//       textColor: "text-yellow-600",
//       link:examsLink
//     },
//   ];

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6 font-sans">
//       <div className="w-full max-w-6xl text-center">
//         {/* Main heading for the section */}
//         <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
//           Explore Your Curriculum
//         </h1>
//         {/* Subheading to give context */}
//         <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
//           Choose a learning path to begin your journey through the Ethiopian curriculum.
//         </p>

//         {/* Responsive grid for the cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {cards.map((card, index) => (
//             <div
//               key={index}
//               className={`flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer ${card.color}`}
//             >
//               {/* Icon container */}
//               <div className={`p-4 rounded-full flex items-center justify-center mb-4 text-3xl ${card.textColor}`}>
//                 {card.icon}
//               </div>

//               {/* Card title */}
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                 {card.title}
//               </h2>

//               {/* Card description */}
//               <p className="text-sm text-gray-600">
//                 {card.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };



// This is the main component for the curriculum section.
// It displays four interactive cards for different learning activities.
const GradeSection = ({
  explanationsLink,
  quizzesLink,
  videosLink,
  examsLink
}) => {
  // Define the data for the four cards.
  const {gradeId} = useParams()
  const cards = [
    {
      title: "Explanations",
      description: "Dive into comprehensive lessons and summaries for every subject.",
      icon: <Book size={48} />, // Book icon for explanations
      colorClass: "card-indigo",
      iconColorClass: "icon-indigo",
      link:`ethiopian-curriculum/grade/${gradeId}/explain?grade=${gradeId}`
    },
    {
      title: "Quizzes",
      description: "Test your knowledge with interactive quizzes and practice questions.",
      icon: <ClipboardCheck size={48} />, // Clipboard icon for quizzes
      colorClass: "card-green",
      iconColorClass: "icon-green",
      link:`ethiopian-curriculum/grade/${gradeId}/quiz?grade=${gradeId}`
    },
    {
      title: "Videos",
      description: "Watch engaging video tutorials to grasp complex concepts easily.",
      icon: <Video size={48} />, // Video icon for video content
      colorClass: "card-red",
      iconColorClass: "icon-red",
      link:`ethiopian-curriculum/grade/${gradeId}/video?grade=${gradeId}`
    },
    {
      title: "Prepare for Exam",
      description: "Access mock exams and past papers to get ready for your tests.",
      icon: <Rocket size={48} />, // Rocket icon for exam preparation
      colorClass: "card-yellow",
      iconColorClass: "icon-yellow",
      link:`ethiopian-curriculum/grade/${gradeId}/exam?grade=${gradeId}`
    },
  ];

  const navigate = useNavigate()
  
  const {token} = useContext(StoreContext)

  return (
    <>
      {/* Styles for the component */}
     
      <div className="app-container">
        {/* Top navigation/header section */}
        {/* <header className="header"> */}
         <br /> <div className="header-content">
            {/* Menu icon button */}
            <Tooltip content={`Exit grade ${gradeId}`}>
              <button className="menu-button">
              <LogOut style={{transform:'rotate(180deg)'}} onClick={()=>history.back()} size={24} />
            </button>
            </Tooltip>
            
            
          </div>
        {/* </header> */}

        {/* Main content container */}
        <main className="main-content">
          <div className="content-wrapper">
            {/* Main heading for the section */}
            <h1 className="main-heading">
              Empowering Students to Succeed
            </h1>
            {/* Subheading to give context */}
            <p className="sub-heading">
              At Spark Study, we believe that every student deserves access to high-quality educational resources. Our mission is to make learning engaging, accessible, and effective.
            </p>

            <h3 className='grade-title'>Contents for Grade {gradeId} </h3>

            {/* Responsive grid for the cards */}
            <div className="cards-grid">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`card ${card.colorClass}`}
                  onClick={()=>navigate('/'+card.link)}
                >
                  {/* Icon container */}
                  <div className={`card-icon-container ${card.iconColorClass}`}>
                    {card.icon}
                  </div>

                  {/* Card title */}
                  <h2 className="card-title"> 
                    {card.title}
                  </h2>

                  {/* Card description */}
                  <p className="card-description">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
            
            {
              token ? null
              : <button className="start-button" >
              Get started for free
            </button>

            }
            

          </div>
        </main>
      </div>
    </>
  );
};



export default GradeSection;
