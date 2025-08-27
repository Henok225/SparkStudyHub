// NotFoundPage.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useLearningTimer from "../../hooks/useLearningTimer";
import { StoreContext } from "../../Context/StoreContext";

export default function NotFoundPage({userId}) {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // navigate to your home route
  };
  const {url, token, userData} = useContext(StoreContext);
  
  // const {stopTimer} = useLearningTimer(userId, url, token) || {};

    // Stop the learning timer when navigating here 
    // React.useEffect(() => {
    //   stopTimer && stopTimer();
    // }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "20px" }}>404 😢</h1>
      <h2 style={{ marginBottom: "20px" }}>Page Not Found</h2>
      <p style={{ marginBottom: "30px", color: "#555" }}>
        Oops! Looks like you took a wrong turn.
      </p>
      <button
        onClick={goHome}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go Back Home 🏠
      </button>
    </div>
  );
}
