import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import Home from "./HomePage";
// import SignIn from "../Login/Login1";
import SignIn from "../Login/Login2";
import ClientRegistration from "../Client/Registration";
import Login from "../Login/Login";
import SignUp from "../Login/SignUp";
import HomePost from "./HomePost";

export default function HomeDashboard() {
  return (
    <div>
      <HomeNavbar />
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/" element={<HomePost />} />

        <Route path="/login" element={<SignIn />} />
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path='/registeration' element={<ClientRegistration />} /> */}
      </Routes>
    </div>
  );
}
