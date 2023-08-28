import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Stack,
  Grid,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

const claimDetails = () => {
  return axios
    .get("http://localhost:9093/allClaims")
    .then((response) => response.data);
};

const ClaimDetailsManagement = () => {
  // Sample data to demonstrate the claim details management
  // const claim = {
  //   claimDate: "2023-07-25",
  //   description: "Claim for medical expenses",
  //   clientName: "John Doe",
  //   policyNumber: "PL123456",
  // };

  // State to hold the form input values
  const [updateDescription, setUpdateDescription] = React.useState("");
  const [claims, setClaims] = useState([]);

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to the server)
    // Reset the form fields after submission
    // setUpdateDescription("");
  };

  useEffect(() => {
    claimDetails()
      .then((resp) => {
        const approvedClaims = resp.filter(
          (claim) => claim.claimStatus === "approved"
        );
        console.log(approvedClaims);
        setClaims(approvedClaims);
        // console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Box
        boxShadow={"5px 5px 10px grey"}
        sx={{
          margin: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5" mt={3}>
          Claim Details
        </Typography>

        {claims.map((claim) => (
          <div key={claim.id}>
            <p>
              <strong>Scheme Name:</strong> {claim.schemeName},{" "}
              <strong>Claim Date:</strong> {claim.claimDate.split("T")[0]}
            </p>
            <p>
              <strong>Client Name:</strong> {claim.email},{" "}
              <strong>Reason:</strong> {claim.reason}
            </p>
            <p>
              <strong>Claim Amount:</strong> ₹ {claim.claimAmount},{" "}
              <strong>Supporting Document:</strong> {claim.supportngDocs}
            </p>
          </div>
        ))}

        <Box component="form" sx={{ m: 3 }}>
          <Grid container spacing={2}>
            <TextField
              autoFocus
              label="Update Description"
              value={updateDescription}
              onChange={(e) => setUpdateDescription(e.target.value)}
              required
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2, mb: 2 }}
          >
            <Button
              variant="outlined"
              startIcon={<VerifiedUserOutlinedIcon />}
              color="primary"
              // onClick={() => handleApproveClaim()}
            >
              Approve
            </Button>

            <Button
              variant="outlined"
              startIcon={<ThumbDownAltOutlinedIcon />}
              color="error"
              // onClick={() => handleRejectClaim()}
            >
              Reject
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default ClaimDetailsManagement;
