import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState("");
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        username,
        setUsername,
        projects,
        setProjects,
        tasks,
        setTasks,
        userId,
        setUserId,
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
