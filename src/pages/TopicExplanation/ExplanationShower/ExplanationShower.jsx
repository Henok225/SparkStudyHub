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
        const response = await axios.post(`${url}/api/explanations/explanation`, { id: id }, {
          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        });
        setContent(response.data.content)
        setTitle(response.data.title)

        setLoadingContent({ loaded: true, success: true, response: "Content has successfuly loaded" })

        // waiting 5 minuts before marking viewed or completed
        setTimeout(async () => {
          try {
           const timer_response = await axios.post(`${url}/api/user/update-recently-viewed`, 
              {
                itemType:"lessons",
                itemId:"explain/subject/"+id,
                itemTitle:response.data.title,
                date: new Date()
              },{
                headers: {
                  'Content-Type': 'application/json',
                  'token': token
                }
              });
  
              // console.log(timer_response.data.message)
  
          } catch (error) {
            console.log("Error marking explanation as viewed:", error);
          }

 // Marking content as completed
          try {
            const track_Response = await axios.post(url+'/api/user/update-progress', 
              { 
                itemType:"lessons",
                itemId:"explain/subject/"+id,
                date: new Date()
              },
              {
                headers:{
                  "Content-Type":"application/json",
                  "token":token
                }
              }
            )
          } catch (error) {
            console.log("Error! server error!",error)
          }


        }, 3000); // 5 minutes
       

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

  // const TextContent = (props) => {

  //   if (props.tagName === "p") {
  //     return <p>{props.content}</p>
  //   }
  //   else if (props.tagName === "h1") {
  //     return <h1>{props.content}</h1>
  //   }
  //   else if (props.tagName === "h2") {
  //     return <h2>{props.content}</h2>
  //   }
  //   else if (props.tagName === "h3") {
  //     return <h3>{props.content}</h3>
  //   }
  //   else {
  //     return <p>{props.content}</p>
  //   }

  // }


  return (
    <div className="lesson-page">
      
      <div className="lesson-content-container">
        <div className="lesson-header">
          <p className="breadcrumb">
            <span onClick={() => navigate('/explain')}>Explanation</span> / <span>{topicToExplain.subject}</span> / <span> {topicToExplain.title}</span>
          </p>
          <h1>{topicToExplain.title}</h1>
        </div>

        <div className="main-content-area">
          <div className="video-section">
            <div className="video-wrapper">
              <iframe
                src={topicToExplain.content.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {loadingContent.loaded ? (
            loadingContent.success ? (
              <>
                <div className="text-explanation-container">
                  <h2>{topicToExplain.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: topicToExplain.content.note }}></div>
                  <div className="end-of-lesson">
                    <hr />
                    <p>End of the lesson</p>
                    <hr />
                  </div>
                </div>
              </>
            ) : (
              <div className="error-message">
                <p>An error occurred while loading the content.</p>
              </div>
            )
          ) : (
            <SmallLoader />
          )}
        </div>

        <div className="lesson-footer-actions">
          <div className="action-card">
            <h3>Was this explanation helpful?</h3>
            <p>Your feedback helps us improve our content. Please let us know your thoughts!</p>
            {userData ? (
              <button className="action-button" onClick={() => navigate('/feedback')}>
                Give Feedback
              </button>
            ) : (
              <button
                className="action-button"
                onClick={() => {
                  setShowPopup({ show: true, response: "You need to be logged in to give feedback!" });
                  showLogin(true);
                }}
              >
                Login to Give Feedback
              </button>
            )}
          </div>
          <div className="action-card">
            <h3>Explore More Topics</h3>
            <p>Dive deeper into related subjects and expand your knowledge with our curated content.</p>
            <button className="action-button" onClick={() => navigate('/explain')}>
              Explore Topics
            </button>
          </div>
          <div className="action-card">
            <h3>Share Your Knowledge</h3>
            <p>Have insights or resources to share? Contribute to our community and help others learn.</p>
            {userData ? (
              <button
                className="action-button"
                onClick={() => {
                  setShowPopup({ show: true, response: "Content contribution is under development!" });
                }}
              >
                Contribute Now
              </button>
            ) : (
              <button
                className="action-button"
                onClick={() => {
                  setShowPopup({ show: true, response: "You need to be logged in to contribute content!" });
                  showLogin(true);
                }}
              >
                Login to Contribute
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExplanationShower
