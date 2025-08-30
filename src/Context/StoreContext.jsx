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
          image:"<Atom/>"
        },
        {
          name:"Biology",
          image:"<Microscope/>"
        },
        {
          name:"History",
          image:"<Landmark/>"
        },
        {
          name:"Mathematics",
          image:"<Sigma/>"
        },
        {
          name:"Geography",
          image:"<Globe/>"
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

    // time formater
    function timeAgo(date) {
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
      const diff = (date - new Date()) / 1000; // seconds
      const divisions = [
        { amount: 60, name: "seconds" },
        { amount: 60, name: "minutes" },
        { amount: 24, name: "hours" },
        { amount: 7, name: "days" },
        { amount: 4.34524, name: "weeks" },
        { amount: 12, name: "months" },
        { amount: Number.POSITIVE_INFINITY, name: "years" },
      ];
    
      let duration = diff;
      for (let i = 0; i < divisions.length; i++) {
        if (Math.abs(duration) < divisions[i].amount) {
          return rtf.format(Math.round(duration), divisions[i].name);
        }
        duration /= divisions[i].amount;
      }
    }
    
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
        subjectsList,
        timeAgo
    }

    return(
        <StoreContext.Provider value={contextValue} >
         {props.children}
        </StoreContext.Provider>
     )
}

export default StoreContextProvider;