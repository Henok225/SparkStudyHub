import { createContext, useEffect, useState } from "react";

export const ethioCurContext = createContext(null)
const ethioCurContextProvider = (props) => {

    // This context can be used to manage the state and functions related to the Ethiopian Curriculum
    // For example, you can add state variables for selected grade, resources, etc.
    const [selectedGrade, setSelectedGrade] = useState(0); // State to manage selected grade

    const contextValue = {
        selectedGrade, 
        setSelectedGrade 
       
    }
    return (
        <ethioCurContext.Provider value={contextValue}>
            {props.children}
        </ethioCurContext.Provider>
    )
}
export default ethioCurContextProvider;

  