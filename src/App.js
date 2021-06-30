import React,{useEffect} from "react";
import Landing from "./components/landing";
import Home from "./components/home";
import LoginScreen from "./components/loginScreen"
import { RecoilRoot,useRecoilState,useRecoilValue } from "recoil";
import { verifyAndGetToken,getCookie,deleteToken,deleteCookie } from "./util/common_utils";
import { auth as authRepo } from "./store/atoms";
import {getUser} from './services/connectToServer'
//import { useRecoilState, useRecoilValue } from "recoil";
import {
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
require('dotenv').config()



function App(props) {
  const [authData,setAuthData]=useRecoilState(authRepo);
  const names = useRecoilValue(authRepo);

  useEffect(()=>{
    const getUsers=async ()=>{
      const domain=getCookie("domain");
      if(domain){
          window.api_domain=process.env.REACT_APP_SERVER_PROTOCOL+"://"+domain+":"+process.env.REACT_APP_SERVER_PORT;
          const response=await getUser();
          console.log("user response ==>",response)
          if(response.status===200){
            const token=getCookie("token");
            setAuthData(token);
            if(!window.location.host.includes(domain)){
                  window.location=process.env.REACT_APP_SERVER_PROTOCOL+"://"+domain+":"+process.env.REACT_APP_CLIENT_PORT;
            }
          }else
          {
            deleteToken();
            deleteCookie('domain');
            window.api_domain=process.env.REACT_APP_SERVER_PROTOCOL+"://"+process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT;
            var host=window.location.host
            var parts=host.split(".");
            console.log("paerts ==>",parts)
            if(parts.length>=3){
              window.location=process.env.REACT_APP_SERVER_PROTOCOL+"://"+process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_CLIENT_PORT;
              }
            return false;
          }
      }
      else{
        deleteToken();
        deleteCookie('domain');
        window.api_domain=process.env.REACT_APP_SERVER_PROTOCOL+"://"+process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_SERVER_PORT;
        var host=window.location.host
        var parts=host.split(".");
        console.log("paerts ==>",parts)
        if(parts.length>=3){
          window.location=process.env.REACT_APP_SERVER_PROTOCOL+"://"+process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_CLIENT_PORT;
          }
        return false;
      }
    }
   
    console.log("process envv ",process.env)
    getUsers();
  },[]);
  const userExist=()=>{
    console.log("names ",names);
    console.log("authData ",authData);
    if(names && names!=''){
      return true;
    }else{
      return false;
    }
  }

  return(
  <RecoilRoot>
  <Switch location={props.location}>
    <Route exact path ="/" render={()=>userExist()?<Redirect to="/home"/>:<Landing operation="login"/>} ></Route>
    <Route exact path ="/login" render={()=>userExist()?<Redirect to="/home"/>:<Landing operation="login"/>} ></Route>
    <Route exact path ="/signup" render={()=>userExist()?<Redirect to="/home"/>:<Landing operation="signup"/>} ></Route>
    <Route exact path ="/home" render={()=>userExist()?<Home/>:<Redirect to="/login"/>} ></Route>
    {/* <Route exact path ="/faq" render={()=><Faq/>} ></Route> */}
   
    {/* <Route  render={()=><Redirect to="/pagenotfound"/>} ></Route> */}
    </Switch>
    </RecoilRoot>)
}

export default (withRouter(App));
