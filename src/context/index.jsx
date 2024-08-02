/* eslint-disable react/prop-types */
import { createContext, useState, useMemo } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginData = {
    userName: "jonh doe",
    password: "jonhdoe",
  };

  const login = (data) => {
    if (
      data.username === loginData.userName &&
      data.password === loginData.password
    ) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
