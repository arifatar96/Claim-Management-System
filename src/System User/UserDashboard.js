import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import ClaimDetailsManagement from "./ClaimDetailsManagement";
import ClaimSettlement from "./ClaimSettlement";
import ClaimSettlementRecords from "./TransactionRecords";
import RomeChangeRequests from "./RomeChange";
import ClaimManage from "./ClaimApproveReject";
import ClaimSettle from "./ClaimSettlementList";
import HomePage from "./HomePageUser";
import HomePost from "./HomePost";

export default function UserDashboard() {
  return (
    <div>
      <UserNavbar />
      <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/" element={<HomePost />} />

        {/* <Route path='/claim-requests' element={<ClaimDetailsManagement/>} /> */}
        <Route path="/claim-requests" element={<ClaimManage />} />
        <Route path="/claim-settlement" element={<ClaimSettle />} />
        {/* <Route path='/claim-settlement' element={<ClaimSettlement/>} /> */}
        {/* <Route path='/records' element={<ClaimSettlementRecords/>} /> */}
        <Route path="/records" element={<RomeChangeRequests />} />
      </Routes>
    </div>
  );
}
