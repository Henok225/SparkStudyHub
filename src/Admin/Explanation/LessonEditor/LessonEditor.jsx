import { useState } from 'react';
import './LessonEditor.css'

// --- MOCK DATA ---
const mockLessonData = {
  id: 'lesson-123',
  title: 'Introduction to Photosynthesis',
  subject: 'Biology',
  grade: '10th Grade',
  coverImageUrl: 'https://placehold.co/600x400/2ecc71/ffffff?text=Photosynthesis',
  plan: 'free',
  pages: [
    {
      id: 'page-1',
      sections: [
        { type: 'text', content: '<h3>What is Photosynthesis?</h3><p>Photosynthesis is the process used by plants, algae, and certain bacteria to turn light energy into chemical energy.</p>' },
        { type: 'image', url: 'https://placehold.co/800x600/3498db/ffffff?text=Plant+Cell', caption: 'A typical plant cell, where photosynthesis occurs.' },
        { type: 'text', content: '<h4>The Formula</h4><p>The chemical equation for photosynthesis is $6CO_{2} + 6H_{2}O + \text{light energy} \\to C_{6}H_{12}O_{6} + 6O_{2}$.</p>' }
      ]
    },
    {
      id: 'page-2',
      sections: [
        { type: 'video', url: 'https://www.youtube.com/embed/S_B75i3eP4E', caption: 'A video explaining the light-dependent reactions.' },
        { type: 'quiz', quizId: 'quiz-456' }
      ]
    },
    {
      id: 'page-3',
      sections: [
        { type: 'text', content: '<h3>Summary</h3><p>In summary, photosynthesis is a fundamental biological process that sustains life on Earth.</p>' }
      ]
    }
  ],
};

const mockQuizzes = {
  'quiz-456': {
    id: 'quiz-456',
    title: 'Photosynthesis Quiz',
    questions: [
      { question: 'What is the primary energy source for photosynthesis?', options: ['Water', 'Sunlight', 'Carbon Dioxide'], answer: 'Sunlight' },
      { question: 'What gas is a byproduct of photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Methane'], answer: 'Oxygen' },
    ]
  },
};

