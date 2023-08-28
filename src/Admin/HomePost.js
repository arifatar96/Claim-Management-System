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
      "Lifeline Insurance Ltd's Claim Management System allows you to manage insurance schemes and claim requests.",
    image: "/images/admin1.avif",
    imageText: "main image description",
    linkText: "Continue reading…",
  };

  return (
    <Paper>
      <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", color: "yellowgreen", margin: 2 }}
          >
            INSURANCE ADMIN PAGE
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", marginBottom: 2, color: "#79155B" }}
          >
            Hello, {name} !
          </Typography>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            p: 4,
            height: 375,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${post.image})`,
          }}
        >
          
          {/* Increase the priority of the hero background image */}
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
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                  color: "#A8DF8E",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  align="left"
                  sx={{ fontWeight: "bold", color: "#FD8D14", marginBottom: 1 }}
                >
                  {post.title}
                </Typography>
                <Typography variant="body1" color="white" paragraph mb={4} style={{ textAlign: "justify" }}>
                  {post.description}
                </Typography>


                <Typography
                  variant="h6"
                  gutterBottom
                  align="left"
                  sx={{ fontWeight: "bold", color: "#FD8D14", marginBottom: 1 }}
                >
                  Functionality Overview
                </Typography>

                <Box component="div" color="white">
              <ul>
                <li>Provide various insurance schemes for clients.</li>
                <li>Approve or cancel the registration applied by clients.</li>
                <li>Able to approve or cancel claim raised by clients which is verified by user</li>
              </ul>
            </Box>
              </Box>
            </Grid>

            <Grid item md={6}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                  color: "#CECE5A",
                }}
              >
                
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}

export default HomePost;
