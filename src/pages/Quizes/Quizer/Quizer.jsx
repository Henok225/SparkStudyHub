import React, { useContext, useEffect, useState } from 'react'
import './Quizer.css'
import Timer from '../../../Components/timer/Timer';
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../../Context/StoreContext';
import SmallLoader from '../../../Components/SmallLoaderSpin/SmallLoader';
import axios from 'axios';
import QuizResult from './quizResult/QuizResult';
import { motion, AnimatePresence } from "framer-motion";


const Quizer = () => {

  const navigate = useNavigate();
  const {subject,id} = useParams();

  

  const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0);
  const [userAnswer,setUserAnswer] = useState(null);
  const [answer,setAnswer] = useState(null);
  const [answerlist,setAnswerList] = useState([])
  const [readyToStart,setReadyTostart] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [content,setContent] = useState({})
  const [title,setTitle] = useState("")
  const {url,token} = useContext(StoreContext)
  const [contentLoaded,setContentLoaded] = useState({loading:true,message:"Couldn't load questions!"})
  const [refetch,setRefetch] = useState(true)
  const [quizFinished,setQuizFinished] = useState(false)
  

  useEffect(()=>{

    const fetchQuiz = async ()=>{

      setContentLoaded({loading:true})
        try {
            const response = await axios.post(`${url}/api/quizzes/quiz?token=${token}&id=${id}`);
            setContent(response.data.content)
            setTitle(response.data.title)
         
            setContentLoaded({loading:false,success:true})
        } catch (error) {
            console.log("Error",error)
            if(error.response){
              setContentLoaded({loading:false,success:false, message:
                error.response.data.message})
            }
            else{
               setContentLoaded({loading:false,success:false, message:
              error.message})
            }
           
        }
          
    }
    fetchQuiz();
},[refetch])

