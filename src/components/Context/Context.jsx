import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ token, setToken }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
//  share على الابلكيشن كله بنجيب token علشان نشوف الشخص عنده email ولا لا 
// AuthContextProvider component to provide authentication context to its children components
// It uses React's Context API to create a context for authentication
// It manages the authentication token state and provides it to child components
// It retrieves the token from local storage when the component mounts
