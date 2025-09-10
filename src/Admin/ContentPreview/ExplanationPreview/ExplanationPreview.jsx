import React from 'react'
import './ExplanationPreview.css'

const ExplanationPreview = ({previewData}) => {

    const contentToAdd = previewData;

  return (
    <div>
        <>

<div className='content-cover-page'>
                <div className="image-box">
                  <img src={contentToAdd.coverImage} alt="" />
                </div>
                <div className="caption">
                  <h3>{contentToAdd.title}</h3>
                  <p>{contentToAdd.description}</p>
                  <div className="btns">
                    <button>Save</button>
                  </div>
                </div>
                
              </div>
      
      {/* <h1>Preview of content</h1><br /> */}
      <div className="content-box">
      <div className='explanation'>
      <h1>Explanation</h1>
      <div className="explain-nav">
        <p><span onClick={()=>{navigate('/explain')}}>explanation</span> / <span>{contentToAdd.subject}</span> / <span> {contentToAdd.title}</span></p>
      </div>
      <div className="explain-container">
        <div className="video-explain-container">
          {/* video */}
          <iframe width="1232" height="693" src={contentToAdd.content.video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encryptedMedia; gyroscope; picture-in-picture; " referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
           </div>
        <div  className="text-explanation-container">
       <h3>{contentToAdd.title}</h3>
      <div dangerouslySetInnerHTML={{__html:contentToAdd.content.note}} />
         {/* {textNote} */}
        </div>
      </div>
      
    </div>

    {/* <button onClick={()=>setPreview(false)}>Go Back </button> */}
      
      </div>

      </>
    </div>
  )
}

export default ExplanationPreview
