import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import InsuranceSchemeManagement from "./SchemeManagement";
import InsuranceSchemeList from "./ShowInsuranceSchemes";
import ClientFormsApproveCancel from "./ClientApproveCancel";
import ModifyScheme from "./ModifyScheme";
import AdminQueryPage from "./AdminQueryPage";
import ClaimDetailsManagement from "./ClaimView";
import Home from "../Home/HomePage";
import SignIn from "../Login/Login1";
import ClaimManage from "./ClaimApproveReject";
import AdminHome from "./CardAdmin";
import HomePage from "./HomePageAdmin";
import HomePost from "./HomePost";
import ChatApp from "./ChatRoom";
import ChatPage from "./ChatPage";

export default function AdminDashboard() {
  return (
    <div>
      <AdminNavbar />
      <Routes>
        <Route path="/" element={<HomePost />} />
        {/* <Route path="/" element={<AdminHome />} /> */}

        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/add-scheme" element={<InsuranceSchemeManagement />} />
        <Route path="/scheme-list" element={<InsuranceSchemeList />} />
        <Route path="/client-forms" element={<ClientFormsApproveCancel />} />
        <Route path="/claim-requests" element={<ClaimManage />} />
        {/* <Route path="/claim-requests" element={<ChatPage />} /> */}
        {/* <Route path="/client-querries" element={<AdminQueryPage />} /> */}
        {/* <Route path="/client-querries" element={<ChatApp />} /> */}
        <Route path="/client-querries" element={<ChatPage />} />


        {/* <Route path='/login' element={<SignIn/>}/> */}
      </Routes>
    </div>
  );
}
