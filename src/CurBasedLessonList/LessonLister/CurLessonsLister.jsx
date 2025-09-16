import React, { useState, useEffect, useRef, useContext } from 'react';
import { BookText, Search, Star, ChevronDown } from 'lucide-react';
import './CurLessonsLister.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

const CurLessonsLister = () => {
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const filterRef = useRef(null);
  const navigate = useNavigate();
  
  const [explanationsList, setExplanationsList] = useState({ loaded: false, content: [] });
  const [filteredExplanationsList, setFilteredExplanationsList] = useState({ content: [] })
  const [explanationsFetched, setExplanationsFetched] = useState({ loaded: false, success: false })
  const [refetchExplanations, setRefetchExplanations] = useState(false);
  const { url, userData, token, setShowLogin, subjectsList, setShowPopup } = useContext(StoreContext);
   
  const [itemSaved, setItemSaved] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  const [searchKeyList, setSearchKeyList] = useState([]);
  const [filteredSearchList, setFilteredSearchList] = useState([]);
  
  const {gradeId} = useParams()


//   fetching lesson lists

useEffect(() => {

    // if(!explanationsList.loaded){
    const fetchExplanationsList = async () => {

      setExplanationsFetched({ loaded: false })

      try {
        const response = await axios.get(url + "/api/explanations/");
        const filteredData = response.data.data.filter((item)=>item.grade === gradeId && (item.subject.toLowerCase() === selectedSubject.toLowerCase() || selectedSubject.toLowerCase() === "all subjects")); // filtering by selected grade

         filteredData.forEach((element) => {
          const searchKey1 = element.name.toLowerCase();
          const searchKey2 = element.description.toLowerCase();
          searchKeyList.push({ key: searchKey1, address: `/explain/${element.subject}/${element._id}` })
          searchKeyList.push({ key: searchKey2, address: `/explain/${element.subject}/${element._id}` })
        })

        setExplanationsList({ loaded: true, content: filteredData })
        setFilteredExplanationsList({ content: filteredData })

        setExplanationsFetched({ loaded: true, success: true })
        setLoading(false);
        // console.log(response.data.data)
      } catch (error) {
        console.log("Error", error)

        setExplanationsFetched({ loaded: true, success: false })
        setLoading(false);
      }

    }

    fetchExplanationsList();
    
    // }
  }, [refetchExplanations, selectedSubject])


// fetching saved items
useEffect(() => {
    //  fetching saved items from backend 
    const fetchSavedItems = async () => {

      try {
        const response = await axios.get(`${url}/api/user/get-saved-items`, {
          headers: { token: token }
        });
        setSavedItems(response.data.savedItems);
        // console.log(response.data.savedItems)
        // console.log("Saved items fetched", response.data.savedItems)
      } catch (error) {
        console.log("Error fetching saved items", error);
      }
    }
    fetchSavedItems();

  }, [itemSaved])

  // Handle save explanation
  const handleSaveExplanation = async (e, itemId, itemTitle, itemSubject) => {
    // Logic to save the explanation 
    try {

      const response = await axios.post(`${url}/api/user/update-saved-items`, {
        userId: userData?.userId, // Assuming token is the user ID; adjust as necessary
        itemType: 'lessons', // or 'quizzes' or 'flashCards'
        itemAddress: `/explain/${itemSubject}/${itemId}`,
        itemTitle: itemTitle,
        date: new Date().toISOString()
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setItemSaved(!itemSaved);

    } catch (error) {
      console.error('Error saving explanation:', error);
      setShowPopup({ show: true, response: "error", title: "Failed to save the item. Please try again." })
    }

  };

  // subject drpdown utils
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setIsFilterOpen(false);
    // You would add filtering logic here based on the subject
    console.log(`Filtered by: ${subject}`);
  };

// filter content by search key
  const handleSearch = (e) => {
  const searchKey = e.target.value.toLowerCase();
  if (searchKey === "") {
    setFilteredSearchList([]);
  } else {
    const filteredKeyList = searchKeyList.filter((keyItem) => {
      return keyItem.key.includes(searchKey);
    });
    setFilteredSearchList(filteredKeyList);
  }
}

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<span key={i} className="spark-star filled">★</span>);
      } else if (i - 0.5 <= rating) {
        stars.push(<span key={i} className="spark-star half-filled">★</span>);
      } else {
        stars.push(<span key={i} className="spark-star">☆</span>);
      }
    }
    return stars;
  };


  const subjects = ['All Subjects', 'Physics', 'Mathematics', 'Chemistry', 'Biology', 'History', 'Geography'];

  return (
    <div className="spark-container">

      <div className="spark-header">
        <div className="spark-header-left">
          <div className="spark-logo">SparkStudy</div>
          <div className="spark-curriculum-text">Ethiopian Curriculum</div>
        </div>
        <div className="spark-header-right">
          <div className="spark-breadcrumb">
           <span onClick={()=>navigate("/")}> Home</span> &gt; <span onClick={()=>navigate('/ethiopian-curriculum')}>Curriculum</span> &gt; <span>Ethiopian</span> &gt; <span>Grade 9</span> &gt; <span>Explanations</span>
          </div>
        </div>
      </div>

      <div className="spark-content">
        <h1 className="spark-page-title">Grade {gradeId} - Explanations</h1>

        <div className="spark-filters-bar">
          <div className="spark-search-container">
            <span className="spark-search-icon"><Search size={20} /></span>
            <input onChange={handleSearch} type="text" placeholder="Search for explanations..." className="spark-search-input" />
            <div className="search-keys">
              {
                filteredSearchList.map((key, index) => {
                  return (
                    <div className="search-key" key={index} onClick={() => { token ? navigate(key.address) : setShowLogin(true) }}>
                      <p>{key.key}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="spark-filter-dropdown" ref={filterRef}>
            <button className="spark-filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              {selectedSubject} <ChevronDown size={16} />
            </button>
            <div className={`spark-filter-options ${isFilterOpen ? 'active' : ''}`}>
              <ul>
                {subjects.map(subject => (
                  <li
                    key={subject}
                    className={selectedSubject === subject ? 'selected' : ''}
                    onClick={() => handleSubjectSelect(subject)}
                  >
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="spark-cards-grid">
          {loading ? (
            // Loading state UI with skeleton cards
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="spark-loading-card">
                <div className="spark-loading-line"></div>
                <div className="spark-loading-line spark-short"></div>
                <div className="spark-loading-line"></div>
                <div className="spark-loading-line spark-short"></div>
              </div>
            ))
          ) : <>
            
            {filteredExplanationsList && filteredExplanationsList.content.length !== 0 ?
                filteredExplanationsList.content.map((card, index) => (
                    <div
                      key={card._id}
                      className="spark-card"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <button
                        className={`spark-bookmark-btn ${card.isBookmarked ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSaveExplanation(e, card._id, card.name, card.subject)
                        }}
                        aria-label={card.isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
                      >
                        {
                              savedItems && savedItems.lessons &&(
                                savedItems.lessons.find((item) => item.itemAddress === `/explain/${card.subject}/${card._id}`) !== undefined ? <Star size={24} fill='#ffc107'  color='#ffc107' /> 
                                :  <Star size={24} fill={'none'} color={'#ccc'} />
                       
                              )
                                  
                            }
                         </button>

                      <div className="spark-card-header">
                        <div className="spark-card-icon-wrapper">
                          <span className="spark-card-icon"><BookText size={24} /></span>
                        </div>
                        <span className="spark-card-title">{card.subject.toUpperCase()}: {card.name}</span>
                      </div>
                      <p className="spark-card-snippet">{card.description}</p>
                      <div className="spark-card-footer">
                        <button onClick={() => { token ? navigate(`/explain/${card.subject}/${card._id}`) : setShowLogin(true) }} className="spark-view-lesson-button">View</button>
                        <div className="spark-rating" aria-label={`Rated ${card.rating} out of 5 stars`}>
                          {renderRatingStars(card.rating)}
                        </div>
                      </div>
                      <span className="spark-creation-date">{card.createdAt}</span>
                    </div>
                  ))
            
            : <h3>Content is unavailable! please come back later :) </h3>
                }
                </> }
        </div>

        {/* <div className="spark-pagination">
          <a href="#" className="spark-page-link active">1</a>
          <a href="#" className="spark-page-link">2</a>
          <a href="#" className="spark-page-link">3</a>
          <a href="#" className="spark-page-link">Next</a>
        </div> */}
      </div>
    </div>
  );
};

export default CurLessonsLister;
