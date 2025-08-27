import React, { useContext, useEffect, useState } from 'react'
import './TopicExplanation.css'
import ExplanationLister from '../../Components/ContentTemplates/ExplanationsLister/ExplanationLister'
import useLearningTimer from '../../hooks/useLearningTimer';
import { StoreContext } from '../../Context/StoreContext';
import { useLocation } from 'react-router-dom';


const TopicExplanation = () => {

  const {url, token, userData} = useContext(StoreContext)
  // hook to track learning time
  

  return(
    <>
    <ExplanationLister apiName="/api/explanations" />
    </>
  )
}

export default TopicExplanation
