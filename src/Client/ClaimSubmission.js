import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Stack,
  Grid,
  Container,
  Typography,
  Select,
  FormLabel,
  MenuItem,
  Snackbar,
  Alert,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const regDetails = () => {
  return axios
    .get("http://localhost:9093/allRegs")
    .then((response) => response.data);
};

const ClaimSubmission = () => {
  // State to hold the form input values
  const [claimAmount, setClaimAmount] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [supportingDocs, setSupportingDocs] = React.useState("");
  const [schemeName, setSchemeName] = React.useState("");
  const [registrations, setRegistrations] = useState([]);
  const status = "approved";
  const email = sessionStorage.getItem("email");
  const clientName = sessionStorage.getItem("name");
  const claimStatus = "pending";
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // const [imageData, setImageBytes] = React.useState(null);
  const [imageField, setImageField] = React.useState("");
  const [base64Image, setBase64Image] = React.useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    regDetails()
      .then((resp) => {
        const approvedRegistrations = resp.filter(
          (registration) =>
            registration.status === "approved" && registration.email === email && registration.premiumAmount > 0
        );
        console.log(approvedRegistrations);
        setRegistrations(approvedRegistrations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setIsFormReady(Boolean(schemeName)  && Number(claimAmount) > 0);
  }, [schemeName, claimAmount]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  const claim = {
    email: "",
    clientName: "",
    schemeName: "",
    claimAmount: "",
    reason: "",
    claimDate: "",
    claimStatus: "",
    supportingDocs: "",
    premiumAmount: "",
    fileName: "",
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log("Inside Submit");
    const currentDate = new Date().toISOString().split("T")[0];

    claim.email = email;
    claim.clientName = clientName;
    claim.schemeName = schemeName;
    claim.claimAmount = claimAmount;
    claim.reason = reason;
    claim.claimDate = currentDate;
    claim.claimStatus = claimStatus;
    claim.supportingDocs = base64Image;
    claim.fileName = imageField;
    claim.premiumAmount = premiumAmount;

    // console.log(claim);

    axios
      .post("http://localhost:9093/addClaim", claim)
      .then((response) => {
        console.log(response.data);
        alert(`Requested for ${schemeName} claim successfully`);
        // setAlertMessage(`Claimed for ${schemeName} successfully`);
        // setOpenSnackbar(true);
      })
      .catch((error) => {
        console.error(error);
      });

    // Reset the form fields after submission
    // window.location.reload(true);

    setSchemeName("")
    setClaimAmount("");
    setReason("");
    setImageField(""); 
    setBase64Image(""); 
    setPremiumAmount("");
  };

  const handleimageField = (event) => {
    const selectedImage = event.target.files[0];

    // const file = event.target.files[0];
    //     setSelectedFile(file);

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageBytes = new Uint8Array(e.target.result);
        // console.log(imageBytes);
        // setImageBytes(imageBytes);
        const base64Image = arrayBufferToBase64(imageBytes);
        console.log("Base64 encoded image:", base64Image);
        // setImageField(selectedImage.name);
        setBase64Image(base64Image);
        setImageField(selectedImage.name);
        // console.log(base64Image);

        claim.fileName = selectedImage.name;
      };
      reader.readAsArrayBuffer(selectedImage);
    }
  };

  const resetForm = () => {
    setSchemeName(""); // Reset schemeName
    setClaimAmount(""); // Reset claimAmount
    setReason(""); // Reset reason
    setImageField(""); // Reset imageField
    setBase64Image(""); // Reset base64Image
    setPremiumAmount(""); // Reset premiumAmount
    // Reset other fields as needed
  };

  const isClaimAmountValid = Number(claimAmount) <= Number(premiumAmount);

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
          Apply For Claim
        </Typography>

        <Box component="form" sx={{ m: 3, pl: 6, pr: 6 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="helper-label">Scheme Name</InputLabel>
                <Select
                  label="Scheme Name"
                  onChange={(e) => {
                    const selectedScheme = e.target.value;
                    setSchemeName(selectedScheme);
                    const selectedSchemeDetails = registrations.find(
                      (registration) =>
                        registration.schemeName === selectedScheme
                    );
                    setPremiumAmount(
                      selectedSchemeDetails
                        ? selectedSchemeDetails.premiumAmount
                        : 0
                    );
                  }}
                  // onChange={(e) => setSchemeName(e.target.value)}
                  value={schemeName}
                  autoFocus
                  required
                >
                  <MenuItem value="">
                    <em>Select Scheme</em>
                  </MenuItem>
                  {registrations.map((registration) => (
                    <MenuItem
                      key={registration.schemeName}
                      value={registration.schemeName}
                    >
                      {registration.schemeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Balance Amount"
                type="number"
                inputProps={{ max: 100 }}
                value={premiumAmount}
                // onChange={(e) => setClaimAmount(e.target.value)}
                required
                aria-readonly
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                name="claimAmount"
                label="Claim Amount"
                type="number"
                inputProps={{ max: 100 }}
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                required
                error={isClaimAmountValid ? false : true}
                helperText={
                  isClaimAmountValid
                    ? ""
                    : "Claim amount should be less than premium amount"
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Reason for Claim"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                fullWidth
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                name="imageField"
                helperText="Supporting Documents"
                type="file"
                accept=".png,.jpeg,.jpg, .pdf"
                value={imageField.name} // Show the selected file's name
                onChange={handleimageField}
                inputProps={{ accept: ".png,.jpeg,.jpg, .pdf" }}
              />
            </Grid>
          </Grid>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              type="reset"
              variant="outlined"
              startIcon={<RestartAltIcon />}
              color="secondary"
              sx={{ mt: 2, mb: 2, mr: 4 }}
              onClick={resetForm}
            >
              Reset
            </Button>
            <Button
              // type="submit"
              variant="outlined"
              color="primary"
              endIcon={<SendIcon />}
              onClick={handleSubmit}
              disabled={!isFormReady || !isClaimAmountValid} // Disable the button when form is not ready
            >
              Submit
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

export default ClaimSubmission;
