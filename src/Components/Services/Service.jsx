import React from 'react'
import './Service.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Service = () => {
  
const navigate = useNavigate();

  return (
    <div className="service">
      <h1>What Are You Looking For?</h1>
      <div className="service-list">
      <div onClick={()=>{navigate('/explain')}}>
        <div className="image"><img src={assets.explanation_icon} alt="Topic explanation" /></div>
        <p>Explanations <span><br />Understand Complex Concepts with Ease </span></p>
        </div>
        <div onClick={()=>{navigate('/quizzes')}}>
            <div className="image"><img src={assets.quiz_icon1} alt="Quizzes icon" /></div>
            <p>Quizzes <span><br />Test Your Knowledge and Track Progress</span></p>
        </div>
        
        <div onClick={()=>{navigate('/ethiopian-curriculum')}}>
        <div className="image"><img src={assets.ethiopian_curriculum_icon} alt="Ethiopian curriculum" /></div>
        <p>Ethiopian Curriculum <span><br />Understand Complex Concepts dedicated for ethiopian Curriculum.</span></p>
        </div>

        {/* <div   onClick={()=>{navigate('/exams')}}>
        <div className="image"><img src={assets.previous_exam_icon1} alt="previous exams" /></div>
        <p>Previous Exams <span><br />Practice with real university entrance exams from previous years</span></p>
        <div className='comming-soon'>Comming soon</div>
        </div> */}
        {/* <div className='books'  onClick={()=>{navigate('/exams')}}>
        <div className="image"><img src={assets.books_icon1} alt="previous exams" /></div>
        <p>Books <span><br />Download different books</span></p>
        <div className='comming-soon'>Comming soon</div>
        </div> */}
        
      </div>
    </div>
  )
}

export default Service
