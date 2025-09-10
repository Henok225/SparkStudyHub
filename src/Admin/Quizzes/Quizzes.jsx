import React, { useContext, useEffect, useState } from 'react';
import { LayoutDashboard, LogIn, FileText, List, Plus, TrendingUp, Settings, BarChart2, PieChart, Users, Zap, X, Eye, Trash2, CheckCircle, Circle, MessageSquare } from 'lucide-react';
import './Quizzes.css'
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import ContentEditor from '../utils/Editor';
import TextMathRenderer from '../../Components/Utilities/TextMathRenderer';
import MathRenderer from '../../Components/Utilities/MathRenderer';
import TinyMCEMathRenderer from '../../Components/Utilities/TinyMceRenderer';
import ConfirmationPrompt from '../../Components/ReusableComponents/ConfirmationPrompt/ConfirmationPrompt';

const QuizzesPage = () => {
    const [newQuizTitle, setNewQuizTitle] = useState('');
    const [newQuizSubject, setNewQuizSubject] = useState('');
    const [newQuizGrade, setNewQuizGrade] = useState('');
    const [newQuizDescription, setNewQuizDescription] = useState('');
    const [newQuizCoverImage, setNewQuizCoverImage] = useState('');
    const [newQuizPlan, setNewQuizPlan] = useState('');
    const [newQuizQuestions, setNewQuizQuestions] = useState([]);
    const [quizzes, setQuizzes] = useState([])
    const {url, token, userData, setShowPopup} = useContext(StoreContext)
    const [cprompt, setCprompt] = useState({isVisible:false, message:"Submit quiz to review", onclick:false})

  
    const [currentQuestionText, setCurrentQuestionText] = useState('');
    const [currentChoices, setCurrentChoices] = useState(['', '']);
    const [currentCorrectAnswerIndex, setCurrentCorrectAnswerIndex] = useState(null);
    const [currentQuestionExplain, setCurrentQuestionExplain] = useState("")
    const [fetchingResponse, setFetchingResponse] = useState(null)
   
  
    const handleAddChoice = () => {
      setCurrentChoices([...currentChoices, '']);
    };
  
    const handleChoiceChange = (index, value) => {
      const newChoices = [...currentChoices];
      newChoices[index] = value;
      setCurrentChoices(newChoices);
    };
  
    const handleRemoveChoice = (index) => {
      const newChoices = currentChoices.filter((_, i) => i !== index);
      setCurrentChoices(newChoices);
      if (currentCorrectAnswerIndex === index) {
        setCurrentCorrectAnswerIndex(null);
      } else if (currentCorrectAnswerIndex > index) {
        setCurrentCorrectAnswerIndex(currentCorrectAnswerIndex - 1);
      }
    };
  
    const handleAddQuestion = (e) => {
      
      e.preventDefault();
      
      if (currentQuestionText.trim() && currentChoices.every(c => c.trim() !== '') && currentCorrectAnswerIndex !== null ) {
        // console.log("adding")
        const newQuestion = {
          question: currentQuestionText,
          choices: currentChoices,
          correctAnswer: currentCorrectAnswerIndex,
          answerDetail:currentQuestionExplain
        };
        setNewQuizQuestions([...newQuizQuestions, newQuestion]);
        setCurrentQuestionText('');
        setCurrentChoices(['', '']);
        setCurrentCorrectAnswerIndex(null);
      } else {
        const message = "Please fill out all fields for the question and select a correct answer.";
        const messageBox = document.createElement('div');
        messageBox.className = 'custom-message-box';
        messageBox.innerText = message;
        document.body.appendChild(messageBox);
        setTimeout(() => document.body.removeChild(messageBox), 3000);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    // setCprompt((prev)=>({...prev, isVisible:true}))
     
      if (newQuizQuestions.length === 0) {
        const message = "Please add at least one question to the quiz.";
        const messageBox = document.createElement('div');
        messageBox.className = 'custom-message-box';
        messageBox.innerText = message;
        document.body.appendChild(messageBox);
        setTimeout(() => document.body.removeChild(messageBox), 3000);
        return;
      }
    
      // Convert questions to SparkStudy structure
      const formattedQuestions = newQuizQuestions.map((q, index) => {
        return {
          question: q.question,
          choice: q.choices.map((choice, i) => {
            const letter = String.fromCharCode(65 + i); // "A", "B", "C", etc.
            return [letter, choice];
          }),
          answer: String.fromCharCode(65 + q.correctAnswer), // correct answer letter
          answerDetail: q.answerDetail ||`The correct answer is ${q.correctAnswer}`
        };
      });
    
      const newQuiz = {
        title: newQuizTitle,
        description: newQuizDescription,
        subject: newQuizSubject.toLowerCase(),
        plan: newQuizPlan.toLowerCase(),
        content: formattedQuestions,
        image: newQuizCoverImage
      };
    
      // console.log("Final Quiz Object:", newQuiz);
     
      try {
        const response = await axios.post(`${url}/api/quizzes/add/quiz`, newQuiz, {
          headers: { 
            "Conteent-Type":"application/json",
            "Authorization": `Bearer ${token}` }
        });
        setShowPopup({show:true, response:response.data.message, title:"Subitting Status"});
      } catch (error) {
        console.log("Error creating quiz:", error);
      }
      // Reset form
      setNewQuizTitle('');
      setNewQuizSubject('');
      setNewQuizGrade('');
      setNewQuizDescription('');
      setNewQuizCoverImage('');
      setNewQuizPlan('');
      setNewQuizQuestions([]);
      setCurrentQuestionText('');
      setCurrentChoices(['', '']);
      setCurrentCorrectAnswerIndex(null);
     
      setCprompt((prev)=>({...prev,isVisible:false}))

    };

     // fetching existing contents
     useEffect(()=>{

      const fetchContents = async ()=>{
      
        try {
          const response = await axios.get(`${url}/api/quizzes/?authorId=${userData.userId}`)
         response.data.success ? setQuizzes(response.data.data):null;
          setFetchingResponse(response.data.message)
          
        } catch (error) {
          console.error("Error fetching contents",error)
        }
        
      }

      fetchContents();

     
    },[])

    // confirmation prompt on confirm or cancel
  const cpromptOnClick = (e,status)=>{
    e.preventDefault();
    setCprompt((prev)=>({...prev, isVisible:status}))
 }
    
  
    return (
      <div className="content-page-container">
        <h1 className="page-heading">
          <List size={40} />
          Quizzes
        </h1>
        <div className="card add-form-card">
          <div className="card-header">
            <Plus />
            <h2 className="card-title">Add New Quiz</h2>
          </div>
          <form onSubmit={(e)=>cpromptOnClick(e,true)} className="add-form">
            <div className="form-group-row">
              <input type="text" placeholder="Quiz Title" value={newQuizTitle} onChange={(e) => setNewQuizTitle(e.target.value)} required />
              <input type="text" placeholder="Subject" value={newQuizSubject} onChange={(e) => setNewQuizSubject(e.target.value)} required />
            </div>
            <div className="form-group-row">
              <input type="text" placeholder="Grade" value={newQuizGrade} onChange={(e) => setNewQuizGrade(e.target.value)} required />
              <select value={newQuizPlan} onChange={(e) => setNewQuizPlan(e.target.value)} className="form-select" required>
                <option value="">Select Plan</option>
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
              </select>
            </div>
            <input type="text" placeholder="Description" value={newQuizDescription} onChange={(e) => setNewQuizDescription(e.target.value)} />
            <input type="text" placeholder="Cover Image URL" value={newQuizCoverImage} onChange={(e) => setNewQuizCoverImage(e.target.value)} />
  
            <div className="question-builder">
              <h3>Add Questions</h3>
              {newQuizQuestions.length > 0 && (
                <div className="question-list">
                  {newQuizQuestions.map((q, index) => (
                    <div key={index} className="question-item">
                      <p><strong>{index + 1}. {q.question}</strong></p>
                      <ul>
                        {q.choices.map((c, i) => (
                          <li key={i} className={c === q.correctAnswer ? 'correct-answer' : ''}>
                            {c}
                            {i === q.correctAnswer && <CheckCircle size={16} className="correct-icon" />}
                          </li>
                        ))}
                      </ul>
                      <div className="answer-detail">
                        <TinyMCEMathRenderer content={q.answerDetail} />
                        
                        </div>
                    </div>
                  ))}
                </div>
              )}
  
              <div className="current-question-form">

                <textarea placeholder="Enter question text..." value={currentQuestionText} onChange={(e) => setCurrentQuestionText(e.target.value)}></textarea>

               <div className="current-answer-detail">
                <ContentEditor title="Answer Explanation" onSave={setCurrentQuestionExplain} />
               </div>

                <div className="choices-list">
                  {currentChoices.map((choice, index) => (
                    <div key={index} className="choice-input-group">
                      <span
                        className={`correct-toggle ${currentCorrectAnswerIndex === index ? 'is-correct' : ''}`}
                        onClick={() => setCurrentCorrectAnswerIndex(index)}
                      >
                        {currentCorrectAnswerIndex === index ? <CheckCircle size={16} /> : <Circle size={16} />}
                      </span>
                      <input
                        type="text"
                        placeholder={`Choice ${index + 1}`}
                        value={choice}
                        onChange={(e) => handleChoiceChange(index, e.target.value)}
                      />
                      {currentChoices.length > 2 && (
                        <button type="button" className="admin-button remove-btn" onClick={() => handleRemoveChoice(index)}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="button-group-left">
                  <button type="button" className=" admin-button secondary-btn" onClick={handleAddChoice}>
                    <Plus size={18} /> Add Choice
                  </button>
                  <button type="button" className="admin-button add-question-btn" onClick={handleAddQuestion}>
                    <Plus size={18} /> Add Question
                  </button>
                </div>
              </div>
            </div>
            <div className="button-group">
              <button className='admin-button ' type="submit">
                <Plus size={18} /> Create Quiz
              </button>
            </div>
          </form>
        </div>
        <div className="card list-card">
          <div className="card-header">
            <List />
            <h2 className="card-title">Existing Quizzes</h2>
          </div>

          <ul className="item-list">
  {quizzes.map((quiz) => {
    const id =
      quiz?._id?.$oid || quiz?._id || quiz?.id || Math.random().toString(36).slice(2);
    const qCount = Array.isArray(quiz?.content)
      ? quiz.content.length
      : Array.isArray(quiz?.questions)
      ? quiz.questions.length
      : 0;

    const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "—");
    const created =
      quiz?.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : null;

    return (
      <li key={id}>
        <strong>{quiz?.title || "Untitled Quiz"}</strong>
        {" | "}Subject: {cap(quiz?.subject)}
        {quiz?.grade ? <>{" | "}Grade: {quiz.grade}</> : null}
        {" | "}Plan: {cap(quiz?.plan)}
        <br />
        <em>
          {qCount} {qCount === 1 ? "question" : "questions"}
          {created ? ` — Added on ${created}` : ""}
        </em>
      </li>
    );
  })}
</ul>

        </div>

         {/* Confirmation prompt */}

      <ConfirmationPrompt 
      onConfirm={handleSubmit}
      onCancel={(e)=>cpromptOnClick(e,false)}
      isVisible={cprompt.isVisible}
      message={cprompt.message}
      />
      </div>
    );
  };

  export default QuizzesPage