import { useContext, useEffect, useState } from 'react'
import './ExplanationLister.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from "framer-motion";
import SmallLoader from '../../SmallLoaderSpin/SmallLoader'
import { StoreContext } from '../../../Context/StoreContext'
import { assets } from '../../../assets/assets';
import { Atom, Bookmark, BookmarkCheck, Save, SaveIcon, Landmark, Globe, Microscope, Globe2, LandmarkIcon, MicroscopeIcon, Sigma, Search, SearchXIcon, Filter, BookOpen, TestTube, ChartBar, Book, } from 'lucide-react';
import CheckImage from '../../Utilities/image checker/CheckImage';


const ExplanationLister = ({ apiName, filter }) => {

  // const {explanationsList,explanationsFetched,setExplanationsFetched} = useContext(StoreContext);
  const navigate = useNavigate();
  const [explanationsList, setExplanationsList] = useState({ loaded: false, content: [] });
  const [filteredExplanationsList, setFilteredExplanationsList] = useState({ content: [] })
  const [explanationsFetched, setExplanationsFetched] = useState({ loaded: false, success: false })


  const [refetchExplanations, setRefetchExplanations] = useState(false);
  const { url, userData, token, setShowLogin, subjectsList, setShowPopup } = useContext(StoreContext);
  const [subFilter, setSubFilter] = useState("All")
  const [searchKeyList, setSearchKeyList] = useState([]);

  const [filteredSearchList, setFilteredSearchList] = useState([]);
  const [itemSaved, setItemSaved] = useState(false);
  const [savedItems, setSavedItems] = useState([]);


  // fetching explanations list

  useEffect(() => {

    // if(!explanationsList.loaded){
    const fetchExplanationsList = async () => {

      setExplanationsFetched({ loaded: false })

     if(userData?.role === "superadmin"){
      try {
        
        const response = await axios.get(`${url}/api/explanations/all-explanations-list/admin`,{
          headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer "+token
          }
        });

        const filteredData = filter ? response.data.data.filter((lesson) => {
          let isMatch = true;
          for (const key in filter) {
            if (lesson[key] !== filter[key]) {
              isMatch = false;
              break;
            }
          }
          return isMatch;
        }) : response.data.data;

        setExplanationsList({ loaded: true, content: filteredData })
        setFilteredExplanationsList({ content: filteredData })

        filteredData.forEach((element) => {
          const searchKey1 = element.name.toLowerCase();
          const searchKey2 = element.description.toLowerCase();
          searchKeyList.push({ key: searchKey1, address: `/explain/${element.subject}/${element._id}` })
          searchKeyList.push({ key: searchKey2, address: `/explain/${element.subject}/${element._id}` })
        })

        setExplanationsFetched({ loaded: true, success: true })


      }
      catch (error) {
        console.log("Error", error)
        setExplanationsFetched({ loaded: true, success: false })
      }} 
      else{ 
        try {
        const response = await axios.get(url + apiName);

        const filteredData = filter ? response.data.data.filter((lesson) => {
          let isMatch = true;
          for (const key in filter) {
            if (lesson[key] !== filter[key]) {
              isMatch = false;
              break;
            }
          }
          return isMatch;
        }) : response.data.data;

        setExplanationsList({ loaded: true, content: filteredData })
        setFilteredExplanationsList({ content: filteredData })

        filteredData.forEach((element) => {
          const searchKey1 = element.name.toLowerCase();
          const searchKey2 = element.description.toLowerCase();
          searchKeyList.push({ key: searchKey1, address: `/explain/${element.subject}/${element._id}` })
          searchKeyList.push({ key: searchKey2, address: `/explain/${element.subject}/${element._id}` })
        })

        setExplanationsFetched({ loaded: true, success: true })


      } catch (error) {
        console.log("Error", error)
        setExplanationsFetched({ loaded: true, success: false })
      }}


    }

    fetchExplanationsList();
    // }
  }, [refetchExplanations])

  // fetching saved items
  useEffect(() => {
    //  fetching saved items from backend 
    const fetchSavedItems = async () => {

      try {
        const response = await axios.get(`${url}/api/user/get-saved-items`, {
          headers: { token: token }
        });
        setSavedItems(response.data.savedItems);
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


  // subject list
  const subjects_list = [
    {
      name: "Physics",
      icon: Atom
    },
    {
      name: "Biology",
      icon: Microscope
    },
    {
      name: "History",
      icon: Landmark
    },
    {
      name: "Mathematics",
      icon: Sigma
    },
    {
      name: "Geography",
      icon: Globe
    },
    {
      name: "Chemistry",
      icon: TestTube
    },
    {
      name: "Economics",
      icon: ChartBar
    },
    {
      name:"English",
      icon:BookOpen
    }
  ];

  // filter content by subject
  useEffect(() => {

    // setFilteredExplanationsList((prev) => ({ ...prev, content: explanationsList.content}));

    if (subFilter !== "All") {
      const filteredExplanations = explanationsList.content.filter((topic) => {
        return topic.subject.toLowerCase() === subFilter.toLowerCase();
      })
      setFilteredExplanationsList((prev) => ({ ...prev, content: filteredExplanations }));
    }
    else {
      setFilteredExplanationsList((prev) => ({ ...prev, content: explanationsList.content }));
    }

  }, [subFilter])

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
      <h1>
        <BookOpen color='var(--primary-color)' size={40} />
      </h1>
      <h1 className='header-title'>Explanations</h1>

      <div className="content-nav">
        <div className="content-filter">
          <p><Filter /> Filter Explanations</p>
        </div>
        <div className="content-search">
          <div className="search-bar">
            <input onChange={handleSearch} type="text" placeholder='search ...' />
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
          <div className="search-btn">
            {/* <img src={assets.search_icon} alt="" /> */}

            <Search />
          </div>
        </div>
      </div>


      <div className="subjects-list">
        {
          subjects_list.map(({ name, icon: Icon }, index) => (

            <div className='subject' key={index} onClick={() => subFilter !== name ? setSubFilter(name) : setSubFilter("All")}>
              <div className={subFilter === name ? "sub-image active" : "sub-image"}>
                <Icon />
              </div>
              <p>{name}</p>
            </div>
          ))
        }
      </div>

      <div className="content-list">
        {
          explanationsList.loaded ?
            <>{
              filteredExplanationsList.content.length != 0 ?

                filteredExplanationsList.content.map((topic, index) => {
                  return (
                    <motion.div
                      className="my-section"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      <div key={index} >
                      {
                  topic?.review !== "reviewed" ? <span style={{width:'100%', backgroundColor:'blue', color:'white',padding:'5px 10px'}}>{topic?.review}</span>
                   :null
                }
                        <div className="image" onClick={() => { token ? navigate(`/explain/${topic.subject}/${topic._id}`) : setShowLogin(true) }}>
                <div className="image" onClick={() => { token?navigate(`/quizzes/${topic.subject}/${topic._id}`):setShowLogin(true) }}>
                  <CheckImage imageUrl={topic.image} Icon={Book} title="Explanation Icon" />
                  
                 </div>
                        </div>
                        <div className="caption" >
                          <div className="txt-caption">
                            <h3>{topic.name}</h3>
                            <p>{topic.description}</p>
                          </div>


                          <div className="btns">

                            {
                              savedItems && savedItems.lessons ?
                                <button onClick={(e) => handleSaveExplanation(e, topic._id, topic.name, topic.subject)}>

                                  {savedItems.lessons.find((item) => item.itemAddress === `/explain/${topic.subject}/${topic._id}`) !== undefined ? <> <BookmarkCheck /> Saved </> : <> <Bookmark /> Save</>}
                                </button>
                                : <button onClick={() => setShowLogin(true)}> <Bookmark /> Save</button>
                            }



                            <button className='open-btn' onClick={() => { token ? navigate(`/explain/${topic.subject}/${topic._id}`) : setShowLogin(true) }}>open</button>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )
                })

                : <div style={{ width: 'max(70vw,250px)', margin: 'auto', textAlign: 'center', padding: '20px', backgroundColor: 'whitesmoke', borderRadius: 10 + 'px' }}>
                  <h2 style={{ textAlign: 'center', padding: '20px' }}> <SearchXIcon />  <br /> Content is not available! </h2>
                </div> // for no content available in the search

            } </>
            : null
        }


      </div>

      {
        explanationsFetched.loaded ? <>
          {explanationsFetched.success ? null
            : <p onClick={() => setRefetchExplanations(!refetchExplanations)} style={{ color: 'red', textAlign: 'center' }}>Something went wrong! <br /><br /><button style={{ borderRadius: 10 + 'px', cursor: 'pointer', padding: 5 + 'px', border: 'none' }} onClick={() => setRefetchExplanations(!refetchExplanations)}>Retry</button></p>}</>
          : <SmallLoader />
      }


    </div>
  )
}

export default ExplanationLister
