import React, { useContext, useEffect, useState } from 'react'
import './QuizzesLister.css'
// import { assets } from '../../../assets/assets'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Atom, Bookmark, BookmarkCheck, BookOpen, FileQuestion, FileQuestionMark, Globe, Landmark, Microscope, Search, SearchXIcon, Sigma } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { StoreContext } from '../../../../Context/StoreContext';
import SmallLoader from '../../../SmallLoaderSpin/SmallLoader';
import CheckImage from '../../../Utilities/image checker/CheckImage';


const QuizzesLister = ({apiName, filter}) => {

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
  const [imageLoaded, setImageLoaded] = useState(true);

 
// fetching quizzes list
useEffect(()=>{

  const fetchQuizzesList = async ()=>{

      setQuizzesFetched({loaded:false})
    if(userData?.role === "superadmin"){
      try {
        const response = await axios.get(`${url}/api/quizzes/all-quizzes-list/admin`,{
          headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer "+token
          }
        });
        // console.log("Quizzes list:",response.data.data)
        const filteredData = filter ? response.data.data.filter((quiz) => {
          let isMatch = true;
          for (const key in filter) {
            if (quiz[key] !== filter[key]) {
              isMatch = false;
              break;
            }
          }
          return isMatch;
        }) : response.data.data;

        setQuizzesList(filteredData)
        setFilteredQuizList({content:filteredData})
       
        setQuizzesFetched({loaded:true,success:true})
   
        filteredData.forEach((element)=>{
          const searchKey1 = element.title;
          const searchKey2 = element.description;
          setSearchKeyList((prev) => ([...prev,{key:searchKey1,address:`/quizzes/${element.subject}/${element._id}`},
            {key:searchKey2,address:`/quizzes/${element.subject}/${element._id}`}]))
          })

    } catch (error) {
        console.log("Error",error)

        setQuizzesFetched({loaded:true,success:false})
   
    }
    }else{
      try {
        const response = await axios.get(`${url}/${apiName}`);
        // console.log("Quizzes list:",response.data.data)
        const filteredData = filter ? response.data.data.filter((quiz) => {
          let isMatch = true;
          for (const key in filter) {
            if (quiz[key] !== filter[key]) {
              isMatch = false;
              break;
            }
          }
          return isMatch;
        }) : response.data.data;

        setQuizzesList(filteredData)
        setFilteredQuizList({content:filteredData})
       
        setQuizzesFetched({loaded:true,success:true})
   
        filteredData.forEach((element)=>{
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
          // console.log("Saved items fetched", response.data.savedItems)
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
      return topic.subject.toLowerCase() === subFilter.toLowerCase(); 
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
    },
    {
      name:"English",
      icon:BookOpen
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
      <h1>
        <FileQuestion color='var(--primary-color)' size={40} />
        </h1>
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
                {
                  topic?.review !== "reviewed" ? <span style={{width:'100%', backgroundColor:'blue', color:'white',padding:'5px 10px'}}>{topic?.review}</span>
                   :null
                }
                <div className="image" onClick={() => { token?navigate(`/quizzes/${topic.subject}/${topic._id}`):setShowLogin(true) }}>
                  <CheckImage imageUrl={topic.image} Icon={FileQuestionMark} title="Quiz Icon" />
                 
                 </div>
                <div className="caption" >
                 <div className="txt-caption">
                 <h3>{topic.title}</h3>
                 <p>{topic.description}</p>
                 </div>
                 
                  <div className="btns">
                      
                    {
                      savedItems && savedItems.quizzes ?
                      <button onClick={(e)=>handleSaveQuiz(e, topic._id,topic.title, topic.subject)}>
                    
                    {savedItems.quizzes.find((item) => item.itemAddress === `/quizzes/${topic.subject}/${topic._id}` ) !== undefined  ? <> <BookmarkCheck/> Saved </> : <> <Bookmark/> Save</> }
                    </button>
                     :<button onClick={()=>setShowLogin(true)}> <Bookmark /> Save</button>
                    } 
                    
                    <button className='open-btn' onClick={() => { token?navigate(`/quizzes/${topic.subject}/${topic._id}`):setShowLogin(true) }}>open</button>
                  </div>
                </div>
                
              </div>
              </motion.div>
            )
          })
          
          : <div style={{width:'max(70vw,250px)', margin:'auto', textAlign:'center', padding:'20px', backgroundColor:'whitesmoke', borderRadius:10+'px'}}> 
             <h2 style={{textAlign:'center', padding:'20px'}}> <SearchXIcon/>  <br /> Content is not available! </h2> 
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

export default QuizzesLister
