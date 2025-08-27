import React, { useEffect, useState } from 'react'
import './QuizResult.css'

const QuizResult = (props) => {

    const [quiz,setQuiz] = useState({quiz:props.quiz,result:props.result})
    const [rightAnswer,setRightAnswer] = useState(0)
    const [questionExplanation,setQuestionExplanation] = useState(false);

    useEffect(()=>{
        const resultIncremental = ()=>{
          setRightAnswer(0)
            for(let i=0;i<quiz.quiz.length;i++){
            if(quiz.quiz[i].answer === props.result[i]){
                setRightAnswer((prev)=>prev+1);
            }
        }   
        }
        resultIncremental();
        console.log(rightAnswer)
    },[])
      
  return ( 
    <div className="quiz-result-container">
        <h2 className="title">Quiz Summary</h2>
      {
        quiz.quiz.map((ques,index)=>{
          let questionIndex = index;
          return(
            <div key={index}>
                     <div className="questions-box">
        <div className="question"><p>{index+1}. {ques.question} </p></div>
        <div className="choices">{
          ques.choice.map((cho,i)=>{
            return (
              
              <p className={ ques.answer=== cho[0]? "active":""} key={i} >{cho[0]}) {cho[1]} {quiz.result[questionIndex] === cho[0] && cho[0] !== ques.answer?<span style={{color:'red', float:'right', fontSize:'20px'}}>x</span>:""}</p>

            )
          })
          }</div>
          
         <p key={index} style={{color:'blue',cursor:'pointer'}} onClick={()=>setQuestionExplanation(!questionExplanation)} className="give-explanation"> Explanation </p>
      <div style={{backgroundColor:'white',padding:'10px'}} className={"question-explanation question-explanation-show"} >
        {ques.explanation?ques.explanation:<p style={{color:'red'}}>No explanation for this question! </p>}
        <br />
      </div>
      </div>
     
            </div>
          )
        })

      }
      <div className="quiz-final-result">
        <p className="result">Your Result: <span>{rightAnswer}</span> / {quiz.quiz.length} </p>
        <p className="compliment">
          {
            rightAnswer === quiz.quiz.length ? "Excellent! You got all answers correct! 🏆" :
            rightAnswer >= quiz.quiz.length/2 ? "Good job! You passed the quiz. 🌟" :
            "Keep trying! You can improve your score."
          }
        </p>
      </div>
    </div>
  )
}

export default QuizResult
