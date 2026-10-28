import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./authContext";



export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
  );

  const queryClient = useQueryClient();

  function saveToken(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    queryClient.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: Boolean(token),
        saveToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}