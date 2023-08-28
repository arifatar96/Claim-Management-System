function Routing() {
    // var roleName = "ADMIN"

  // var roleName = "USER"

  // var roleName = "CLIENT"

  var roleName = ""


  return (

    <div>
      {/* <RomeChangeRequests/> */}
      {/* <RequestsContent/> */}
      <Router>
        {(() => {
          if (roleName === "ADMIN") {
            return (
              <Routes>
                <Route path='/*' element={<AdminDashboard />} />
                {/* <Route path='admin/*' element={<AdminDashboard />} /> */}

              </Routes>
            );
          }
          else if (roleName === "USER") {
            return (
              <Routes>
                <Route path='/*' element={<UserDashboard />} />
              </Routes>
            )
          }
          else if (roleName === "CLIENT") {
            return (
              <Routes>
                <Route path='/*' element={<ClientDashboard />} />

              </Routes>
            )
          }
          else {
            return (
              <Routes>
                <Route path='/*' element={<HomeDashboard />} />

              </Routes>
            )
          }
        })()}
      </Router>
    </div>


  );
}

export default Routing;