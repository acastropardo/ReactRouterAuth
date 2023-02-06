import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import client from "../feathers";
import { useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [error, setError] = useState();
  
  const navigate = useNavigate();

  const login = async (data) =>{
    let email = data.email;
    let password = data.password;

    await client
      .authenticate({
        strategy: "local",
        email,
        password,
      })
      .then((response) => {
        //console.log("respuesta" +JSON.stringify(response)); 
        setUser(response); 
        navigate("/dashboard/clientes", { replace: true });})
      .catch((err) => {setError(err); console.log("error autenticacion "+err)});
      
  }

  // const login = async (data) => {

  // };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
