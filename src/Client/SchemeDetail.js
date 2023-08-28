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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const SchemeDetails = ({ scheme, schemeName, schemeDescription }) => {
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
          Scheme Detail
        </Typography>

        <Box component="form" sx={{ m: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Scheme Name"
                value={schemeName}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Description"
                value={scheme.description}
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
                value={scheme.coverageType}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Premium Amount"
                value={`₹ ${scheme.premiumAmount}`}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SchemeDetails;
