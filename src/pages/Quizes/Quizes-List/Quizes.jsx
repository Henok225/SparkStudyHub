import React, { useContext, useEffect, useState } from 'react'
import './Quizes.css'
import { assets } from '../../../assets/assets'
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../../Context/StoreContext';
import SmallLoader from '../../../Components/SmallLoaderSpin/SmallLoader';
import axios from 'axios';
import { Atom, Bookmark, BookmarkCheck, Globe, Landmark, Microscope, Search, Sigma } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import QuizzesLister from '../../../Components/ContentTemplates/ExplanationsLister/QuizzesLister/QuizzesLister';


const Quizes = () => {


  return (
    <QuizzesLister apiName="api/quizzes" />
  )
}

export default Quizes
