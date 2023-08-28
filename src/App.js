import './App.css';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AdminDashboard from './Admin/AdminDashboard';
import UserDashboard from './System User/UserDashboard';
import ClientDashboard from './Client/ClientDashboard';
import HomeDashboard from './Home/HomeDashboard';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/*' element={<HomeDashboard />} />
          <Route path='/admin/*' element={<AdminDashboard />} />
          {/* <Route path='admin/*' element={<AdminDashboard />} /> */}
          <Route path='/user/*' element={<UserDashboard />} />
          <Route path='/client/*' element={<ClientDashboard />} />
          {/* <Route path='/route/*' element={<Routing />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

