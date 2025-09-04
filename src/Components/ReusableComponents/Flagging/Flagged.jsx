import { Flag } from "lucide-react"


 const Flagged = ({title})=>{

    return(
     <div style={{width:'100%',
     position:'relative',
     bottom:'22px',
     right:'22px',
     margin:0 ,display:'flex', justifyContent:'start'}}>
       <div
      style={{width:'fit-content', 
        color:'white',
         backgroundColor:'var(--button-color)',
          padding:'10px', fontSize:'0.7rem',display:'flex',
          alignItems:'center',
          borderRadius:'3px',
          borderTopLeftRadius:'10px'
        }}
       className="flag-sign">
       <Flag size={18}/> <span>{title}</span>
      </div>
     </div>
    )
  }

  export default Flagged