import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState("");
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [projectName, setProjectName] = useState("");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        projects,
        setProjects,
        status,
        setStatus,
        userId,
        setUserId,
        projectName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contextValue = useContext(AuthContext);
  return contextValue;
};
