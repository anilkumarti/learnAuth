import react, { createContext, useState } from "react";
const AuthContext = createContext({
  token: "",
  isLoggedIn: (token) => {},
  isLoggedOut: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const userIsLoggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
  };
  const logoutHandler = () => {
    setToken(null);
  };

  const AuthValue= {
   token: token,
   isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }
  return <AuthContext.Provider value={AuthValue}> {props.children} { console.log("authvalue" ,AuthValue)} </AuthContext.Provider>;
};
export default AuthContext;