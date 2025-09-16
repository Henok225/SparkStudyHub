import React, { useEffect } from 'react';

/**
 * A component that protects routes requiring authentication.
 * If the user is not authenticated, it triggers a login popup.
 *
 * @param {object} props The component props.
 * @param {string | null} props.token The user's authentication token.
 * @param {function} props.setShowLogin A state setter function to show the login popup.
 * @param {React.ReactNode} props.children The child components to render if authenticated.
 * @returns {React.ReactNode | null} The child components or null if not authenticated.
 */
const ProtectedRoute = ({ token, setShowLogin, children }) => {
  // Use useEffect to prevent an infinite re-render loop
  // by only calling setShowLogin when the token changes.
  useEffect(() => {
    // If there is no token, trigger the login popup.
    if (!token) {
      setShowLogin(true);
    }
  }, [token, setShowLogin]); // Dependencies to re-run the effect when token or setShowLogin change.

  // Only render the child components if the user is authenticated.
  // Otherwise, return null to prevent the protected content from rendering.
  if (token) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
