import React, { useContext, useEffect, useState } from 'react'
import './Quizes.css'
import { assets } from '../../../assets/assets'
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../../Context/StoreContext';
import SmallLoader from '../../../Components/SmallLoaderSpin/SmallLoader';
import axios from 'axios';
import { Atom, Bookmark, BookmarkCheck, Globe, Landmark, Microscope, Search, Sigma } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";


const Quizes = () => {

  const { token,setShowLogin,subjectsList,url, setShowPopup, userData } = useContext(StoreContext);
  const [ quizzesList,setQuizzesList] = useState([]);
  const [quizzesFetched,setQuizzesFetched] = useState({loaded:false,success:false})
  const [refetchQuizzes,setRefetchQuizzes] = useState(false)

  const [subFilter,setSubFilter] = useState("All")
  const [searchKeyList,setSearchKeyList] = useState([]);
  const [filteredSearchList,setFilteredSearchList] = useState([]);
  const [filteredQuizList,setFilteredQuizList] = useState({content:quizzesList})
  const [itemSaved,setItemSaved] = useState(false); 
  const [savedItems,setSavedItems] = useState([]);
 
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

// fetching saved items
useEffect(() => {
  //  fetching saved items from backend 
  const fetchSavedItems = async ()=>{

      try {
          const response = await axios.get(`${url}/api/user/get-saved-items` ,{
            headers: { token: token }
          });
          setSavedItems(response.data.savedItems);
          console.log("Saved items fetched", response.data.savedItems)
      } catch (error) {
          console.log("Error fetching saved items", error);
      }
  }
  fetchSavedItems();
  
},[itemSaved])

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

  // subjects list
  const subjects_list = [
    {
      name:"Physics",
      icon:Atom
    },
    {
      name:"Biology",
      icon:Microscope
    },
    {
      name:"History",
      icon:Landmark
    },
    {
      name:"Mathematics",
      icon:Sigma
    },
    {
      name:"Geography",
      icon:Globe
    }
  ] ;

  const navigate = useNavigate();

  // const subjects_list = subjectsList;

  // handle save quiz
  const handleSaveQuiz = async (e, itemId, itemTitle, itemSubject) => {
    // Logic to save the explanation 
   try {
   console.log("Title: ",itemTitle) 
    const response = await axios.post(`${url}/api/user/update-saved-items`, {
      userId: userData?.userId, // Assuming token is the user ID; adjust as necessary
      itemType: 'quizzes', // or 'quizzes' or 'flashCards'
      itemAddress: `/quizzes/${itemSubject}/${itemId}`,
      itemTitle: itemTitle,
      date: new Date().toISOString()
    }, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    console.log("Title: ",response.data.message) 
  
    setItemSaved(!itemSaved);
    
   } catch(error) {
    alert(error)
    console.error('Error saving quizzes:', error);
    // setShowPopup({show:true,response:"error",title:"Failed to save the item. Please try again."})
   }
    
  };
 

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
            {/* <img src={assets.search_icon} alt="" /> */}
            <Search/>
          </div>
        </div>
      </div>
      
      <div className="subjects-list">
        {
          subjects_list.map(({name,icon:Icon}, index)=>(
           
              <div className='subject' key={index} onClick={()=>subFilter!==name?setSubFilter(name):setSubFilter("All")}>
          <div className={subFilter===name?"sub-image active":"sub-image"}>
            <Icon />
            </div>
          <p>{name}</p>
        </div>
          ))
        }
      </div>

      
<div className="content-list">
        {
          quizzesFetched.loaded?
          
          <>{
            filteredQuizList.content.length != 0 ?
          filteredQuizList.content.map((topic,index)=>{
            return (
              <motion.div
      className="my-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}  >

              <div key={index} >
                <div className="image" onClick={() => { token?navigate(`/quizzes/${topic.subject}/${topic._id}`):setShowLogin(true) }}>
                  <img src={topic.image} alt="" />

                </div>
                <div className="caption" >
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                 
                  <div className="btns">
                    <button onClick={(e)=>handleSaveQuiz(e, topic._id,topic.title, topic.subject)}>
                      
                    {
                      savedItems.quizzes &&
                      <>
                    {savedItems.quizzes.find((item) => item.itemAddress === `/quizzes/${topic.subject}/${topic._id}` ) !== undefined  ? <> <BookmarkCheck/> Saved </> : <> <Bookmark/> Save</> }
                     </>
                    } </button>
                    
                    <button className='open-btn' onClick={() => { token?navigate(`/quizzes/${topic.subject}/${topic._id}`):setShowLogin(true) }}>open</button>
                  </div>
                </div>
                
              </div>
              </motion.div>
            )
          })
          : <div> 
             <h2 style={{textAlign:'center', padding:'20px'}}> Content is not available! </h2> 
          </div> // for no content available in the search
 } </>
          : null
        }
        
        
      </div>


      {
        quizzesFetched.loaded ?
         <>
         {quizzesFetched.success ? null : <p style={{ color: 'red', textAlign: 'center' }}>Something went wrong! <br /><br /><button style={{ borderRadius: 10 + 'px', cursor: 'pointer', padding: 5 + 'px', border: 'none' }} onClick={() => setRefetchQuizzes(!refetchQuizzes)}>Retry</button></p>}</>
          : <SmallLoader />
      }

    </div>
  )
}

export default Quizes
