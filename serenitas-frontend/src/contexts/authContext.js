import React, { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state with null
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there's a token in local storage
    const token = localStorage.getItem("token");

    if (token) {
      // If token exists, consider the user as logged in
      setIsLoggedIn(true);
      // Fetch user data or perform any necessary actions here
      // For now, let's just set the user state to a mock user
      setUser(user);
    }
  }, []); // Empty dependency array ensures this effect runs only once during component initialization

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        username,
        setUsername,
        password,
        setPassword,
        email,
        setEmail,
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
