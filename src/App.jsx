import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { Route, Routes, ScrollRestoration, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import TopicExplanation from './pages/TopicExplanation/TopicExplanation'
import ExplanationShower from './pages/TopicExplanation/ExplanationShower/ExplanationShower'
import Quizes from './pages/Quizes/Quizes-List/Quizes'
import Quizer from './pages/Quizes/Quizer/Quizer'
import LoginPopUp from './Components/LoginPopUp/LoginPopUp'
import { useContext, useEffect, useRef, useState } from 'react'
import VerifyEmail from './pages/emailVerify/VerifyEmail'
import Loader from './Components/loaderSpin/Loader'
import { StoreContext } from './Context/StoreContext'
import About from './Components/AboutUs/About'
import Plans from './pages/Plans/Plans'
import PopUp from './Components/PopUp/PopUp'
import FeedBack from './Components/feedback form/FeedBack'
import EthioCurHome from './pages/EthiopianCurriculum/EthioCurHome'
import GradeSection from './pages/EthiopianCurriculum/EthioCurGrade/SelectedGradesection/GradeSection'
import EthCurExplanationList from './pages/EthiopianCurriculum/EthCurContents/EthCurExplanation/EthCurExplanationList'
import TermsAndPrivacy from './Components/TermsOfUsePrivacyPolicy/TermsOfUsePrivacyPolicy'
import NewProfile from './pages/UserProfile/NewProfile/NewProfile'
import useLearningTimer from './hooks/useLearningTimer'
import NotFoundPage from './pages/utilityPages/NotFoundPage'
import EthCurQuizzes from './pages/EthiopianCurriculum/EthCurContents/EthCurQuzzes/EthCurQuizzes'
import Contact from './Components/ContactUs/Contact'
import HelpAndFaq from './pages/HelpandFAQ/HelpAndFaq'
import ForgotPassword from './AuthHandlers/Forgot password/ForgotPassword'
import ResetPassword from './AuthHandlers/ChangePassword/ChangePassword'
import AdminPage from './Admin/AdminPage'
import AdminRoute from './utills/AdminRoute'
import CurLessonsLister from './CurBasedLessonList/LessonLister/CurLessonsLister'
import CurQuizzesLister from './CurBasedLessonList/QuizLister/CurQuizzesLister'

function App() {
  
  const {showLogin,showPopup,userData, url, token} = useContext(StoreContext)
  // const UserName = userData?userData.name:"there"

  function ScrollToTop() {
    const { pathname } = useLocation();
  
    const lastPath = useRef(null);

    useEffect(() => {
      const timeout = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50); // tiny delay ensures content is mounted
      return () => clearTimeout(timeout);
    }, [pathname]);

  
    return null;
  }

  // hook to track learning time
   const {timerRef, timeOn, setTimeOn} = useLearningTimer()




  return (
    <>
    
     {showLogin?<LoginPopUp/>:<></>}
     {showPopup.show && showPopup.response?<PopUp response={showPopup.response} title={showPopup.title} />:<></>}

      <Navbar />
      
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/help' element={<HelpAndFaq/>} />
        <Route path='/feedback' element={<FeedBack/>} />
        <Route path='/terms-and-privacy-policy' element={<TermsAndPrivacy />} />
        
        <Route path='/explain' element={<TopicExplanation/>} />
        <Route path='/explain/:subject/:id' element={<ExplanationShower/>} />
        <Route path='/quizzes' element={<Quizes/>} />
        <Route path='/quizzes/:subject/:id' element={<Quizer/>} />
       
        <Route path='/user/verifyemail/:token' element={<VerifyEmail/>} />
        <Route path='/profile' element={<NewProfile/>} />
        
        <Route path='/ethiopian-curriculum' element={<EthioCurHome/>} />
        <Route path='/ethiopian-curriculum/grade/:gradeId' element={<GradeSection/>} />
        {/* <Route path='/ethiopian-curriculum/grade/:gradeId/lessons' element={<EthCurExplanationList />} /> */}
        {/* <Route path='/ethiopian-curriculum/grade/:gradeId/quizzes' element={<EthCurQuizzes/>} /> */}
        {/* <Route path='/ethiopian-curriculum/grade/:gradeId/lessons/view' element={<LessonDisplay />} /> */}
        <Route path='/ethiopian-curriculum/grade/:gradeId/lessons' element={<CurLessonsLister />} />
        <Route path='/ethiopian-curriculum/grade/:gradeId/quizzes' element={<CurQuizzesLister />} />
       
        <Route path='/auth/forgot-password' element={<ForgotPassword/>} />
        <Route path='/auth/reset-password' element={<ResetPassword/>} />
        <Route path='/auth/verify-reseting-password/:resetToken' element={<ResetPassword/>} />
        
        
        
        <Route path='/plans' element={<Plans/>} />
        <Route path="*" element={<NotFoundPage userId={userData?.userId} />} />
       
        
       <Route path='/sparkstudy/admin' element={<AdminRoute><AdminPage /></AdminRoute>} />
      </Routes>

      <Footer/>
       <Loader/>
       
    </>
  )
}

export default App
