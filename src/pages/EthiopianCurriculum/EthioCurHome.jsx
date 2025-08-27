import React, { use, useContext } from 'react'
import Button from '../../Components/ReusableComponents/Button/Button'
import './EthioCurHome.css'
import { assets } from '../../assets/assets'
import { ethioCurContext } from './EthioCurcontext/EthioCurContext'
import { useNavigate } from 'react-router-dom'

const EthioCurHome = () => {

    const navigate = useNavigate(); // Import useNavigate from react-router-dom if needed
    // const { setSelectedGrade} = useContext(ethioCurContext)
    
    // Function to handle grade click and redirect to the respective grade page
    const handleGradeClick = (grade) => {
        // setSelectedGrade(grade); // Update the selected grade in context
        // Redirect to the respective grade page
        navigate(`/ethiopian-curriculum/grade-${grade}`);
    };


  return (
    <div className='ethio-cur-home'>
        <div className="welc">
        <img src={assets.ethiopian_curriculum_icon} alt="Ethiopian Flag" />
        <div className="welc-text">
        <h1>Welcome to <span style={{color:'blue'}}>Spark Study</span> <br /> For Ethiopian Curriculum</h1>
      <p>This section is dedicated to providing resources and information related to the Ethiopian curriculum. Here, you can find
        various materials, including textbooks, study guides, and other educational resources tailored to the Ethiopian education
        system. Whether you are a student, teacher, or parent, this section aims to support your learning journey and enhance your understanding of the Ethiopian curriculum.</p>
      <p>Explore the available resources, access study materials, and stay updated with the latest information related to the Ethiopian curriculum.
        We are committed to providing valuable content that aligns with the educational standards and requirements of Ethiopia.</p>
      

        <p>Note: This section is continuously being updated with new materials and resources, so be sure to check back regularly for the latest additions.</p>

        </div>
        </div>
        <div className="main">
            {/* ask grade (9-12)*/}
            <h2>Select Your Grade</h2>
            <div className="grades">
                <div className="grade" onClick={() => window.location.href = '/ethiopian-curriculum/grade/9'}>
                    <h3>Grade 9</h3>
                    <p>Explore resources for Grade 9 students, including textbooks, study guides, and other educational materials tailored to the Ethiopian curriculum.</p>
                </div>
                <div className="grade" onClick={() => window.location.href = '/ethiopian-curriculum/grade/10'}>
                    <h3>Grade 10</h3>
                    <p>Access a variety of resources for Grade 10 students, including textbooks, study guides, and other educational materials designed to support learning in the Ethiopian curriculum.</p>
                </div>
                <div className="grade" onClick={() => window.location.href = '/ethiopian-curriculum/grade/11'}>
                    <h3>Grade 11</h3>
                    <p>Find resources for Grade 11 students, including textbooks, study guides, and other educational materials that align with the Ethiopian curriculum.</p>
                </div>
                <div className="grade" onClick={() => window.location.href = '/ethiopian-curriculum/grade/12'}>
                    <h3>Grade 12</h3>
                    <p>Discover resources for Grade 12 students, including textbooks, study guides, and other educational materials specifically designed for the Ethiopian curriculum.</p>
                </div>

        </div>

     {/* next button  */}
        {/* <div className="next-button">
            <Button children={"Next"} onClick={() => window.location.href = '/ethiopian-curriculum/grade-9'} type="primary" />
            </div> */}
     </div>
      
    </div>
  )
}

export default EthioCurHome
