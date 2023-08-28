import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
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
        } else if(resp === "Failed"){
          setAlertMessage(`Registered for ${data.schemeName} Failed`);
          setOpenErrorSnackbar(true);
          setOpenSuccessSnackbar(false); // Close the success snackbar if it's open
        }
        else{
          setAlertMessage(`Before Registering Add Personal Details`);
          setOpenErrorSnackbar(true);
          setOpenSuccessSnackbar(false);
          navigate('/client/profile')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        boxShadow={"5px 5px 10px grey"}
        sx={{
          margin: 8,
          pb:2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" mt={3}>
          Registration
        </Typography>

        <Box component="form" sx={{ m: 2,}}>
          {schemeDetails && (
            <List disablePadding>
              <ListItem
                sx={{ py: 1, px: 0, display: "flex", alignItems: "center" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", width: 180 }}
                >
                  Scheme Name:
                </Typography>
                <Typography variant="h6">{schemeDetails.schemeName}</Typography>
              </ListItem>
              <ListItem
                sx={{ py: 1, px: 0, display: "flex", alignItems: "center" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", width: 180 }}
                >
                  Description:
                </Typography>
                <Typography variant="body1">
                  {schemeDetails.description}
                </Typography>
              </ListItem>
              <ListItem
                sx={{ py: 1, px: 0, display: "flex", alignItems: "center" }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", width: 180 }}
                >
                  Coverage Type:
                </Typography>
                <Typography variant="body2">
                  {schemeDetails.coverageType}
                </Typography>
              </ListItem>
              <ListItem
                sx={{ py: 1, px: 0, display: "flex", alignItems: "center" }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", width: 180 }}
                >
                  Premium Amount:
                </Typography>
                <Typography variant="body2">
                  ₹ {schemeDetails.premiumAmount}
                </Typography>
              </ListItem>
            </List>
          )}
          </Box>

          <Button
            // sx={{ mt: 2, ml: 8 }}
            type="submit"
            startIcon={<HowToRegIcon />}
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            Register
          </Button>
        
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
    </Container>
  );
};

export default ClientRegistration;
