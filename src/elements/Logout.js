import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const removeToken = (event) => {
    localStorage.removeItem('token');
  };
  
  useEffect(() => {
    removeToken();
  }, []);

  return (
    <div>
      <Navigate to='/' />
    </div>
  )
}