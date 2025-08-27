import { useContext, useEffect, useState } from 'react'
import './ExplanationLister.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from "framer-motion";
import SmallLoader from '../../SmallLoaderSpin/SmallLoader'
import { StoreContext } from '../../../Context/StoreContext'
import { assets } from '../../../assets/assets';


const ExplanationLister = ({apiName}) => {

  // const {explanationsList,explanationsFetched,setExplanationsFetched} = useContext(StoreContext);
  const navigate = useNavigate();
  const [ explanationsList,setExplanationsList] = useState({loaded:false,content:[]});
  const [filteredExplanationsList,setFilteredExplanationsList] = useState({content:[]})
  const [explanationsFetched,setExplanationsFetched] = useState({loaded:false,success:false})
  const [refetchExplanations,setRefetchExplanations] = useState(false);
  const {url,token,setShowLogin,subjectsList} = useContext(StoreContext);
  const [subFilter,setSubFilter] = useState("All")
  const [searchKeyList,setSearchKeyList] = useState([]);
  const [filteredSearchList,setFilteredSearchList] = useState([]);


  // fetching explanations list

  useEffect(()=>{

    

    // if(!explanationsList.loaded){
    const fetchExplanationsList = async ()=>{

      setExplanationsFetched({loaded:false})

        try {
            const response = await axios.get(url+apiName);
            setExplanationsList({loaded:true,content:response.data.data})
            setFilteredExplanationsList({content:response.data.data})
         
            response.data.data.forEach((element)=>{
              const searchKey1 = element.name.toLowerCase();
              const searchKey2 = element.description.toLowerCase();
              searchKeyList.push({key:searchKey1,address:`/explain/${element.subject}/${element._id}`})
              searchKeyList.push({key:searchKey2,address:`/explain/${element.subject}/${element._id}`})
            })

            setExplanationsFetched({loaded:true,success:true})
            
      
        } catch (error) {
            console.log("Error",error)

            setExplanationsFetched({loaded:true,success:false})
      
        }
       
            
    }
    
    fetchExplanationsList();
    // }
},[refetchExplanations])



  const subjects_list = subjectsList;

  // filter content by subject
  useEffect(()=>{

    // setFilteredExplanationsList((prev) => ({ ...prev, content: explanationsList.content}));
   
    if(subFilter!=="All"){
      const filteredExplanations = explanationsList.content.filter((topic) => {
      return topic.subject === subFilter;
    })
    setFilteredExplanationsList((prev) => ({ ...prev, content: filteredExplanations }));
    }
    else{
      setFilteredExplanationsList((prev) => ({ ...prev, content: explanationsList.content}));
    }
    
  },[subFilter])

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

  return (
    <div className='explanation-container content-container'>
      <h1 className='header-title'>Explanations</h1>
      <div className="content-nav">
        <div className="content-filter">
          <p>Filter Explanations</p>
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
              <div className='subject' key={index} onClick={()=>subFilter!==subject.name?setSubFilter(subject.name):setSubFilter("All")}>
          <div className={subFilter===subject.name?"sub-image active":"sub-image"}><img src={subject.image} alt="" /></div>
          <p>{subject.name}</p>
        </div>
            )
          })
        }
        
      </div>
      <div className="content-list">
        {
          explanationsList.loaded?
          filteredExplanationsList.content.map((topic,index)=>{
            return (
              <motion.div
      className="my-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
              <div key={index} >
                <div className="image" onClick={()=>{token? navigate(`/explain/${topic.subject}/${topic._id}`) :setShowLogin(true)}}>
                  <img src={topic.image} alt="" />
                </div>
                <div className="caption" >
                  <h3>{topic.name}</h3>
                  <p>{topic.description}</p>
                  <div className="btns">
                    <button onClick={()=>alert("saved")}><img src={assets.save_icon} alt="save" />save</button>
                    <button className='open-btn' onClick={()=>{token? navigate(`/explain/${topic.subject}/${topic._id}`) :setShowLogin(true)}}>open</button>
                  </div>
                </div>
                
              </div>
              </motion.div>
            )
          })
          : null
        }
        
        
      </div>
          {
            explanationsFetched.loaded?<>{explanationsFetched.success?null:<p onClick={()=>setRefetchExplanations(!refetchExplanations)} style={{color:'red', textAlign:'center'}}>Something went wrong! <br /><br /><button style={{borderRadius:10 + 'px',cursor:'pointer',padding:5+'px' ,border:'none'}} onClick={()=>setRefetchExplanations(!refetchExplanations)}>Retry</button></p>}</>
            :<SmallLoader/>
          }
         
        
    </div>
  )
}

export default ExplanationLister