const question_list = {
  id:id,
  subject:subject,
  title:title,
  content:content
  
}

  const goToNextquestion = ()=>{
    if(currentQuestionIndex < question_list.content.length-1){
      if(!quizFinished){
        alert(currentQuestionIndex+ ' ' + question_list.content.length)
        setCurrentQuestionIndex(currentQuestionIndex+1)
    
      }
      }
  }
  // const nextQuestionHandler = ()=>{

  //   if(currentQuestionIndex > question_list.content.length-1){
  //     setQuizFinished(true);
      
  //   }

  //   else{
  //      if(userAnswer === null){
  //     alert("Select your Answer")
  //   }
  //  else{
  //     // alert("Correct Answer" + userAnswer + "Vs" + answer)
      
  //     setAnswerList((prev)=>[...prev,userAnswer])
  //     setUserAnswer(null)
  //     if(!quizFinished){
  //       goToNextquestion();
  //       setAnsweredQuestions(answeredQuestions+1)
    
  //     }

  //   }
  //   }
    
  // }

  const nextQuestionHandler = ()=>{
    if(currentQuestionIndex < question_list.content.length-1){
      if(userAnswer === null){
        alert("Select your Answer")
      }
      else{
        setAnswerList((prev)=>[...prev,userAnswer])
        setAnsweredQuestions(answeredQuestions+1)
        setUserAnswer(null)

        setCurrentQuestionIndex(currentQuestionIndex+1) //go to the question

      }
    }else{
      setAnswerList((prev)=>[...prev,userAnswer])
      setAnsweredQuestions(answeredQuestions+1)
      setQuizFinished(true);
      resetTimer()
      
    }
  }

  
  // const quizTimer = ()=>{
    

  
  //     const ticking = setInterval(()=>{
  //       if(sec<60){
  //         sec++;
  //       }
  //       else{
  //          sec = 0;
  //          min++;
  //          if(sec<!60){
  //           hr++;
  //          }
  //       }
  //     },1000)
   

 
  // }
  // quizTimer();
  // console.log(quizTimer())
  // const userAnswerHandler = (answer)=>{

  // }

  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  // Function to start the timer
  const startTimer = () => {
    setIsRunning(true);
  };

  // Function to stop the timer
  const stopTimer = () => {
    setIsRunning(false);
  };

  // Function to reset the timer
  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  // useEffect to handle the timer logic
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format the time to display as MM:SS
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const QuizBox = ()=>{

    return(
      <div className="quiz-box">
      <div className="quizmode-nav">
        <div className="quiz-timer-box">
          <p>Timer</p>
          <div className="timer">
             
            <h1>{formatTime(time)}</h1>
      {/* <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button> */}
          </div>
        </div>
        <div className="questions-tracker">
          <p>Answered questions</p>
          <p><span className="answered-questions">{answeredQuestions}</span> / <span className="total-questions">{question_list.content.length}</span></p>
        </div>
      </div>
      {
        readyToStart ? <>
         <div className="questions-box">
        
        
        <div className="question" ><p>{currentQuestionIndex+1}. {question_list.content[currentQuestionIndex].question} </p></div>
        <div  className="choices">{
          question_list.content[currentQuestionIndex].choice.map((cho,index)=>{
            return (
              
              <p className={userAnswer === cho[0]? "active":""} key={index} onClick={()=>{setUserAnswer(cho[0]);setAnswer(question_list.content[currentQuestionIndex].answer)}}>{cho[0]}) {cho[1]}</p>
              
            )
          })
          }</div>
        <div className="quiz-controllers">
          <button>Hint</button>
          <button onClick={nextQuestionHandler}>Next</button>
        </div>
      </div>
        </>
        : <>
        <div className="request-to-start-quiz">
        <motion.div
  className="request-to-start-quiz"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
          <p>Start When You're Ready</p>
          <button onClick={()=>{setReadyTostart(true); startTimer();}} >Start Quiz</button>
          </motion.div>
        </div>
        </>
      }
     
      </div>
    ) 
  }

  // Reseting quiz function
  const resetQuiz = ()=>{
    setCurrentQuestionIndex(0);
    setAnswerList([])
    setAnsweredQuestions(0)
    setUserAnswer(null)

  }
  // Restarting quiz
  const restartQuiz = ()=>{
    resetQuiz();
    setQuizFinished(false);
    setReadyTostart(false);
  }

  const QuizSummary = ()=>{

    useEffect(()=>{
        const saveQuizResult = ()=>{
          
        }
    },[])

    return (
      <>
      {
        contentLoaded.success ? <QuizResult quiz={question_list.content} result={answerlist} />
        :""
   
      }
     <br /> <div className="summary-btns" style={{
      display:'flex',
      justifyContent:'center',
      gap:'20px'
      
    }}>
        <button onClick={resetQuiz} style={{borderRadius:'5px',fontSize:'16px',cursor:'pointer', minWidth:'120px',padding:'10px',border:'none', margin:'20px', backgroundColor:'var(--button-color)',color:'white'}}>Restart</button> 
        <button  style={{borderRadius:'5px',fontSize:'16px',cursor:'pointer',padding:'10px', minWidth:'120px', border:'none', margin:'20px', backgroundColor:'var(--button-color)',color:'white' }}>Save Result</button>
      </div>
      
      </>
    )
  }

  
  const OnQuizFinish = ()=>{
   const [hidePopup,setHidePopup] = useState()
 
    const styles = {
      container:{
      width:'max(25vw,250px)',
      boxShadow:'0 10px 5px lightblue',
      borderRadius:'10px',
      padding:'20px',
       margin:'auto',
       marginTop:'50px',
       color:'var(--button-color)',
       textAlign:'center',
       animation:'scalingAnima 0.5s',
       marginBottom:'50px',
       transition:'all 1s ease-in-out',
    },
    header:{
      fontSize:'30px',
      fontWeight:'600'
    },
    btnContainer:{
      display:'flex',
      justifyContent:'center',
      gap:'20px'
    },
    btns:{
      padding:'10px',
      cursor:'pointer',
      fontSize:'14px',
      fontWeight:'600',
      backgroundColor:'var(--button-color)',
      color:'white',
      border:'none',
      borderRadius:'5px'
    }
  }
  
    return(
      <>
     {
      !hidePopup ? <div style={styles.container} className="quize-finish-popup">
      <p style={styles.header}>Congrats! you've finished the quiz 👏</p>
      <div className="btns" style={styles.btnContainer}>
        <button onClick={()=>setHidePopup(true)} style={styles.btns}>Summary</button>
        <button onClick={ restartQuiz} style={styles.btns}>Restart</button>
      </div>
    </div>
      :<QuizSummary/>

     }
      

      </>
    )
  }

  return (
    <div className='quizer-container'>

      <h1 className='header-title'>Quiz mode</h1>
    <p><span onClick={()=>navigate("/quizzes")}>Quizzes</span> / <span onClick={()=>navigate(`/quizzes?filter=subject=${question_list.subject}`)}>{subject}</span> / <span>{question_list.title}</span></p>
      
      {
      !contentLoaded.loading ?

      <>
      {
       contentLoaded.success ?<>{!quizFinished?<QuizBox/>:<OnQuizFinish/>}</> 
       :<p style={{color:'red'}}><br />{contentLoaded.message} <br /><br /><button onClick={()=>setRefetch(!refetch)} style={{border:'none', fontSize:16+'px', padding:5+'px', borderRadius:10+'px',cursor:'pointer'}}>Retry</button></p>
        
      }
      </> 
      
       :<><br /><p>Loading quiz...</p><SmallLoader/></>

      
      }
      
     
    </div>
  )
}

export default Quizer
