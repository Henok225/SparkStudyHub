import React from 'react'
import ExplanationLister from '../../../../Components/ContentTemplates/ExplanationsLister/ExplanationLister'
import { useParams } from 'react-router-dom'

const EthCurExplanationList = () => {
 
    const {gradeId} = useParams();
 
    return (
    <div>
      <ExplanationLister apiName={`/api/explanations`} filter={{grade:gradeId}} />
    </div>
  )
}

export default EthCurExplanationList
