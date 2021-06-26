import React,{useState} from "react";
import { TextField, Button } from "@material-ui/core";
import {user as userRepo,auth as authRepo} from "../store/atoms"
import { useRecoilState, useRecoilValue } from "recoil";
import {login} from '../services/connectToServer'
import {setTokenCookie} from '../util/common_utils'
import {
  useHistory
} from "react-router-dom";

const Signin = () => {
  const [userData,setUserData]=useRecoilState(userRepo);
  const [authData,setAthuData]=useRecoilState(authRepo);
  let history = useHistory();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const Handlelogin=async (email,password)=>{
    const reqObj={"email":email,"password":password};
    const response =await login(reqObj);
    if(response.status===200){
      setUserData(response.data.user)
      setTokenCookie(response.data.authtoken);
      setAthuData(response.data.authtoken);
      history.push("/home");

    }
    else{
      //exception handle
    }
  }

  return (
    <>
      <div className="pt-5 text-lg tracking-widest text-3xl">
        <span className="font-bold "> Login </span>to Contine
      </div>

      <div className="w-100 h-250 mt-10">
        <div className="flex flex-col h-100">
          <TextField
            id="standard-basic"
            fullWidth
            label="email"
            variant="outlined"
            value={email}
            onChange={(event)=>setEmail(event.target.value)}
          />
          <br />
          <TextField
            id="standard-basic"
            label="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
          />
          <br />
          <Button variant="contained" color="primary" size="large" onClick={()=>Handlelogin(email,password)}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Signin;
