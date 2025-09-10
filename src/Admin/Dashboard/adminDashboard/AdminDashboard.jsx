import React, { useContext, useEffect, useState } from 'react';
import { LayoutDashboard, LogIn, FileText, List, Plus, TrendingUp, Settings, BarChart2, PieChart, Users, Zap, X, Eye, Trash2, CheckCircle, Circle, MessageSquare } from 'lucide-react';
import './AdminDashboard.css'
import axios from 'axios';
import { StoreContext } from '../../../Context/StoreContext';

const AdminDashboard = () => {
    const {url,token, userData} = useContext(StoreContext)     
    const [explanations,setExplanations] = useState({active:[], pending:[]})
    const [quizzes, setQuizzes] =useState({active:[], pending:[]})

    useEffect(()=>{

      const fetchLessons = async ()=>{
        try {
          const response = await axios.get(`${url}/api/explanations/?authorId=${userData.userId}`)
  
          if(response.data.success){
            setExplanations( (prev) =>({...prev, active:response.data.data}))
          }
  
        } catch (error) {
          console.log("server error",error)
        }
      }
      const fetchPendingLessons = async ()=>{
        try {
          const response = await axios.get(url+"/api/explanations/pending-explanations", {
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+token
            }
          })
  
          if(response.data.success){
            setExplanations( (prev) =>({...prev, pending:response.data.data}))
          }
  
        } catch (error) {
          console.log("server error",error)
        }
      }
      const fetchQuizzes = async ()=>{
        try {
          const response = await axios.get(`${url}/api/quizzes/?authorId=${userData.userId}`)
  
          if(response.data.success){
            setQuizzes( (prev) =>({...prev, active:response.data.data}))
          }
  
        } catch (error) {
          console.log("server error",error)
        }
      }
      const fetchPendingQuizzes = async ()=>{
        try {
          const response = await axios.get(url+"/api/quizzes/pending-quizzes", {
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+token
            }
          })
  
          if(response.data.success){
            setQuizzes( (prev) =>({...prev, pending:response.data.data}))
          }
  
        } catch (error) {
          console.log("server error",error)
        }
      }
  
     
      fetchLessons();
      fetchPendingLessons();
      fetchQuizzes();
      fetchPendingQuizzes();

    },[])
    
    return (
      <div className="dashboard-container">
        <h1 className="page-heading">
          <LayoutDashboard size={40} />
          Dashboard
        </h1>

        
        <div className="summary-cards">
          <div className="card summary-card">
            <FileText className="summary-icon" />
            <p className="summary-value">{explanations.active.length}</p>
            <p className="summary-label">Active Explanations</p>
          </div>
          <div className="card summary-card">
            <FileText className="summary-icon" />
            <p className="summary-value">{explanations.pending.length}</p>
            <p className="summary-label">Pending Explanations</p>
          </div>
          <div className="card summary-card">
            <List className="summary-icon" />
            <p className="summary-value">{quizzes.active.length}</p>
            <p className="summary-label">Active Quizzes</p>
          </div>
          <div className="card summary-card">
            <List className="summary-icon" />
            <p className="summary-value">{quizzes.pending.length}</p>
            <p className="summary-label">Pending Quizzes</p>
          </div>
          <div className="card summary-card">
            <TrendingUp className="summary-icon" />
            <p className="summary-value">1,245</p>
            <p className="summary-label">Total Views</p>
          </div>
        </div>
      </div>
    );
  };

  export default AdminDashboard;