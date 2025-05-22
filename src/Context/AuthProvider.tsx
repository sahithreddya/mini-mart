import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext<{
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}>({ token: "", setToken: () => {}, logout: () => {} });

const AuthProvider = ({ children }: any) => {
  // State to hold the authentication token
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  console.log("token exists?: ", token);

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
