import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Login function
  const login = (email, password) => {
    if (email && password) {
      // yaha tum backend/Firebase call kar sakte ho
      // abhi dummy login
      setUser({ email });
    } else {
      alert("Please enter email and password");
    }
  };

  // 🔹 Register function
  const register = (email, password) => {
    if (email && password) {
      // yaha tum backend/Firebase call kar sakte ho
      setUser({ email });
    } else {
      alert("Please fill all fields");
    }
  };

  // 🔹 Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
