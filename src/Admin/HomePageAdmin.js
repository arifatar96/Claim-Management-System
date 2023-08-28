import React from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const HomePage = () => {
  const name = sessionStorage.getItem("name");

  const containerStyle = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const bannerImageStyle = {
    width: "90%",
    maxHeight: "450px", // Adjust the height as needed
  };

  const cardStyle = {
    maxWidth: "400px",
    margin: "10px",
  };

  return (
    <Container component="main" maxWidth="md" style={containerStyle}>
      <Typography variant="h4" gutterBottom align="center" m={2}>
        Welcome, {name}!
      </Typography>

      <img
        src="/images/banner.png" // Change the path to your image
        alt="Banner"
        style={bannerImageStyle}
      />
    </Container>
  );
};

export default HomePage;