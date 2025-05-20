import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";  

const Logout = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);  
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      if (!isLoggedIn) {
        console.warn("⚠️ User is already logged out. Redirecting...");
        navigate("/");  // Redirect without making API call
        return;
      }

      try {
        await axios.post("/logout/", {},
          //  { withCredentials: true }
          );
        logout(); // Update auth state
        console.log("✅ Logout successful");
      } catch (error) {
        console.error("❌ Logout failed:", error.response?.data || error.message);
      }

      navigate("/");  // Redirect to home after logout attempt
    };

    handleLogout();  
  }, []);  // ✅ No dependencies to avoid extra re-renders

  return null; // No UI needed for logout page
};

export default Logout;
