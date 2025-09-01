import React from 'react'
import QuizzesLister from '../../../../Components/ContentTemplates/ExplanationsLister/QuizzesLister/QuizzesLister'
import { useParams } from 'react-router-dom';

const EthCurQuizzes = () => {

    const { gradeId } = useParams();


  return (
    <QuizzesLister apiName="api/quizzes" filter={{grade:gradeId}} />
  )
}

export default EthCurQuizzes
