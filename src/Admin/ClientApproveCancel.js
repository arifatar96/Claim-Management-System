import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Table,
  Container,
  Typography,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import axios from "axios";

const RegDetails = () => {
  return axios
    .get("http://localhost:9093/allRegs")
    .then((response) => response.data);
};

const ClientFormsApproveCancel = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [clientDetails, setClientDetails] = useState({});
  const status = "pending";
  const adminEmail = sessionStorage.getItem("email");

  useEffect(() => {
    RegDetails()
      .then((resp) => {
        const pendingRegs = resp.filter((reg) => reg.status === "pending");
        console.log(pendingRegs);
        setPendingRegistrations(pendingRegs);
        // console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateReg = (data) => {
    return axios
      .put("http://localhost:9093/updateRegistration", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => response.data);
  };

  const handleApproveRegistration = (registration) => {
    const data = {
      ...registration,
      status: "approved",
      adminEmail: adminEmail,
    };

    updateReg(data)
      .then((resp) => {
        window.location.reload();
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelRegistration = (registration) => {
    const data = {
      ...registration,
      status: "rejected",
      adminEmail: adminEmail,
    };

    updateReg(data)
      .then((resp) => {
        window.location.reload();
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h2" variant="h5" mt={6} mb={3} align="center">
        Client Forms Approve/Cancel
      </Typography>
      {pendingRegistrations.length === 0 ? (
        <Typography variant="body1" align="center">
          No Cient Registration Request Found.
        </Typography>
      ) : (
        <Paper sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Client Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Client Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Scheme Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Premium Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Registration Date
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  colSpan={2}
                  align="center"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingRegistrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell>
                    {/* {clientDetails[registration.email]?.firstName}{" "}
                  {clientDetails[registration.email]?.lastName} */}
                    {registration.clientName}
                  </TableCell>
                  <TableCell>{registration.email}</TableCell>
                  <TableCell>{registration.schemeName}</TableCell>
                  <TableCell>₹ {registration.premiumAmount}</TableCell>
                  <TableCell>
                    {registration.registrationDate.split("T")[0]}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={<VerifiedUserOutlinedIcon />}
                      color="primary"
                      onClick={() => handleApproveRegistration(registration)}
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      startIcon={<ThumbDownAltOutlinedIcon />}
                      color="error"
                      onClick={() => handleCancelRegistration(registration)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default ClientFormsApproveCancel;
