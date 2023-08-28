import React from "react";
import { Typography, Button, Grid, Paper } from "@mui/material";

const Home = () => {
  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
        {/* <Grid item xs={12} sm={6}>
        <img
          style={{ width: "100%", height: "auto" }} // Adjusted image width to be responsive
          src="/images/624111.jpg"
          alt="No"
        />
      </Grid> */}
      <Grid item xs={12} sm={6}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginTop: 2,
            backgroundColor: "#C8E4B2", // Change the background color
            // color: "#fff", // Change the text color
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Welcome to Lifeline Insurance Ltd
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Welcome to Lifeline Insurance Ltd, where your future and security
            are our utmost priorities. As a leading insurance provider, we
            understand the importance of safeguarding your life, assets, and
            dreams against unforeseen events. With a commitment to excellence
            and a legacy of trust, Lifeline Insurance Ltd has been a steadfast
            companion to individuals, families, and businesses on their journey
            to financial protection.
          </Typography>
          <Typography variant="h6" gutterBottom align="center">
            Choose Lifeline Insurance Ltd - Your Lifeline to a Secure Future.
          </Typography>
          {/* <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Get Started
          </Button> */}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            backgroundColor: "#D0BFFF", // Change the background color
            // color: "#fff", // Change the text color
          }}
        >
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2" gutterBottom>
            Established with a vision to provide a safety net for every
            individual and enterprise, Lifeline Insurance Ltd has grown to
            become a cornerstone in the insurance industry. Our journey began
            with a simple yet powerful mission: to empower people to face life's
            uncertainties with confidence. Over the years, we have evolved and
            adapted to the changing needs of our clients, consistently enhancing
            our products and services to offer comprehensive coverage.
          </Typography>

          <Typography variant="h6" gutterBottom align="center">
          Contact Us
        </Typography>
        <Typography variant="body2" gutterBottom align="center">
          We invite you to join the Lifeline Insurance Ltd family and experience
          the difference in our approach. Whether you're an individual, a
          family, or a business owner, we have the right insurance solutions to
          meet your needs. Contact us today to explore how we can be your
          partner in protection and prosperity.
          <br />
          <b>Phone No : +91 8364647474</b>
          <br />
          <b>
            Email : <a href="mailto:helpline@lil.com">helpline@lil.com</a>
          </b>
        </Typography>
          {/* <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
            Learn More
          </Button> */}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            backgroundColor: "#D0BFFF", // Change the background color
            // color: "#fff", // Change the text color
          }}
        >
          <Typography variant="h6" gutterBottom>
            Our Values
          </Typography>
          <Typography variant="body2" gutterBottom>
            At Lifeline Insurance Ltd, our values are at the heart of everything
            we do. Integrity, transparency, and customer-centricity are the
            pillars that uphold our operations. We believe in building lasting
            relationships with our clients, founded on mutual respect and trust.
            Our team is dedicated to providing personalized solutions that align
            with your unique circumstances, ensuring you have the peace of mind
            you deserve.
          </Typography>
          {/* <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
            Contact Now
          </Button> */}
        </Paper>
        
       
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            // marginTop: 2,
            backgroundColor: "#D0BFFF", // Change the background color
            // color: "#fff", // Change the text color
          }}
        >
         
          {/* <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Get Started
          </Button> */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;

