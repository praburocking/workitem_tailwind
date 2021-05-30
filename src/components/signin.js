import React from "react";
import { TextField, Button } from "@material-ui/core";

const Signin = () => {
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
          />
          <br />
          <TextField
            id="standard-basic"
            label="password"
            variant="outlined"
            fullWidth
          />
          <br />
          <Button variant="contained" color="primary" size="large">
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Signin;
