import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import axios from "axios";
import ClaimView from "./ClaimView";

const claimDetails = () => {
  return axios
    .get("http://localhost:9093/allClaims")
    .then((response) => response.data);
};

const RegDetails = () => {
  return axios
    .get(`http://localhost:9093/allRegs`)
    .then((response) => response.data);
};

const ClaimManage = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const claimStatus = "pending";
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    claimDetails()
      .then((resp) => {
        const pendingClaims = resp.filter(
          (claim) => claim.claimStatus === "pending"
        );
        console.log(pendingClaims);
        setClaims(pendingClaims);
        // const approvedClaims = resp.filter(
        //   (claim) =>
        //     claim.claimStatus === "approved" &&
        //     claim.adminEmail !== null &&
        //     claim.userEmail === null
        // );
        // console.log(approvedClaims);
        // setClaims(approvedClaims);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleViewClaim = (id) => {
    const claimToView = claims.find((claim) => claim.id === id);
    console.log(claimToView);
    setSelectedClaim(claimToView);
    console.log(selectedClaim);
    setShowEditForm(true);
  };

  const updateClaim = (data) => {
    return axios
      .put("http://localhost:9093/updateClaim", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => response.data);
  };

  const handleApproveClaim = (claim, updateDescription) => {
    console.log(updateDescription);
    const data = {
      ...claim,
      claimStatus: "approved",
      userUpdate: updateDescription,
      userEmail: email,
    };

    updateClaim(data)
      .then((resp) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRejectClaim = (claim, updateDescription) => {
    const data = {
      ...claim,
      claimStatus: "rejected",
      userUpdate: updateDescription,
      userEmail: email,
    };

    updateClaim(data)
      .then((resp) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h2" variant="h5" mt={6} mb={3} align="center">
        Claim Requests
      </Typography>
      {claims.length === 0 ? (
        <Typography variant="body1" align="center">
          No Claim Request Found.
        </Typography>
         ) : (
      <Paper elevation={3} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Scheme Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Claim Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Client Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Balance Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Claim Amount
              </TableCell>
              {/* <TableCell>Admin Update</TableCell> */}

              <TableCell sx={{ fontWeight: "bold" }} colSpan={3} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell>{claim.schemeName}</TableCell>
                <TableCell>{claim.claimDate.split("T")[0]}</TableCell>
                <TableCell>{claim.clientName}</TableCell>
                <TableCell>₹ {claim.premiumAmount}</TableCell>
                <TableCell>₹ {claim.claimAmount}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleViewClaim(claim.id)}
                    startIcon={<EditIcon />}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    startIcon={<VerifiedUserOutlinedIcon />}
                    color="primary"
                    disabled={
                      claim.premiumAmount < claim.claimAmount
                    }
                    onClick={() => handleApproveClaim(claim)}
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    startIcon={<ThumbDownAltOutlinedIcon />}
                    color="error"
                    onClick={() => handleRejectClaim(claim)}
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
      {showEditForm && selectedClaim && (
        <ClaimView
          existingClaim={selectedClaim}
          handleApproveClaim={handleApproveClaim}
          handleRejectClaim={handleRejectClaim}
        />
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ClaimManage;
