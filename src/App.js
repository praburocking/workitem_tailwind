import React,{useEffect} from "react";
import Landing from "./components/landing";
import Home from "./components/home";
import LoginScreen from "./components/loginScreen"
import { RecoilRoot,useRecoilState } from "recoil";
import { verifyAndGetToken,getCookie } from "./util/common_utils";
import { auth as authRepo } from "./store/atoms";
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

  useEffect(()=>{
    const token=verifyAndGetToken();
    const domain=getCookie("domain");
    console.log("process envv ",process.env)
    if(token)
    { 
      setAuthData(token);
      window.api_domain=process.env.REACT_APP_SERVER_PROTOCOL+"://"+domain+":"+process.env.REACT_APP_SERVER_PORT;
      if(!window.location.host.includes(domain)){
             window.location=process.env.REACT_APP_SERVER_PROTOCOL+"://"+domain+":"+process.env.REACT_APP_CLIENT_PORT;
      }
    }else{
      var host=window.location.host
      var parts=host.split(".");
      console.log("paerts ==>",parts)
      if(parts.length>=3){
        window.location=process.env.REACT_APP_SERVER_PROTOCOL+"://"+process.env.REACT_APP_SERVER_URL+":"+process.env.REACT_APP_CLIENT_PORT;
        setAuthData(token);
        }
    }
  },[]);
  const userExist=()=>{
    if(authData && authData!=''){
      // let host = window.location.host;
      // let protocol = window.location.protocol;
      // let parts = host.split(".");
      // let subdomain = "";
      // // If we get more than 3 parts, then we have a subdomain
      // // INFO: This could be 4, if you have a co.uk TLD or something like that.
      // if (parts.length >= 3) {
      //   subdomain = parts[0];
      //   // Remove the subdomain from the parts list
      //   parts.splice(0, 1);
      //   // Set the location to the new url
      //   window.location = protocol + "//" + parts.join(".") + "/" + subdomain;
      // }
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
