import "./Home.css";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import {useLocation} from 'react-router-dom';

const Profile = (props) => {

  const location = useLocation(); 

  return <h1> HII {location.state}</h1>;
  // make sure to put these componenets in order of how you want them to render on the page
  // example below shows how to add them
  // return <GoogleMap />;
};

export default Profile;
