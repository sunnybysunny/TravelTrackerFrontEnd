// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

// import AddPin from "./components/AddPin";
// import GoogleMap from "./components/GoogleMap";
// import MainPage from "./components/Settings";
// import PinInfo from "./components/PinInfo";
// import Settings from "/components/Settings";

function App() {
  const testBackendRequest = async () => {
    const indexPage = await axios.get("http://localhost:5000");
    debugger;
  };

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

      const userLoginResult = await axios.get("http://localhost:5000/login", {
        params: {
          name: userInfo.given_name,
          sub: userInfo.sub,
        },
      });

      console.log(res.data);
      console.log(userLoginResult);
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
    </div>
  );
}

export default App;
