import React from "react";
import {
  TextField,
  Button,
  Box,
  Stack,
  Grid,
  Container,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import axios from "axios";

const ClaimView = ({
  existingClaim,
  handleApproveClaim,
  handleRejectClaim,
}) => {
  // State to hold the form input values
  const [updateDescription, setUpdateDescription] = React.useState("");

  const handleDownload = (id) => {
    console.log(id);
    axios
      .get(`http://localhost:9093/get/${id}`, { responseType: "blob" })
      .then((response) => {
        // Create a blob from the response data
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = existingClaim.fileName; // Set desired filename
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error(error);
        // Display error message or perform error handling
      });
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
        <Typography component="h2" variant="h5" mt={3}>
          Claim Detail
        </Typography>

        <Box sx={{ m: 3 }}>
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

            <Grid item xs={12} sm={12}>
              <TextField
                label="Reason"
                value={existingClaim.reason == "" ? "-" : existingClaim.reason}
                // value={existingClaim.reason}
                fullWidth
                variant="outlined"
                multiline
                rows={2}
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

            <Grid item xs={12} sm={6}>
              <TextField
                label="Approved By"
                value={existingClaim.userEmail}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="User Comment"
                value={
                  existingClaim.userUpdate === null
                    ? "No Comment"
                    : existingClaim.userUpdate
                }
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={{ mt: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <List>
                <ListItem
                  sx={{ py: 1, px: 0, display: "flex", alignItems: "center" }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", mr: 6 }}
                  >
                    Supporting Document :
                  </Typography>

                  {existingClaim.fileName == "" ? (
                     <Typography variant="body1">No Document</Typography>
                  ) : (
                    <Button onClick={() => handleDownload(existingClaim.id)}>
                      Download
                    </Button>
                  )}
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Update Description"
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
                required
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </Box>

        <Stack
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2, mb: 2 }}
        >
          <Button
            variant="outlined"
            startIcon={<VerifiedUserOutlinedIcon />}
            color="primary"
            disabled={existingClaim.premiumAmount < existingClaim.claimAmount}
            onClick={() => handleApproveClaim(existingClaim, updateDescription)}
          >
            Approve
          </Button>

          <Button
            variant="outlined"
            startIcon={<ThumbDownAltOutlinedIcon />}
            color="error"
            onClick={() => handleRejectClaim(existingClaim, updateDescription)}
          >
            Reject
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ClaimView;
