import React, { useContext, useEffect, useState } from 'react';
import { LayoutDashboard, LogIn, FileText, List, Plus, TrendingUp, Settings, BarChart2, PieChart, Users, Zap, X, Eye, Trash2, CheckCircle, Circle, MessageSquare } from 'lucide-react';
import './SupAdmin.css'
import axios from 'axios';
import { StoreContext } from '../../../Context/StoreContext';
import SmallLoader from '../../../Components/SmallLoaderSpin/SmallLoader';
import ExplanationLister from '../../../Components/ContentTemplates/ExplanationsLister/ExplanationLister';

const SupAdmin = () => {

  const [explanations, setExplanations] = useState({active:null, pending:null});  
  const [quizzes, setQuizzes] = useState({active:null, pending:null})
   const {url, token, userData} = useContext(StoreContext)
   const [users,setUsers] = useState(null)
  //  fetching all users and contents
  useEffect(()=>{
    const fetchUsers = async ()=>{
      try {
        const response =await axios.get(url+"/api/user/users", {
          headers:{
            "Authorization": `Bearer ${token}`
          }
        })

        if(response.data.success){
          setUsers(response.data.users)
        }

      } catch (error) {
        console.log("server error",error)
      }
    }
    const fetchLessons = async ()=>{
      try {
        const response = await axios.get(url+"/api/explanations/")

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
        const response = await axios.get(url+"/api/quizzes/")

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

    fetchUsers();
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
        <div className="grid-container">
          <div className="card">
            <div className="card-header">
              <BarChart2 className="card-icon" />
              <h2 className="card-title">Weekly Views</h2>
            </div>
            <div className="chart-mockup">
              <div className="bar-set">
                <div className="bar-group">
                  <div className="bar" style={{ height: '70%' }}></div>
                  <span className="label">Mon</span>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{ height: '85%' }}></div>
                  <span className="label">Tue</span>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{ height: '60%' }}></div>
                  <span className="label">Wed</span>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{ height: '90%' }}></div>
                  <span className="label">Thu</span>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{ height: '95%' }}></div>
                  <span className="label">Fri</span>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{ height: '80%' }}></div>
                  <span className="label">Sat</span>
                </div>
                <div className="bar-group">
                  <div className="bar" style={{ height: '75%' }}></div>
                  <span className="label">Sun</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <Users className="card-icon" />
              <h2 className="card-title">Active Users</h2>
            </div>
            <div className="chart-mockup pie-chart-container">
              <div className="pie-chart"></div>
              <div className="pie-legend">
                <div><span className="legend-circle" style={{ backgroundColor: '#6d28d9' }}></span> New</div>
                <div><span className="legend-circle" style={{ backgroundColor: '#8b5cf6' }}></span> Returning</div>
                <div><span className="legend-circle" style={{ backgroundColor: '#a78bfa' }}></span> Inactive</div>
              </div>
            </div>
          </div>
        </div>
        <div className="summary-cards">
          <div className="card summary-card">
            <FileText className="summary-icon" />
            <p className="summary-value">{explanations.active ? explanations.active.length : <SmallLoader />}</p>
            <p className="summary-label">Active Explanations</p>
          </div>
          <div className="card summary-card">
            <FileText className="summary-icon" />
            <p className="summary-value">{explanations.pending ? explanations.pending.length : <SmallLoader />}</p>
            <p className="summary-label">Pending Explanations</p>
          </div>
          
          <div className="card summary-card">
            <List className="summary-icon" />
            <p className="summary-value">{quizzes.active ? quizzes.active.length: <SmallLoader />}</p>
            <p className="summary-label">Active Quizzes</p>
          </div>
          <div className="card summary-card">
            <List className="summary-icon" />
            <p className="summary-value">{quizzes.pending ? quizzes.pending.length : <SmallLoader />}</p>
            <p className="summary-label">Pending Quizzes</p>
          </div>
          <div className="card summary-card">
            <TrendingUp className="summary-icon" />
            <p className="summary-value">{users ? users.length : <SmallLoader />}</p>
            <p className="summary-label">Total users</p>
          </div>
        </div>

        
      </div>
     
    );
  };

  export default SupAdmin;