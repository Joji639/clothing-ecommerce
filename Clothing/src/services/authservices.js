import api from "../api/axios"; 


export const login = async (email, password) => {
  try {
    const res = await api.post("user/login/", {
      email,
      password,
    });

    const data = res.data;


    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);


    localStorage.setItem("email", data.email);
    localStorage.setItem("name", data.name);

    if (data.role) {
      localStorage.setItem("role", data.role);
    } else {
      console.warn(" Role not provided by backend");
    }
    return data;

  } catch (error) {
    throw error.response?.data || error;
  }
};



export const signup = async (payload) => {
  try {
    const res = await api.post("user/signup/", payload);
    return res.data;

  } catch (error) {
    throw error.response?.data || error;
  }
};



export const logout = async () => {
  try {
    const refresh = localStorage.getItem("refresh");

    if (refresh) {
      await api.post("user/logout/", {
        refresh,
      });
    }

  } catch (error) {
    console.log("Logout error:", error.response?.data);
  } finally {
  
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
  }
};