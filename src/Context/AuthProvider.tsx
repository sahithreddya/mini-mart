import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext<{
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}>({ token: "", setToken: () => {}, logout: () => {} });

const AuthProvider = ({ children }: any) => {
  // State to hold the authentication token
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      logout,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
