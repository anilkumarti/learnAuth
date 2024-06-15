import react, { createContext, useState } from "react";
const AuthContext = createContext({
  token: "",
  isLoggedIn: (token) => {},
  isLoggedOut: () => {},
});

export const AuthContextProvider = (props) => {
  const intialToken=localStorage.getItem('token');
  const [token, setToken] = useState(intialToken);
  const userIsLoggedIn = !!token;
  const loginHandler = (token) => {
    const loginTime=new Date().getTime();
    localStorage.setItem('loginTimeStamp',loginTime)
    setToken(token);
    localStorage.setItem('token',token)
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token')
  };

  const AuthValue= {
   token: token,
   isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }
  return <AuthContext.Provider value={AuthValue}> {props.children}  </AuthContext.Provider>;
};
export default AuthContext;