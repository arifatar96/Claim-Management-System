import React from "react";
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
import axios from "axios";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
// import { useNavigate } from 'react-router-dom';

const InsuranceSchemeManagement = () => {
  // const navigate = useNavigate();

  const [schemeName, setSchemeName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [coverageType, setCoverageType] = React.useState("");
  const [premiumAmount, setPremiumAmount] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const scheme = {
      schemeName: schemeName,
      description: description,
      coverageType: coverageType,
      premiumAmount: premiumAmount,
    };

    schemeDetails(scheme)
      .then((resp) => {
        if (resp === "Success") {
          setAlertMessage(`${schemeName} details added successfully`);
          setOpenSnackbar(true);
          console.log(resp);
        } else {
          alert("Scheme Already Exist");
        }
        // navigate('/'); // Navigate to the desired page after adding the scheme
      })
      .catch((error) => {
        console.log(error);
      });

    // Reset the form fields after submission
    setSchemeName("");
    setDescription("");
    setCoverageType("");
    setPremiumAmount("");
  };

  const schemeDetails = (scheme) => {
    return axios
      .post("http://localhost:9091/addScheme", scheme, {
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

  const resetFormFields = () => {
    setSchemeName("");
    setDescription("");
    setCoverageType("");
    setPremiumAmount("");
  };

  return (
    <Container component="main" maxWidth="sm">
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
          Add Insurance Scheme
        </Typography>

        <Box component="form" sx={{ m: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Scheme Name"
                value={schemeName}
                onChange={(e) => setSchemeName(e.target.value)}
                required
                fullWidth
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Coverage Type"
                value={coverageType}
                onChange={(e) => setCoverageType(e.target.value)}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Premium Amount"
                type="number"
                value={premiumAmount}
                onChange={(e) => setPremiumAmount(e.target.value)}
                required
                fullWidth
              />
            </Grid>
          </Grid>

          <Stack
            spacing={2}
            direction="row"
            sx={{ mt: 2, mb: 2 }}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              startIcon={<RestartAltIcon />}
              onClick={resetFormFields}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              startIcon={<AddCircleIcon />}
            >
              Add Scheme
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

export default InsuranceSchemeManagement;
