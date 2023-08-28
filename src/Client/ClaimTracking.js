import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  Badge,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const claimDetails = () => {
  return axios
    .get(`http://localhost:9093/allClaims`)
    .then((response) => response.data);
};

const ClaimTracking = () => {
  const [claims, setClaims] = useState([]);
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();
  const incomingMessage = sessionStorage.getItem("count");

  useEffect(() => {
    claimDetails()
      .then((resp) => {
        const allClaims = resp.filter((claim) => claim.email === email);
        setClaims(allClaims);
        console.log(allClaims);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleMessage = (claim) => {
    navigate(`/client/message/${encodeURIComponent(JSON.stringify(claim))}`);
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h2" variant="h5" mt={6} mb={3} align="center">
        Claim Tracking
      </Typography>
      {claims.length === 0 ? (
        <Typography variant="body1" align="center">
          No Claim Status Found.
        </Typography>
      ) : (
        // <Box
        //   boxShadow={"5px 5px 10px grey"}
        //   sx={{
        //     margin: 4,
        //     pb: 2,
        //     display: "flex",
        //     flexDirection: "column",
        //     alignItems: "center",
        //   }}
        // >

        <Paper elevation={3} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Scheme Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Applied Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Claim Amount</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Balance Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                {/* <TableCell sx={{ fontWeight: "bold" }}>Admin Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Message</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>{claim.schemeName}</TableCell>
                  <TableCell>{claim.claimDate.split("T")[0]}</TableCell>
                  <TableCell>₹ {claim.claimAmount}</TableCell>
                  <TableCell>₹ {claim.premiumAmount}</TableCell>
                  <TableCell>
                    {claim.claimSettle === "Success" ? "Approved" : "Pending"}
                  </TableCell>
                  {/* <TableCell>
                    {claim.adminEmail === null
                      ? "admin@gmail.com"
                      : claim.adminEmail}
                  </TableCell>
                  <TableCell>
                    <Badge
                      badgeContent={incomingMessage ? "•" : null}
                      color="error"
                    >
                      <AiOutlineMessage />
                      <Button onClick={() => handleMessage(claim)}>
                        Message
                      </Button>
                    </Badge>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default ClaimTracking;
