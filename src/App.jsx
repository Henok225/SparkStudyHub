import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import TopicExplanation from './pages/TopicExplanation/TopicExplanation'
import ExplanationShower from './pages/TopicExplanation/ExplanationShower/ExplanationShower'
import Quizes from './pages/Quizes/Quizes-List/Quizes'
import Quizer from './pages/Quizes/Quizer/Quizer'
import LoginPopUp from './Components/LoginPopUp/LoginPopUp'
import { useContext, useEffect, useState } from 'react'
import VerifyEmail from './pages/emailVerify/VerifyEmail'
import Loader from './Components/loaderSpin/Loader'
import { StoreContext } from './Context/StoreContext'
import About from './Components/AboutUs/About'
import UserProfile from './pages/UserProfile/UserProfile'
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

function App() {
  
  const {showLogin,showPopup,userData, url, token} = useContext(StoreContext)
  // const UserName = userData?userData.name:"there"

  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);


  
    return null;
  }

  // hook to track learning time
  useLearningTimer();
  const {setTimeOn, timer, timeOn} = useLearningTimer()




  return (
    <>
     <ScrollToTop />
     {showLogin?<LoginPopUp/>:<></>}
     {showPopup.show && showPopup.response?<PopUp response={showPopup.response} title={showPopup.title} />:<></>}

      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/explain' element={<TopicExplanation/>} />
        <Route path='/explain/:subject/:id' element={<ExplanationShower/>} />
        <Route path='/quizzes' element={<Quizes/>} />
        <Route path='/quizzes/:subject/:id' element={<Quizer/>} />
        <Route path='/user/verifyemail/:token' element={<VerifyEmail/>} />
        <Route path='/profile' element={<NewProfile/>} />
        <Route path='/feedback' element={<FeedBack/>} />
        <Route path='/ethiopian-curriculum' element={<EthioCurHome/>} />
        <Route path='/ethiopian-curriculum/grade/:gradeId' element={<GradeSection/>} />
        <Route path='/ethiopian-curriculum/grade/:gradeId/lessons' element={<EthCurExplanationList />} />
         <Route path='/ethiopian-curriculum/grade/:gradeId/quizzes' element={<EthCurQuizzes/>} />
        <Route path='/terms-and-privacy-policy' element={<TermsAndPrivacy />} />
        {/* <Route path='/plans' element={<Plans/>} /> */}
        <Route path="*" element={<NotFoundPage userId={userData?.userId} />} />
       
      </Routes>

      <Footer/>
       <Loader/>
       
    </>
  )
}

export default App
