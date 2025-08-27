import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { assets } from "../assets/assets";
import useLearningTimer from "../hooks/useLearningTimer";

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {
     
    const url = import.meta.env.VITE_API_URL ;
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [userData,setUserData] = useState(localStorage.getItem("userData") !== "undefined" ? JSON.parse(localStorage.getItem("userData")): null )
    const [ quizzesList,setQuizzesList] = useState([]);
    const [quizzesFetched,setQuizzesFetched] = useState({loaded:false,success:false})
    const [refetchQuizzes,setRefetchQuizzes] = useState(false)
    const [showLogin,setShowLogin] = useState(false)
    const [showPopup,setShowPopup] = useState({show:false,response:"",title:""})

    const subjectsList = [
        {
          name:"Physics",
          image:assets.physics_icon
        },
        {
          name:"Biology",
          image:assets.biology_icon
        },
        {
          name:"History",
          image:assets.history_icon1
        },
        {
          name:"Mathematics",
          image:assets.maths_icon
        },
        {
          name:"Geography",
          image:assets.geography_icon
        }
      ]

    useEffect(()=>{

        const fetchQuizzesList = async ()=>{

            setQuizzesFetched({loaded:false})
            try {
                const response = await axios.get(`${url}/api/quizzes`);
                setQuizzesList(response.data.data)
                setQuizzesFetched({loaded:true,success:true})
           

            } catch (error) {
                console.log("Error",error)

                setQuizzesFetched({loaded:true,success:false})
           
            }
           
                
        }
        fetchQuizzesList();
    },[refetchQuizzes])

    // useLearningTimer(userData?.userId, url, token);

    
    const contextValue = {
        url,
        token,
        setToken,
        userData,
        setUserData,
        quizzesList,
        quizzesFetched,
        refetchQuizzes,
        setRefetchQuizzes,
        showLogin,
        setShowLogin,
        showPopup,
        setShowPopup,
        subjectsList
    }

    return(
        <StoreContext.Provider value={contextValue} >
         {props.children}
        </StoreContext.Provider>
     )
}

export default StoreContextProvider;