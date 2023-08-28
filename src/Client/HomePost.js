import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Box,
  List,
  ListItem,
  Card,
  CardContent,
  Divider,
  ListItemText,
} from "@mui/material";
import axios from "axios";

const RegDetails = () => {
  return axios
    .get(`http://localhost:9093/allRegs`)
    .then((response) => response.data);
};

function HomePost() {
  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const [appliedSchemes, setAppliedSchemes] = React.useState([]);

  useEffect(() => {
    // Make an API call to retrieve the scheme details based on the schemeName
    RegDetails()
      .then((resp) => {
        const allRegs = resp.filter((reg) => reg.email === email);
        setAppliedSchemes(allRegs);
        console.log(allRegs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const post = {
    title: "Lifeline Insurance Ltd",
    description:
      "Lifeline Insurance Ltd's Claim Management System allows you to manage insurance requests.",
    image: "/images/client1.avif",
    imageText: "main image description",
    linkText: "Continue reading…",
  };

  return (
    <Paper>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#FD8D14", margin: 2 }}
      >
        CLIENT PAGE
      </Typography>

      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", marginBottom: 2, color: "#7EAA92" }}
      >
        Hello, {name} !
      </Typography>

      <div
        style={{
          backgroundImage: `url("/images/main1.jfif")`,
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center center", // Adjust as needed
          minHeight: "35vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column", // Center-align vertically
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", color: "yellowgreen", margin: 2 }}
        >
          Applied Schemes
        </Typography>
        {appliedSchemes.length > 0 ? (
          <Grid container spacing={4} justifyContent="center">
            {appliedSchemes.map((scheme) => (
              <Grid item key={scheme.id} xs={12} sm={6} md={3}>
                <Card sx={{ margin: 2, backgroundColor: "#93B1A6" }}>
                  <CardContent>
                    <Typography variant="h6">{scheme.schemeName}</Typography>
                    <Typography variant="body2">
                      Registration Date: {scheme.registrationDate.split("T")[0]}
                    </Typography>
                    {scheme.status === "approved" ? (
                      <Typography variant="body2">
                        Balance Amount: ₹ {scheme.premiumAmount}
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        Premium Amount: ₹ {scheme.premiumAmount}
                      </Typography>
                    )}
                    <Typography variant="body2">
                      Status: {scheme.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">
            You have not applied for any schemes yet.
          </Typography>
        )}
      </div>
    </Paper>
  );
}

export default HomePost;
