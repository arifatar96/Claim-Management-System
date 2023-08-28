import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AdminDashboard from './Admin/AdminDashboard';
import UserDashboard from './System User/UserDashboard';
import ClientDashboard from './Client/ClientDashboard';
import HomeDashboard from './Home/HomeDashboard';

// function Router() {

//     const [roleName, setRoleName] = useState("");

//   // var RolenameFromSessionStorage= sessionStorage.getItem("name") || " ";

//     return (

//         <div>
//           <Router>
//         {(() => {
//           console.log("helloooo")
//           console.log(RolenameFromSessionStorage.length +"It is length")
//           if (RolenameFromSessionStorage.length<2) {
//             return(
//                 <Routes>
//                     <Route exact path="/*" element={<HomeDashboard />}></Route>
//                 </Routes>
//             )   }
//            else if (RolenameFromSessionStorage === "ADMIN") {
//             return (
//               <Routes>
//                 <Route path='admin/*' element={<AdminDashboard />} />
//                 {/* <Route path='admin/*' element={<AdminDashboard />} /> */}

//               </Routes>
//             );
//           }
//           else if (RolenameFromSessionStorage === "USER") {
//             return (
//               <Routes>
//                 <Route path='user/*' element={<UserDashboard />} />
//               </Routes>
//             )
//           }
//           else if (RolenameFromSessionStorage === "CLIENT") {
//             return (
//               <Routes>
//                 <Route path='/*' element={<ClientDashboard />} />

//               </Routes>
//             )
//           }
//           // else {
//           //   return (
//           //     <Routes>
//           //       <Route path='/*' element={<HomeDashboard />} />

//           //     </Routes>
//           //   )
//           // }
//         })()}
//       </Router>
//         </div>
//     );
// }


function Routing() {

  const roleName = sessionStorage.getItem("roleName");
  
  return (

    <div>

        {(() => {

          switch (roleName) {

            case "ADMIN":

              return <AdminDashboard />;

            case "USER":

              return <UserDashboard />;

            case "CLIENT":

              return <ClientDashboard />;

            default:

              return <HomeDashboard />;

          }

        })()}
    </div>

  );

}

export default Routing;



