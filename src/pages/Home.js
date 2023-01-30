// import logo from "./logo.svg";
import "./Home.css";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const getUserInfo = async (access_token) => {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const userInfo = res.data;

      const userLoginResult = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          // variables/params for user sub and name, can make these proptypes so they can be used profile?
          params: {
            name: userInfo.given_name,
            sub: userInfo.sub,
          },
        }
      );

      const Data = {
        name: userInfo.given_name,
        sub: userInfo.sub,
      };
      navigate("/Profiles/profile_id", { state: Data });

      // const toProfile =()=> {navigate('/Profile',{params:{name:'userInfo.given_name',sub:'userInfo.sub'}});}

      // const toProfile =()=> {navigate('/Profile',{state:{name:userLoginResult.data}});}

      // userLoginResult.data.profile pass this to profile.js in order to render profile info on page

      console.log(res.data);
      console.log(userLoginResult); //pass down
      // navigate("/profiles/profile_id");
    } catch (err) {
      console.log(err);
    }
  };

  const googleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      getUserInfo(response.access_token);
    },
  });

  return (
    <div className="App">
      <header className="App-header"></header>
      <h3 className="welcomeHeader">WELCOME TO</h3>
      <h1 className="PushPinMapHeader">PUSH PIN MAP</h1>
      <h6 className="ExplinationHeader">
        WHERE TRAVELERS TRACK THEIR ADVENTURES!
      </h6>
      <button className="GoogleSignInButton" onClick={googleSignIn}>
        Sign In With Google
      </button>
      {/* <div onClick={() => {
          const Data = {
            name: userInfo.given_name,
            sub: userInfo.sub
          };
          navigate("/Profile", { state:Data});
        }}>Clickme
        </div> */}
    </div>
  );
}

export default Home;
