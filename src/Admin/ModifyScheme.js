import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ModifyScheme = ({
  existingScheme,
  handleUpdateScheme,
  handleDeleteScheme,
}) => {
  const [schemeName, setSchemeName] = useState(existingScheme.schemeName);
  const [description, setDescription] = useState(existingScheme.description);
  const [coverageType, setCoverageType] = useState(existingScheme.coverageType);
  const [premiumAmount, setPremiumAmount] = useState(
    existingScheme.premiumAmount
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleUpdate = () => {
    const updateDetails = {
      schemeName,
      description,
      coverageType,
      premiumAmount,
    };
    axios
      .put("http://localhost:9091/updateScheme", updateDetails, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        setAlertMessage(`${schemeName} details updated successfully`);
        setOpenSnackbar(true);
        console.log(resp);
        handleUpdateScheme(updateDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    const deleteDetails = {
      schemeName,
      description,
      coverageType,
      premiumAmount,
    };

    axios
      .delete("http://localhost:9091/deleteScheme", {
        data: deleteDetails,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((resp) => {
        setAlertMessage(`${schemeName} details deleted successfully`);
        setOpenSnackbar(true);
        console.log(resp);
        handleDeleteScheme(schemeName);
      })
      .catch((error) => {
        console.log(error);
      });
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
          Edit Insurance Scheme
        </Typography>

        <Box component="form" sx={{ m: 3 }} onSubmit={handleUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Scheme Name"
                value={schemeName}
                onChange={(e) => setSchemeName(e.target.value)}
                fullWidth
                InputProps={{ readOnly: true }}
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
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2, mb: 2 }}
          >
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete Scheme
            </Button>
            <Button
              type="submit"
              variant="outlined"
              startIcon={<UpdateIcon />}
              color="primary"
              // onClick={handleUpdate}
            >
              Update Scheme
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

export default ModifyScheme;
