import "./Home.css";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();

  const data = location.state;
  console.log(data);

  return (
    <h1>
      HII {data.name} {data.sub}
    </h1>
  );

  //   import { useLocation } from 'react-router-dom';
  // const Profile = () =>{
  // const location = useLocation();
  // //the data here will be an object since an object was
  // const data = location.state;
  // console.log(data);
  // <p>data.name</p>
  // <p>data.phoneNumber</p>
  // }
  // make sure to put these componenets in order of how you want them to render on the page
  // example below shows how to add them
  // return <GoogleMap />;
};

export default Profile;
