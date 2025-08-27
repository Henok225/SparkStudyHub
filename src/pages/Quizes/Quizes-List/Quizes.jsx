import React, { useContext, useEffect, useState } from 'react'
import './Quizes.css'
import { assets } from '../../../assets/assets'
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../../Context/StoreContext';
import SmallLoader from '../../../Components/SmallLoaderSpin/SmallLoader';
import axios from 'axios';

const Quizes = () => {

  const { token,setShowLogin,subjectsList,url } = useContext(StoreContext);
  const [ quizzesList,setQuizzesList] = useState([]);
  const [quizzesFetched,setQuizzesFetched] = useState({loaded:false,success:false})
  const [refetchQuizzes,setRefetchQuizzes] = useState(false)

  const [subFilter,setSubFilter] = useState("All")
  const [searchKeyList,setSearchKeyList] = useState([]);
  const [filteredSearchList,setFilteredSearchList] = useState([]);
  const [filteredQuizList,setFilteredQuizList] = useState({content:quizzesList})
 
// fetching quizzes list
useEffect(()=>{

  const fetchQuizzesList = async ()=>{

      setQuizzesFetched({loaded:false})
      try {
          const response = await axios.get(`${url}/api/quizzes`);
          setQuizzesList(response.data.data)
          setFilteredQuizList({content:response.data.data})
         
          setQuizzesFetched({loaded:true,success:true})
     
          response.data.data.forEach((element)=>{
            const searchKey1 = element.title;
            const searchKey2 = element.description;
            setSearchKeyList((prev) => ([...prev,{key:searchKey1,address:`/quizzes/${element.subject}/${element._id}`},
              {key:searchKey2,address:`/quizzes/${element.subject}/${element._id}`}]))
            })

      } catch (error) {
          console.log("Error",error)

          setQuizzesFetched({loaded:true,success:false})
     
      }
     
          
  }
  fetchQuizzesList();
},[refetchQuizzes])

  // filter content by subject
  useEffect(()=>{

    
    const queryParams = new URLSearchParams(window.location.search);
    const subjectFilter = queryParams.get('filter')?.split('=')[1];
    if (subjectFilter && subjectFilter !== subFilter) {
      setSubFilter(subjectFilter);
    }
    // navigate(`/quizzes?filter=subject=${subFilter}`);
    // setFilteredExplanationsList((prev) => ({ ...prev, content: explanationsList.content}));
   
    if(subFilter!=="All"){
      const filteredQuizzes = quizzesList.filter((topic) => {
      return topic.subject === subFilter.toLowerCase(); 
    })
    setFilteredQuizList((prev) => ({ ...prev, content: filteredQuizzes}));
    }
    else{
      setFilteredQuizList((prev) => ({ ...prev, content: quizzesList}));
    }
    
  },[subFilter])

  // filter content by search key
  const handleSearch = (e) => {
    
    const searchKey = e.target.value.toLowerCase();
   
    if (searchKey === "") {
      setFilteredSearchList([]);
    } else {
      console.log(searchKey, searchKeyList)
      const filteredKeyList = searchKeyList.filter((keyItem) => {
        // Check if the search key is included in the key
        return keyItem.key.includes(searchKey);
      });
     
      setFilteredSearchList(filteredKeyList);
      
    }
  }

  const navigate = useNavigate();

  const subjects_list = subjectsList;

 

  return (
    <div className='quizzes-container content-container'>
      <h1 className='header-title'>Quizzes</h1>
      <div className="content-nav">
        <div className="content-filter">
          <p>Filter quizzes </p>
        </div>
        <div className="content-search">
          <div className="search-bar">
            <input onChange={handleSearch} type="text" placeholder='search ...' />
            <div className="search-keys">
              
        {
          filteredSearchList.map((key,index)=>{
            return(
              <div className="search-key" key={index} onClick={()=>{token? navigate(key.address) :setShowLogin(true)}}>
                <p>{key.key}</p>
              </div>
            )
          })
        }
      </div>
          </div>
          <div className="search-btn">
            <img src={assets.search_icon} alt="" />
          </div>
        </div>
      </div>
      <div className="subjects-list">
        {
          subjects_list.map((subject,index)=>{
            return(
              <div className='subject' key={index} onClick={()=>{subFilter!==subject.name?setSubFilter(subject.name):setSubFilter("All")}}>
          <div className={subFilter===subject.name?"sub-image active":"sub-image"}><img src={subject.image} alt="" /></div>
          <p>{subject.name}</p>
        </div>
            )
          })
        }
        
      </div>

      <div className="content-list">
        {
          filteredQuizList.content.map((topic, index) => {
            return (
              <div key={index} onClick={() => { token?navigate(`/quizzes/${topic.subject}/${topic._id}`):setShowLogin(true) }}>
                <div className="image">
                  <img src={topic.image} alt="" />
                </div>
                <div className="caption">
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <div className="btns">
                    <button><img src={assets.save_icon} alt="save" /></button>
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>
      {
        quizzesFetched.loaded ? <>{quizzesFetched.success ? null : <p style={{ color: 'red', textAlign: 'center' }}>Something went wrong! <br /><br /><button style={{ borderRadius: 10 + 'px', cursor: 'pointer', padding: 5 + 'px', border: 'none' }} onClick={() => setRefetchQuizzes(!refetchQuizzes)}>Retry</button></p>}</>
          : <SmallLoader />
      }

    </div>
  )
}

export default Quizes
