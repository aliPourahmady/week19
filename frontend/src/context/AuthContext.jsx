import { createContext, useState, useContext } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });

  const setAuth = (authUser) => {
    if (authUser) {
      setUser({ token: authUser.token });
      localStorage.setItem("token", authUser.token);
    } else {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// Custom hook for accessing the AuthContext
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
