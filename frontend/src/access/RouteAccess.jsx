import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// const { isLoggedIn } = useContext(AuthContext);

export const RestrictedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? <Navigate to="/" /> : children;
};


// export const PrivateRoute = ({ children }) => {
//     const { isLoggedIn } = useContext(AuthContext);

//     return isLoggedIn ?  children : <Navigate to="/login" /> ;
//     // return isLoggedIn ?  (<Navigate to="/chef-profile" />) : <Navigate to="/login" /> ;

// };

export const PrivateRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, user } = useContext(AuthContext);

  if (isLoggedIn == null) return <div>Loading...</div>; 
``
if (!isLoggedIn || !user?.role || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
}

  return children;
};