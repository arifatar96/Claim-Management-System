import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Stack,
  Grid,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ClaimSettlement = ({ existingClaim, handleRejectClaim }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const claimAmount = existingClaim.claimAmount;

  const settlementAmount = claimAmount;

  const premiumAmount = existingClaim.premiumAmount - settlementAmount;

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];

    const settlement = {
      email: existingClaim.email,
      clientName: existingClaim.clientName,
      schemeName: existingClaim.schemeName,
      premiumAmount: premiumAmount,
      claimAmount: existingClaim.claimAmount,
      settlementDate: currentDate,
      settlementAmount: settlementAmount,
    };

    const data = {
      ...existingClaim,
      premiumAmount: premiumAmount,
      claimSettle: "Success",
    };

    //  const regData = {
    //   ...registration,
    //   premiumAmount: premiumAmount,
    // };

    settlementDetails(settlement)
      .then((resp) => {
        setAlertMessage(
          `${existingClaim.clientName} Claim Settled Successfully`
        );
        setOpenSnackbar(true);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });

    updateClaim(data)
      .then((resp) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

    // updateReg(regData)
    //   .then((resp) => {
    //     window.location.reload();
    //     console.log(resp);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  // const handleRejectClaim = (claim) => {
  //   const data = {
  //     ...claim,
  //     claimStatus: "rejected",
  //     claimSettle: "Failed",
  //   };

  //   updateClaim(data)
  //     .then((resp) => {
  //       window.location.reload();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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

  //  const updateReg = (data) => {
  //   return axios
  //     .put("http://localhost:9093/updateRegistration", data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     })
  //     .then((response) => response.data);
  // };

  const settlementDetails = (settlement) => {
    return axios
      .post("http://localhost:9093/addSettlementClaim", settlement, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => response.data);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
        <Typography component="h1" variant="h5" mt={3}>
          Claim Settlement
        </Typography>

        <Box component="form" sx={{ m: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Scheme Name"
                value={existingClaim.schemeName}
                fullWidth
                autoFocus
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Claim Date"
                value={existingClaim.claimDate.split("T")[0]}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Client Name"
                value={existingClaim.clientName}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Client Email"
                value={existingClaim.email}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Balance Amount"
                value={`₹ ${existingClaim.premiumAmount}`}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Claim Amount"
                value={`₹ ${existingClaim.claimAmount}`}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <TextField
                label="Settlement Amount"
                value={`₹ ${settlementAmount}`}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <TextField
                label="Approved By"
                value={existingClaim.adminEmail}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Admin Comment"
                value={
                  existingClaim.adminUpdate === null
                    ? "No Comment"
                    : existingClaim.adminUpdate
                }
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            </Grid>
          </Grid>
          <Stack
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2, mb: 2 }}
          >
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              onClick={handleSubmit}
              endIcon={<ArrowForwardIcon />}
              disabled={
                existingClaim.premiumAmount < existingClaim.claimAmount
              }
            >
              Process
            </Button>

            <Button
              variant="outlined"
              startIcon={<ThumbDownAltOutlinedIcon />}
              color="error"
              onClick={() => handleRejectClaim(existingClaim)}
            >
              Reject
            </Button>
          </Stack>
        </Box>
      </Box>

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

export default ClaimSettlement;
