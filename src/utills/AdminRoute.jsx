import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

const AdminRoute = ({ children }) => {
  const {userData, token, setShowLogin} = useContext(StoreContext)

  if (!userData || !token) {
    setShowLogin(true)
    return <Navigate to="/" replace />;
    
  }
  else if ( userData.role !== 'admin' && userData.role !== 'superadmin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
