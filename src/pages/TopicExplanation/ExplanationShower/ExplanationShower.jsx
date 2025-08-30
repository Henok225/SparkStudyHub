import React, { useContext, useEffect, useState } from 'react'
import './ExplanationShower.css'
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../../../assets/assets';
import { StoreContext } from '../../../Context/StoreContext';
import axios from 'axios';
import SmallLoader from '../../../Components/SmallLoaderSpin/SmallLoader';

const ExplanationShower = () => {
  const navigate = useNavigate();
  const { subject, id } = useParams();
  const [content, setContent] = useState({})
  const [title, setTitle] = useState("")
  const { url, token, showLogin, setShowPopup, userData } = useContext(StoreContext)
  const [loadingContent, setLoadingContent] = useState({ loaded: false, success: false, response: "Content couldn't be loaded!" })

  useEffect(() => {

    const fetchExplanation = async () => {

      try {
        const response = await axios.post(`${url}/api/explanations/explanation?token=${token}&id=${id}`);
        setContent(response.data.content)
        setTitle(response.data.title)

        setLoadingContent({ loaded: true, success: true, response: "Content has successfuly loaded" })

      } catch (error) {
        console.log("Error", error)
        setLoadingContent({ loaded: true, success: false, response: "Content couldn't be loaded!" })
      }


    }
    fetchExplanation();
  }, [])

  const topicToExplain = {
    id: id,
    subject: subject,
    title: title,
    content: content

  }
  // const tagNames = ["p","h1","h2","h3"]
  // let tgName = topicToExplain.content.text[0].tagName;

  const TextContent = (props) => {

    if (props.tagName === "p") {
      return <p>{props.content}</p>
    }
    else if (props.tagName === "h1") {
      return <h1>{props.content}</h1>
    }
    else if (props.tagName === "h2") {
      return <h2>{props.content}</h2>
    }
    else if (props.tagName === "h3") {
      return <h3>{props.content}</h3>
    }
    else {
      return <p>{props.content}</p>
    }

  }


  return (
    <div className='explanation'>
      <h1>Explanation</h1>


      <div className="explain-container ">

        <div className="tit-box">
          <div className="explain-nav">
            <p><span onClick={() => { navigate('/explain') }}>explanation</span> / <span>{topicToExplain.subject}</span> / <span> {topicToExplain.title}</span></p>
          </div>
          <h1>{topicToExplain.title}</h1>

        </div>

        <div className="video-explain-container">
          video
          <iframe src={topicToExplain.content.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        {
          loadingContent.loaded ? loadingContent.success ? <><div className="text-explanation-container">
            <h3>{topicToExplain.title}</h3>

            <div dangerouslySetInnerHTML={{ __html: topicToExplain.content.note }}></div>
            <div className="end-of-lesson">
              {/* This is the end of the lesson */}
              <hr style={{ width: '50vw', color: 'silver' }} />
              <h3 style={{ textAlign: 'center', color: 'gray' }}>End of the lesson</h3>
              <hr style={{ width: '50vw', color: 'silver' }} />

            </div>

          </div>

            {/* <div className="similar-topics">
          <h2>Similar Topics</h2>
          <div className="content-list">
          {
            <ExplanationLister apiName="/api/explanations" />
    
          }           
          </div>
        </div> */}
            <div className="give-feedback">
              <h2>Was this explanation helpful?</h2>
              <p>Your feedback helps us improve our content. Please let us know your thoughts!</p>
              {
                userData ? <button onClick={() => navigate('/feedback')}>Give Feedback</button>
                  : <button onClick={() => {
                    setShowPopup(prev => ({ ...prev, show: true, response: "You need to be logged in to give feedback!" }));
                    showLogin(true)
                  }}>Login to Give Feedback</button>
              }

            </div>
            <div className="more-to-explore">
              <h2>Explore More Topics</h2>
              <p>Dive deeper into related subjects and expand your knowledge with our curated content.</p>
              <button onClick={() => { navigate('/explain') }}>Explore Topics</button>
            </div>
            <div className="share-knowledge">
              <h2>Share Your Knowledge</h2>
              <p>Have insights or resources to share? Contribute to our community and help others learn.</p>
              {
                userData ? <button onClick={() => { setShowPopup(prev => ({ ...prev, show: true, response: "Content contribution is under development!" })) }}>Contribute Now</button> : <button onClick={() => { setShowPopup(prev => ({ ...prev, show: true, response: "You need to be logged in to contribute content!" })); showLogin(true) }}>Login to Contribute</button>
              }


            </div>
          </>
            : setShowPopup(prev => ({ ...prev, show: true, response: loadingContent.response }))
            : <SmallLoader />
        }

      </div>

    </div>
  )
}

export default ExplanationShower
