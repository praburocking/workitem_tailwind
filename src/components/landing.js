import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import Signin from "./signin";
import SignUp from "./signup";
import Slide from '@material-ui/core/Slide';

const Landing = (props) => {
  const [isLogin, setLogin] = useState(props.operation==="login");
  return (
    <div className="p-0 m-0 w-screen ">
      <Grid container className="p-0 m-0 ">
        <Grid
          item
          lg={8}
          md={6}
          xs={0}
          className="h-screen p-0 m-0 hidden md:flex bg-blue-500"
        >
          {/* <img src="https://cdn-japantimes.com/wp-content/uploads/2020/06/np_file_16250.jpeg" /> */}
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xs={12}
          className="h-screen p-0 m-0 rounded-3xl max-w-2xl "
        >
          <div className="bg-white-500 flex flex-col py-20 lg:px-15 px-5 bg-white-500 sm:px-20 justify-around content-start h-screen rounded-lg shadow-2xl">
            <div className="flex flex-row ">
              <img
                className="w-15 h-12"
                src="https://logos-world.net/wp-content/uploads/2020/04/Huawei-Logo.png"
              />
              <span className="pt-5 text-lg font-semibold tracking-widest">
                SEYALAN
              </span>
            </div>
            <div>{isLogin ? <Signin /> : <SignUp />}</div>
            <div className="mt-10">
              {isLogin ? " don't have account?" : "Already have Account ?"}
              <br />
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setLogin(!isLogin)}
              >
                {isLogin ? "SIGNUP" : "SIGNIN"}
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
