import React, { useEffect, useState } from "react";
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
import UpdateIcon from "@mui/icons-material/Update";

const initialState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  address: "",
  phoneNo: "",
  pincode: "",
  pancardNo: "",
  aadharNo: "",
};

const clientDetails = () => {
  return axios
    .get("http://localhost:9093/allClients")
    .then((response) => response.data);
};

const ClientDetails = () => {
  // State to hold the form input values
  const [editableData, setEditableData] = useState({ ...initialState });
  const [data, setData] = React.useState({ ...initialState });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [fetchedData, setFetchedData] = useState(initialState);

  const email = sessionStorage.getItem("email");
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");

  const onChange = (e) => {
    setEditableData({ ...editableData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    clientDetails()
      .then((resp) => {
        const clients = resp.filter((client) => client.email === email);
        console.log(clients);

        const fData = {
          email: clients[0].email,
          firstName: clients[0].firstName,
          lastName: clients[0].lastName,
          dateOfBirth: clients[0].dateOfBirth.split("T")[0],
          address: clients[0].address,
          phoneNo: clients[0].phoneNo,
          pincode: clients[0].pincode,
          pancardNo: clients[0].pancardNo,
          aadharNo: clients[0].aadharNo,
        };

        console.log(fData);

        setFetchedData(fData);
        setEditableData(fData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addClientDetails = (data) => {
    return axios
      .post("http://localhost:9093/addClient", data, {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (fetchedData === initialState) {
    console.log(editableData);
    const data = {
      ...editableData,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    console.log(data);
    addClientDetails(data) // Use editableData for submission
      .then((resp) => {
        setAlertMessage(`${firstName} details updated successfully`);
        setOpenSnackbar(true);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isFormValid = () => {
    // const isEmailValid = isEmailValid(email);
    const isPANValid = isPANCardValid(editableData.pancardNo);
    const isAadharValid = isAadhaarCardValid(editableData.aadharNo);

    return (
      editableData.dateOfBirth !== "" &&
      editableData.phoneNo !== "" &&
      editableData.address !== "" &&
      editableData.pincode !== "" &&
      editableData.pancardNo !== "" &&
      editableData.aadharNo !== "" &&
      isPANValid &&
      isAadharValid
    );
  };

  const isPANCardValid = (value) => {
    const panCardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panCardRegex.test(value);
  };

  const isAadhaarCardValid = (value) => {
    const aadhaarCardRegex = /^\d{4}\s\d{4}\s\d{4}$/;
    return aadhaarCardRegex.test(value);
  };

  const formatAadharNumber = (value) => {
    // Remove any non-digit characters from the input
    const cleanedValue = value.replace(/\D/g, '');

    // Format the cleaned value in "xxxx xxxx xxxx" format
    const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');

    return formattedValue;
  };

  const handleAadharNumberChange = (event) => {
    const { value } = event.target;
    const formattedAadharNumber = formatAadharNumber(value);
    setEditableData({ ...editableData, aadharNo: formattedAadharNumber });
  };

   // Function to handle validation and set max date for date picker
   const handleDateChange = (event) => {
    // setDateField(event.target.value);

    const { name, value } = event.target;

    // Limit the date picker to past dates
    // const currentDate = new Date().toISOString().split('T')[0];
    if (name === 'dateOfBirth' && value > currentDate) {
      setEditableData({ ...editableData, dateOfBirth: currentDate });
    } else {
      setEditableData({ ...editableData, [name]: value });
    }
  };

  const currentDate = new Date().toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).split('/').reverse().join('-');

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
          Personal Details
        </Typography>

        <Box component="form" sx={{ m: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={onChange}
                required
                fullWidth
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={onChange}
                required
                fullWidth
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={email} // Use fetchedData for display
                required
                onChange={onChange}
                fullWidth
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                // type="tel"
                label="Phone"
                name="phoneNo"
                value={editableData.phoneNo}
                onChange={onChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={editableData.dateOfBirth}
                onChange={handleDateChange}
                required
                fullWidth
                inputProps={{ max: currentDate }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={editableData.address}
                onChange={onChange}
                required
                fullWidth
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                // type="number"
                label="Pincode"
                name="pincode"
                value={editableData.pincode}
                onChange={onChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Pancard Number"
                name="pancardNo"
                value={editableData.pancardNo}
                onChange={onChange}
                required
                fullWidth
                inputProps={{
                    maxLength: 10, // Limit the input to 10 characters
                  }}
                error={
                  editableData.pancardNo !== "" &&
                  !isPANCardValid(editableData.pancardNo)
                }
                helperText={
                  editableData.pancardNo !== "" &&
                  !isPANCardValid(editableData.pancardNo)
                    ? "Invalid Pancard Number"
                    : ""
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Aadhar Number"
                name="aadharNo"
                value={editableData.aadharNo}
                onChange={handleAadharNumberChange}
                required
                fullWidth
                inputProps={{
                    maxLength: 14, // Limit the input to 14 characters (including spaces)
                  }}
                error={
                  editableData.aadharNo !== "" &&
                  !isAadhaarCardValid(editableData.aadharNo)
                }
                helperText={
                  editableData.aadharNo !== "" &&
                  !isAadhaarCardValid(editableData.aadharNo)
                    ? "Invalid Aadhar Number"
                    : ""
                }
              />
            </Grid>
          </Grid>

          <Stack
            sx={{ mt: 3, mb: 2 }}
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              startIcon={<RestartAltIcon />}
              onClick={() => setData(initialState)}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              startIcon={<UpdateIcon />}
              disabled={!isFormValid()}
              onClick={handleSubmit}
            >
              Update
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

export default ClientDetails;
