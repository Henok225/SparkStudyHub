import React, { useContext, useEffect, useState } from "react";
import {
  FileText,
  List,
  Plus,
  Eye,
} from "lucide-react";
import "./Explanation.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import ContentEditor from "../utils/Editor";
import ConfirmationPrompt from "../../Components/ReusableComponents/ConfirmationPrompt/ConfirmationPrompt";
import LessonEditor from "./LessonEditor/LessonEditor";

const ExplanationsPage = ({ onPreviewExplanation }) => {
  const { url, token, userData, setShowPopup } = useContext(StoreContext);

  const [explanations, setExplanations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [noteToAdd,setNoteToAdd] = useState("")
  const [cprompt, setCprompt] = useState({isVisible:false, message:"", onclick:false})

  const [contentToAdd, setContentToAdd] = useState({
    title: "",
    subject: "",
    description: "",
    grade: "",
    plan: "",
    coverImage: "",
    content: {
      video: "",
      note: "",
    },
  });

  // Fetching existing explanations
  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${url}/api/explanations/?authorId=${userData.userId}`
        );
        if (response.data.success) {
          setExplanations(response.data.data);
        } else {
          setFetchError(response.data.message || "Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching contents:", error);
        setFetchError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [url, userData.userId]);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setContentToAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle video link change
  const handleVideoChange = (event) => {
    
    const value = event.target.value;
    console.log(value)
    setContentToAdd((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        video: value,
      },
    }));
  };

  // Save content handler
  const contentAddHandler = async (event) => {
    event.preventDefault();
   
      try {
      const response = await axios.post(
        `${url}/api/explanations/add/explanation`,
        contentToAdd,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+token
          },
        }
      );

      if(response.data.success){
        // Reset form
      setContentToAdd({
        title: "",
        subject: "",
        description: "",
        grade: "",
        plan: "",
        coverImage: "",
        content: { video: "", note: "" },
      });
      }
         
      setShowPopup({
        show: true,
        response: response.data.message,
        title: "Submitting Status",
      });

      
    } catch (error) {
      console.error("Error submitting content:", error);
      setShowPopup({
        show: true,
        response: "Content submission failed!",
        title: "Submitting Status",
      });
    }
    setCprompt((prev)=>({...prev,isVisible:false}))

     };
     
    

  // Preview handler
  const handlePreview = () => {
    console.log(contentToAdd)
    onPreviewExplanation(contentToAdd);
  };

  // Update text note when ContentEditor changes
  const handleEditorSave = (updater) => {
   
    setContentToAdd((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        note: updater
      }
      
    }));
    
  };
 
   // confirmation prompt on confirm or cancel
   const cpromptOnClick = (e,status)=>{
    e.preventDefault();
    setCprompt((prev)=>({...prev, isVisible:status}))
 }

  return (
    <div className="admin-content-container">
      <h1 className="page-heading">
        <FileText size={40} />
        Explanations
      </h1>

      {/* Add Form */}
      <div className="card add-form-card">
        <div className="card-header">
          <Plus />
          <h2 className="card-title">Add New Explanation</h2>
        </div>

        <form onSubmit={(e)=>cpromptOnClick(e,true)} className="add-form">
          <div className="form-group-row">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={contentToAdd.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={contentToAdd.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-row">
            <input
              type="text"
              name="grade"
              placeholder="Grade"
              value={contentToAdd.grade}
              onChange={handleChange}
              required
            />
            <select
              name="plan"
              className="form-select"
              value={contentToAdd.plan}
              onChange={handleChange}
              required
            >
              <option value="">Select Plan</option>
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
            </select>
          </div>

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={contentToAdd.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="coverImage"
            placeholder="Cover Image URL"
            value={contentToAdd.coverImage}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Video Link"
            value={contentToAdd.content.video}
            onChange={handleVideoChange}
          />

          <h2>Explanation Section</h2>
          <ContentEditor onSave={handleEditorSave} />

          <div className="button-group">
            <button
              type="button"
              className="admin-button secondary-btn"
              onClick={handlePreview}
            >
              <Eye size={18} /> Preview
            </button>
            <button className="admin-button" type="submit">
              <Plus size={18} /> Add Explanation
            </button>
          </div>
        </form>
      </div>

      {/* Existing Explanations */}
      <div className="card list-card">
        <div className="card-header">
          <List />
          <h2 className="card-title">Existing Explanations</h2>
        </div>

        {loading && <p>Loading explanations...</p>}
        {fetchError && <p className="error-text">{fetchError}</p>}

        <ul className="item-list">
          {explanations.map((exp) => (
            <li key={exp.id}>
              <strong>{exp.title}</strong> | Subject: {exp.subject} | Grade:{" "}
              {exp.grade} | Plan: {exp.plan}
              <br />
              <em>
                Added by {exp.author} on {new Date(exp.createdAt).toLocaleDateString()}
              </em>
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmation prompt */}
      <ConfirmationPrompt 
      onConfirm={contentAddHandler}
      onCancel={(e)=>cpromptOnClick(e,false)}
      isVisible={cprompt.isVisible}
      message={cprompt.message}
      />
      
    </div>

    // <LessonEditor onSave={setExplanations} />

  );
};

export default ExplanationsPage;