const LessonEditor = ({ lesson, onSave }) => {
    const [formData, setFormData] = useState(mockLessonData);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
  
    const currentPage = formData.pages[currentPageIndex];
  
    // Handler for basic form fields
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({ ...prevData, [name]: value }));
    };
  
    // Handler for adding a new section
    const handleAddSection = () => {
      const newSection = { type: 'text', content: '' };
      const updatedPages = [...formData.pages];
      updatedPages[currentPageIndex].sections.push(newSection);
      setFormData(prevData => ({ ...prevData, pages: updatedPages }));
    };
  
    // Handler for updating a section
    const handleSectionChange = (sectionIndex, field, value) => {
      const updatedPages = [...formData.pages];
      updatedPages[currentPageIndex].sections[sectionIndex][field] = value;
      setFormData(prevData => ({ ...prevData, pages: updatedPages }));
    };
  
    // Handler for deleting a section
    const handleDeleteSection = (sectionIndex) => {
      if (currentPage.sections.length <= 1) return;
      const updatedPages = [...formData.pages];
      updatedPages[currentPageIndex].sections.splice(sectionIndex, 1);
      setFormData(prevData => ({ ...prevData, pages: updatedPages }));
    };
    
    // Handlers for reordering sections
    const handleMoveSection = (sectionIndex, direction) => {
      const updatedPages = [...formData.pages];
      const updatedSections = [...updatedPages[currentPageIndex].sections];
      const newIndex = sectionIndex + direction;
      if (newIndex >= 0 && newIndex < updatedSections.length) {
        const [movedSection] = updatedSections.splice(sectionIndex, 1);
        updatedSections.splice(newIndex, 0, movedSection);
        updatedPages[currentPageIndex].sections = updatedSections;
        setFormData(prevData => ({ ...prevData, pages: updatedPages }));
      }
    };
  
    // Handlers for page navigation
    const handleNextPage = () => {
      if (currentPageIndex < formData.pages.length - 1) {
        setCurrentPageIndex(prevIndex => prevIndex + 1);
      } else {
        // Add a new page if it's the last one
        const newPage = { id: `page-${formData.pages.length + 1}`, sections: [{ type: 'text', content: '' }] };
        setFormData(prevData => ({ ...prevData, pages: [...prevData.pages, newPage] }));
        setCurrentPageIndex(prevIndex => prevIndex + 1);
      }
    };
    const handlePrevPage = () => {
      if (currentPageIndex > 0) {
        setCurrentPageIndex(prevIndex => prevIndex - 1);
      }
    };
  
    // Placeholder save function
    const handleSave = () => {
      console.log('Simulating API POST to /api/lessons...');
      // In a real app, this would be an async fetch call
      console.log('Saving lesson data:', formData);
      onSave(formData);
    };
  
    return (
      <>
        <div className="lesson-editor">
          <div className="sidebar">
            <h2>Lesson: {formData.title || 'Untitled'}</h2>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${((currentPageIndex + 1) / formData.pages.length) * 100}%`}}></div>
            </div>
            <p>Page {currentPageIndex + 1} of {formData.pages.length}</p>
          </div>
          <div className="content">
            <h1>Lesson Editor</h1>
            <form name='lesson-metadata' className="lesson-form">
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleFormChange} rows="3"></textarea>
              </div>
              <div className="form-group-row">
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleFormChange} required/>
                </div>
                <div className="form-group">
                  <label>Grade</label>
                  <input type="text" name="grade" value={formData.grade} onChange={handleFormChange} required/>
                </div>
              </div>
              <div className="form-group-row">
                <div className="form-group">
                  <label>Cover Image URL</label>
                  <input type="url" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleFormChange} required/>
                </div>
                <div className="form-group">
                  <label>Plan</label>
                  <select name="plan" value={formData.plan} onChange={handleFormChange}>
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>
            </form>
  
            <div className="le-page-container">
              <h3>Page {currentPageIndex + 1}</h3>
              <div className="sections-list">
                {currentPage.sections.map((section, index) => (
                  <div key={index} className="section-editor">
                    <div className="section-header">
                      <div className="section-controls">
                        <button onClick={() => handleMoveSection(index, -1)} disabled={index === 0}>▲ Move Up</button>
                        <button onClick={() => handleMoveSection(index, 1)} disabled={index === currentPage.sections.length - 1}>▼ Move Down</button>
                      </div>
                      <div className="section-type">
                        <select
                          value={section.type}
                          onChange={(e) => handleSectionChange(index, 'type', e.target.value)}
                        >
                          <option value="text">Text</option>
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                          {/* <option value="quiz">Quiz</option> */}
                        </select>
                        <button className="delete-section-btn" onClick={() => handleDeleteSection(index)}>Delete Section</button>
                      </div>
                    </div>
                    {section.type === 'text' && (
                      <textarea
                        className="rich-text-area"
                        value={section.content}
                        onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                        placeholder="Enter text content..."
                      ></textarea>
                    )}
                    {section.type === 'image' && (
                      <>
                        <input
                          type="url"
                          value={section.url}
                          onChange={(e) => handleSectionChange(index, 'url', e.target.value)}
                          placeholder="Image URL"
                        />
                        <input
                          type="text"
                          value={section.caption}
                          onChange={(e) => handleSectionChange(index, 'caption', e.target.value)}
                          placeholder="Image caption"
                        />
                      </>
                    )}
                    {section.type === 'video' && (
                      <>
                        <input
                          type="url"
                          value={section.url}
                          onChange={(e) => handleSectionChange(index, 'url', e.target.value)}
                          placeholder="YouTube Embed URL (e.g., https://www.youtube.com/embed/S_B75i3eP4E)"
                        />
                        <input
                          type="text"
                          value={section.caption}
                          onChange={(e) => handleSectionChange(index, 'caption', e.target.value)}
                          placeholder="Video caption"
                        />
                      </>
                    )}
                    {section.type === 'quiz' && (
                      <select
                        value={section.quizId}
                        onChange={(e) => handleSectionChange(index, 'quizId', e.target.value)}
                      >
                        <option value="">Select a Quiz</option>
                        {Object.keys(mockQuizzes).map(id => (
                          <option key={id} value={id}>{mockQuizzes[id].title}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
              <button className="add-section-btn" onClick={handleAddSection}>Add Section</button>
            </div>
  
            <div className="pagination-controls">
              <button onClick={handlePrevPage} disabled={currentPageIndex === 0}>
                ← Previous Page
              </button>
              <button onClick={handleNextPage}>
                {currentPageIndex < formData.pages.length - 1 ? 'Next Page →' : 'Add Page'}
              </button>
            </div>
  
            <button form='lesson-metadata' type='submit' className="save-btn" onClick={handleSave}>
              Save Lesson
            </button>
          </div>
        </div>
        
      </>
    );
  };

  export default LessonEditor;