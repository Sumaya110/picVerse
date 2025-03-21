"use client";

import { createContext, useState, useEffect } from "react";
import {
  loginUser,
  logoutUser,
  registerUser,
  fetchProfile,
} from "@/services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const userData = await loginUser(email, password);
      if (!userData.token)
        throw new Error("Invalid login response. No token received.");

      localStorage.setItem("token", userData.token);

      const userProfile = await fetchProfile(userData.token);
      if (!userProfile) throw new Error("Failed to fetch user profile.");

      setUser(userProfile);
      localStorage.setItem("user", JSON.stringify(userProfile));
      const storedUser = localStorage.getItem("user");

      return userProfile;
    } catch (error) {
      console.error("Login failed:", error.message);
      return null;
    }
  };

  const register = async (username, email, password) => {
    return await registerUser(username, email, password);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
