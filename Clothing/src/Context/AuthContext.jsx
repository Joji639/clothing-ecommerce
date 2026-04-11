import { createContext, useState, useEffect, useContext } from "react";
import { login as loginService, logout as logoutService } from "../services/authservices/"
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);

      setUser({
        email: data.email,
        name: data.name,
        role: data.role, 
      });

    } catch (err) {
      toast.error(err?.non_field_errors?.[0] || "Login failed");
      throw err;
    }
  };


  const logout = async () => {
    await logoutService();
    setUser(null);
    toast.success("Logged out");
  };


  useEffect(() => {
    try {
      const token = localStorage.getItem("access");

      if (!token) {
        setLoading(false);
        return;
      }

      const email = localStorage.getItem("email");
      const name = localStorage.getItem("name");
      const role = localStorage.getItem("role");

      if (email && name  && role) {
        setUser({
          email,
          name,
          role, 
        });
      }

    } catch (error) {
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}