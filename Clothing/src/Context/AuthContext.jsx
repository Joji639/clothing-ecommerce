import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
//   const[loading,SetLoading]=useState(true)


  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  }
  SetLoading(false)
}, []);


  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success("logged in")
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    toast.error("logged out")
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout,loading}}>
      {children}
    </AuthContext.Provider>
  );
};

 const useAuth = () => {
  return useContext(AuthContext);
};
export default  useAuth