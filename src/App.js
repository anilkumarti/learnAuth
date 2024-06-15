import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./store/auth-context";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const ctx = useContext(AuthContext);
  const isLoggedIn=ctx.isLoggedIn;

  
  const [isTokenExpired,setisTokenExpired]=useState(false)
  useEffect(()=> {
    
    const checkTokenExpiry=()=> {

      const loginTime=localStorage.getItem('loginTime');
      if(loginTime) {
        const tokenExpiryTime=5000;
        const currentTime=new Date().getTime();
        const timeElapsed=currentTime-parseInt(loginTime);
       if(timeElapsed > tokenExpiryTime)  
        {
          setisTokenExpired(true);
          ctx.logout();
        }
        else {
          setisTokenExpired(false);
        }
      }
    };

    checkTokenExpiry();
    const handleUserActivity=()=> {
      localStorage.setItem('loginTime',Date.now().toString());
      setisTokenExpired(false)
    }
    window.addEventListener('mousemove',handleUserActivity)
    window.addEventListener('keydown',handleUserActivity)
    const interval=setInterval(checkTokenExpiry,10000)
  return () => {
    window.removeEventListener('mousemove',handleUserActivity)
    window.removeEventListener('keydown',handleUserActivity)
  clearInterval(interval)
  } 
  },[])
    
  
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        { !isLoggedIn|| isTokenExpired} && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )
        {isLoggedIn || !isTokenExpired} && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
