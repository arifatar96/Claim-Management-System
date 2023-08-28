import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function HomePost() {
  const name = sessionStorage.getItem("name");

  const post = {
    title: "Lifeline Insurance Ltd",
    description:
      "Lifeline Insurance Ltd's Claim Management System allows you to efficiently manage the claims process.",
    image: "/images/supp.png",
    imageText: "main image description",
    linkText: "Continue reading…",
  };

  return (
    <Paper>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#512B81", margin: 2 }}
      >
        SUPPORT SYSTEM USER PAGE
      </Typography>

      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", marginBottom: 2, color: "#FD8D14" }}
      >
        Hello, {name} !
      </Typography>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 4,
            p: 4,
            height: 365,
            backgroundSize: "cover",

            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${post.image})`,
          }}
        >
          {
            <img
              style={{ display: "none", filter: "blur(20px)" }}
              src={post.image}
              alt={post.imageText}
            />
          }
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,.3)",
            }}
          />
          <Grid container alignContent={"flex-end"}>
            <Grid item md={6}> </Grid>
            <Grid item md={6}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                  color: "#C51605",
                  
                }}
              >
          {/* <div
            style={{ padding: "20px", paddingLeft: "900px", maxWidth: "400px" }}
          > */}
            <Typography
              variant="h6"
              gutterBottom
              align="left"
              sx={{ fontWeight: "bold", color: "#FD8D14", marginBottom: 1 }}
            >
              {post.title}
            </Typography>
            <Typography variant="body1" color="white" paragraph mb={6} style={{ textAlign: "justify" }}>
              {post.description}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              align="left"
              sx={{ fontWeight: "bold", color: "#FD8D14", marginBottom: 0 }}
            >
              Functionality Overview
            </Typography>

            <Box component="div" color="white">
              <ul>
                <li>Able to view the details of claim raised by clients</li>
                <li>Verifies and sends an update to admin</li>
                <li>Process settlement for the claim</li>
                <li>Maintains the record of all transactions</li>
              </ul>
            </Box>
          {/* </div> */}
          </Box>
            </Grid>

          
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}

export default HomePost;
