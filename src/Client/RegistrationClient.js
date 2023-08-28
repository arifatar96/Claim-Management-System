import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Grid,
  Container,
  Typography,
  Snackbar,
  Alert,
  TextField,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const ClientRegistration = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const schemeName = queryParams.get("schemeName");
  const schemeDescription = queryParams.get("schemeDescription");
  const premiumAmount = queryParams.get("premiumAmount");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMes, setAlertMes] = useState("");
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openWarningSnackbar, setOpenWarningSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // const schemeName = new URLSearchParams(location.search).get('schemeName');
  const [schemeDetails, setSchemeDetails] = useState(null);

  const email = sessionStorage.getItem("email");
  const clientName = sessionStorage.getItem("name");

  console.log(schemeName);

  // Fetch the scheme details when the component mounts
  useEffect(() => {
    // Make an API call to retrieve the scheme details based on the schemeName
    axios
      .get(`http://localhost:9091/schemeDetails/${schemeName}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setSchemeDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [schemeName]);

  const regDetails = (data) => {
    return axios
      .post("http://localhost:9093/addRegistration", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => response.data);
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const currentDate = new Date().toISOString().split("T")[0];

    const data = {
      email: email,
      schemeName: schemeName,
      premiumAmount: premiumAmount,
      registrationDate: currentDate,
      clientName: clientName,
      status: "pending",
    };

    regDetails(data)
      .then((resp) => {
        if (resp === "Success") {
          setAlertMessage(`Registered for ${data.schemeName} successfully`);
          setOpenSuccessSnackbar(true);
          setOpenErrorSnackbar(false); // Close the error snackbar if it's open
        } else if (resp === "Failed") {
          setAlertMessage(`Already Registered for ${data.schemeName}`);
          setOpenErrorSnackbar(true);
          setOpenSuccessSnackbar(false); // Close the success snackbar if it's open
        } else {
          alert(`Before Registering Add Your Personal Details`);

          // setAlertMessage(`Before Registering Add Personal Details`);
          // setOpenWarningSnackbar(true);
          // setOpenErrorSnackbar(false);
          // setOpenSuccessSnackbar(false);
          navigate("/client/profile");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        boxShadow={"5px 5px 10px grey"}
        sx={{
          margin: 8,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" mt={3}>
          Registration
        </Typography>

        <Box component="form" sx={{ m: 2, pl:4, pr:4 }}>
          {schemeDetails && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Client Name"
                  value={clientName}
                  variant="outlined"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Registration Date"
                  value={new Date().toISOString().split("T")[0]}
                  variant="outlined"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  label="Scheme Name"
                  value={schemeDetails.schemeName}
                  variant="outlined"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  label="Description"
                  value={schemeDetails.description}
                  variant="outlined"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  label="Coverage Type"
                  value={schemeDetails.coverageType}
                  variant="outlined"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  label="Premium Amount"
                  value={`₹ ${schemeDetails.premiumAmount}`}
                  variant="outlined"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          )}
          <Stack sx={{ display: "flex", alignItems: "center", mt: 3 }}>
            <Button
              sx={{ width: "35%" }}
              type="submit"
              startIcon={<HowToRegIcon />}
              variant="outlined"
              color="primary"
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Box>

      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSuccessSnackbar(false)} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenErrorSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openWarningSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenWarningSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenWarningSnackbar(false)} severity="warning">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ClientRegistration;
