import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ClientNavbar from "./ClientNavbar";
import ClaimSubmission from "./ClaimSubmission";
import ClaimTracking from "./ClaimTracking";
// import ClientRegistration from "./Registration";
import AskQuestion from "./AskQuestion";
import InsuranceSchemeList from "./SchemeList";
import QuestionHistory from "./QuestionHistory";
import AppliedSchemes from "./AppliedSchemes";
import RequestsContent from "./RequestContent";
import ClientDetails from "./ClientDetails";
import HomePage from "./HomePageClient";
import ClientChat from "./ClientChat";
import HomePost from "./HomePost";
import ClientRegistration from "./RegistrationClient";
import ChatPage from "./ChatPageForClient";
// import ChatPage from "./ChatPage";

export default function ClientDashboard() {
  return (
    <div>
      <ClientNavbar />
      <Routes>
      {/* <Route exact path="/" element={<HomePage />} /> */}
        <Route path="/profile" element={<ClientDetails />} />
        {/* <Route path="/" element={<AppliedSchemes />} /> */}
        <Route path="/" element={<HomePost />} />
        <Route path="/request-claim" element={<ClaimSubmission />} />
        <Route path="/claim-status" element={<ClaimTracking />} />
        {/* <Route path="/message" element={<ClientChat />} /> */}
        {/* <Route path="/message/:claim" element={<ChatPage />} /> */}
        <Route path="/message" element={<ChatPage />} />

        {/* <Route path="/message" element={<RequestsContent />} /> */}
        {/* <Route path='/message' element={<AskQuestion />} /> */}
        {/* <Route path="/registration" element={<ClientRegistration />} /> */}
        <Route path="/registration" element={<ClientRegistration />} />
        
        <Route path="/schemes" element={<InsuranceSchemeList />} />
        <Route path="/message-reply" element={<QuestionHistory />} />
      </Routes>
    </div>
  );
}
