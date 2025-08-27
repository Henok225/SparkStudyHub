import { Route, Routes, useLocation } from 'react-router-dom'
import EthioCurHome from '../EthioCurHome'
import GradeSection from '../EthioCurGrade/SelectedGradesection/GradeSection'

const EthioCurRoutes = ()=>{

    return(
        <>
        <Routes>

       
        <Route path='/ethiopian-curriculum' element={<EthioCurHome/>} />
        <Route path='/ethiopian-curriculum/grade/:id' element={<GradeSection/>} />
        </Routes>
        </>
    )
}

export default EthioCurRoutes;