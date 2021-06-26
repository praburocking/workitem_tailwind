import React,{useEffect} from "react";
import Landing from "./components/landing";
import Home from "./components/home";
import LoginScreen from "./components/loginScreen"
import { RecoilRoot,useRecoilState } from "recoil";
import { verifyAndGetToken } from "./util/common_utils";
import { auth as authRepo } from "./store/atoms";
import {
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";

function App(props) {
  const [authData,setAuthData]=useRecoilState(authRepo);
  useEffect(()=>{
    const token=verifyAndGetToken();
    if(token)
    {
      setAuthData(token);
    }
  },[]);
  const userExist=()=>{
    if(authData && authData!=''){
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
