import React, { useState } from 'react';
import { LayoutDashboard, LogIn, FileText, List, Plus, TrendingUp, Settings, BarChart2, PieChart, Users, Zap, X, Eye, Trash2, CheckCircle, Circle, MessageSquare } from 'lucide-react';
import './FeedBack.css'


const FeedbackPage = ({ feedback, contactRequests }) => {
    return (
      <div className="content-page-container">
        <h1 className="page-heading">
          <MessageSquare size={40} />
          Feedback & Contact
        </h1>
  
        <div className="card list-card">
          <div className="card-header">
            <List />
            <h2 className="card-title">User Feedback</h2>
          </div>
          <ul className="item-list">
            {feedback.map(item => (
              <li key={item.id}>
                <strong>From: {item.name}</strong> | Subject: {item.subject} | Date: {item.date}
                <p className="item-message">{item.message}</p>
              </li>
            ))}
          </ul>
        </div>
  <br />
        <div className="card list-card">
          <div className="card-header">
            <List />
            <h2 className="card-title">Contact Requests</h2>
          </div>
          <ul className="item-list">
            {contactRequests.map(item => (
              <li key={item.id}>
                <strong>From: {item.name}</strong> | Email: {item.email} | Date: {item.date}
                <p className="item-message">{item.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

export default FeedbackPage;