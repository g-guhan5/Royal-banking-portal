import React, { createContext, useContext, useState } from "react";
import { mockUserProfile } from "../data/mockData";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("royal_bank_session");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email) => {
    const sessionData = {
      ...mockUserProfile,
      email: email,
      loginTimestamp: new Date().toISOString()
    };
    setUser(sessionData);
    localStorage.setItem("royal_bank_session", JSON.stringify(sessionData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("royal_bank_session");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
