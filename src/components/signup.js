import React,{useState} from "react";
import { TextField, Button } from "@material-ui/core";
import {test as testRepo} from "../store/atoms"
import { useRecoilState, useRecoilValue } from "recoil";


const SignUp = () => {
  const [isOrgPage,setOrgPage] =useState(false);
  const [test,setTest]=useRecoilState(testRepo);
  return (
    <>
      {!isOrgPage && <>
      <div className="pt-5 text-lg tracking-widest text-3xl">
        Create Account
      </div>

      <div className="w-100 h-250 mt-10">
        <div className="flex flex-col h-100">
          <TextField
            id="standard-basic"
            label="Name"
            variant="outlined"
            fullWidth
            value={test}
            onChange={(event)=>setTest(event.target.value)}
          />
          <br />
          <TextField id="email" fullWidth label="Email" variant="outlined" />
          <br />
          <TextField
            id="password"
            label="password"
            variant="outlined"
            fullWidth
          />
          <br />
          <Button variant="contained" color="primary" size="large" onClick={()=>setOrgPage(true)}>
            Create Account
          </Button>
        </div>
      </div>
      </>
      }
      {isOrgPage && <>
        <div className="pt-5 text-lg tracking-widest text-3xl">
        Org Details
      </div>

      <div className="w-100 h-250 mt-10">
        <div className="flex flex-col h-100">
        
          <TextField id="Org Name" fullWidth label="Org Name" variant="outlined" />
          <br />
          <TextField
            id="standard-basic"
            label="domain"
            variant="outlined"
            fullWidth
          />
          <br />
          <Button variant="contained" color="primary" size="large" onClick={()=>setOrgPage(true)}>
            Create Account
          </Button>
        </div>
      </div>

      </>}
    </>
  );
};

export default SignUp;
