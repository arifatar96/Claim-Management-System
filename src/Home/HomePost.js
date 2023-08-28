import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function HomePost() {
  return (
    <React.Fragment>
      <div
      // style={{
      //   backgroundImage: `url("/images/main3.jpg")`,
      //   backgroundSize: "cover", // Adjust as needed
      //   backgroundPosition: "center center", // Adjust as needed
      //   minHeight: "35vh",
      //   // display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      // }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ pt: 3, fontWeight: "bold", color: "#765827", marginBottom: 2 }}
        >
          Welcome to Lifeline Insurance Ltd
        </Typography>
        {/* <Typography
          variant="h6"
          gutterBottom
          align="center"
          sx={{ marginBottom: 2 }}
        >
          Welcome to Lifeline Insurance Ltd, where your future and security are
          our utmost priorities. As a leading insurance provider, we understand
          the importance of safeguarding your life, assets, and dreams against
          unforeseen events. With a commitment to excellence and a legacy of
          trust, Lifeline Insurance Ltd has been a steadfast companion to
          individuals, families, and businesses on their journey to financial
          protection.
        </Typography> */}
      </div>

      <div
        style={{
          backgroundImage: `url("/images/main7.webp")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          minHeight: "35vh",
          display: "flex",
        }}
      >
        <div style={{ padding: "20px", maxWidth: "400px" }}>
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            sx={{ fontWeight: "bold", color: "#FD8D14", marginBottom: 2 }}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            color="white"
            paragraph
            style={{ textAlign: "justify" }}
          >
            Established with a vision to provide a safety net for every
            individual and enterprise, Lifeline Insurance Ltd has grown to
            become a cornerstone in the insurance industry. Our journey began
            with a simple yet powerful mission: to empower people to face life's
            uncertainties with confidence. Over the years, we have evolved and
            adapted to the changing needs of our clients, consistently enhancing
            our products and services to offer comprehensive coverage.
          </Typography>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url("/images/value.jpg")`,
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center center", // Adjust as needed
          minHeight: "35vh",
          // display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ padding: "20px", maxWidth: "400px" }}>
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            sx={{ fontWeight: "bold", color: "#FD8D14", marginBottom: 2 }}
          >
            Our Values
          </Typography>
          <Typography
            variant="body1"
            color="inherit"
            paragraph
            style={{ textAlign: "justify" }}
          >
            At Lifeline Insurance Ltd, our values are at the heart of everything
            we do. Integrity, transparency, and customer-centricity are the
            pillars that uphold our operations. We believe in building lasting
            relationships with our clients, founded on mutual respect and trust.
            Our team is dedicated to providing personalized solutions that align
            with your unique circumstances, ensuring you have the peace of mind
            you deserve.
          </Typography>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url("/images/main8.avif")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          minHeight: "35vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Align content to the right
          paddingRight: "20px", // Add some right padding
        }}
      >
        <div style={{ padding: "20px", maxWidth: "400px" }}>
          <Typography
            variant="h6"
            gutterBottom
            align="left"
            sx={{ fontWeight: "bold", color: "#FD8D14", marginBottom: 2 }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            color="white"
            paragraph
            style={{ textAlign: "justify" }}
          >
            We invite you to join the Lifeline Insurance Ltd family and
            experience the difference in our approach. Whether you're an
            individual, a family, or a business owner, we have the right
            insurance solutions to meet your needs. Contact us today to explore
            how we can be your partner in protection and prosperity.
            <br />
            <b>Phone No : +91 8364647474</b>
            <br />
            <b>
              Email :{" "}
              <a href="mailto:helpline@lil.com" style={{ color: "#A8DF8E" }}>
                helpline@lil.com
              </a>
            </b>
          </Typography>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HomePost;
