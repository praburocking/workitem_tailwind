import React from "react";
import { TextField, Button } from "@material-ui/core";

const SignUp = () => {
  return (
    <>
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
          <Button variant="contained" color="primary" size="large">
            Create Account
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
