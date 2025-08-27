import React from 'react'
import './SavedQuizzes.css'
import { assets } from '../../../../assets/assets'
import {useNavigate} from 'react-router-dom'

const SavedQuizzes = () => {

  const navigate = useNavigate()

  const SavedQuizzesList = [
    {
      title:"title1",
      image:"image1",
      description:"detail",
      date:"2/6/2025",
      url:"/quizzes/sub1/id1"
    },
    {
      title:"title2",
      image:"image2",
      description:"detail",
      date:"4/6/2025",
      url:"/quizzes/id2"
    }
  ]

    return (
        <div className="saved-quizzes">
            <h1>Saved Quizzes</h1>
            <p>Here you can view your saved quizzes.</p>
            <div className="quizzes-list">
              {
                SavedQuizzesList.map((item,index)=>{
                  return(
                    <div onClick={()=>navigate(item.url)} className="quiz-item">
                  <div className="image">
                    <img src={item.image} alt="quiz thumbnail" />
                  </div>
                  <div className="quiz-details">
                    <h2 className='title'>{item.title}</h2>
                    <p className='description'> {item.description} </p>
                    <p className='date'> {item.date} </p>
                </div>
            </div>
                  )
                })
              }
                <div className="quiz-item">
                  <div className="image">
                    <img src={assets.thumbnail1_icon} alt="quiz thumbnail" />
                  </div>
                  <div className="quiz-details">
                    <h2 className='title'>Quiz Title</h2>
                    <p className='description'>Quiz Description</p>
                    <p className='date'>Quiz Date</p>
                </div>
            </div>
            <div className="quiz-item">
                  <div className="image">
                    <img src={assets.thumbnail1_icon} alt="quiz thumbnail" />
                  </div>
                  <div className="quiz-details">
                    <h2 className='title'>Quiz Title</h2>
                    <p className='description'>Quiz Description</p>
                    <p className='date'>Quiz Date</p>
                </div>
                </div>
            <div className="quiz-item">
                  <div className="image">
                    <img src={assets.thumbnail1_icon} alt="quiz thumbnail" />
                  </div>
                  <div className="quiz-details">
                    <h2 className='title'>Quiz Title</h2>
                    <p className='description'>Quiz Description</p>
                    <p className='date'>Quiz Date</p>

            </div>
        </div>
        </div>
        </div>
    )
}

export default SavedQuizzes
