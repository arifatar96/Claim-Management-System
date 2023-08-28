import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Container,
  TableRow,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";

const claimSettlementDetails = () => {
  return axios
    .get("http://localhost:9093/allSettlementClaims")
    .then((response) => response.data);
};

export default function RomeChangeRequests() {
  const [settlmentClaims, setSettlementClaims] = useState([]);

  useEffect(() => {
    claimSettlementDetails()
      .then((resp) => {
        console.log(resp);
        const formattedClaims = resp.map((claim) => ({
          ...claim,
          settlementDate: claim.settlementDate.split("T")[0], // Format date here
        }));
        setSettlementClaims(formattedClaims);
        // setSettlementClaims(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "schemeName",
        header: "SCHEME NAME",
      },
      {
        accessorKey: "email",
        header: "CLIENT EMAIL",
      },
      {
        accessorKey: "clientName",
        header: "CLIENT NAME",
      },
      
      // {
      //   accessorKey: "claimAmount",
      //   header: "CLAIM AMOUNT",
      // },
      {
        accessorKey: "settlementAmount",
        header: "SETTLED AMOUNT",
      },
      {
        accessorKey: "premiumAmount",
        header: "BALANCE AMOUNT",
      },
      {
        accessorKey: "settlementDate",
        header: "SETTLEMENT DATE",
        // customRender: ({ value }) => value.split("T")[0],
      },
    ],
    []
  );

  return (
    // <React.Fragment>
      <Container component="main" maxWidth="lg">
      {/* <Box
        sx={{
          marginTop: 6,
          alignItems: "center",
          boxShadow: 7,
          p: 3,
        }}
      > */}
      <Typography component="h2" variant="h5" mt={6} mb={3} align="center">

        {/* <Typography component="h2" variant="h5" mb={3} align="center"> */}
          Claim Settlement Records
        </Typography>
        {settlmentClaims.length === 0 ? (
          <Typography variant="body1" align="center">
            No Settlement Record Found.
          </Typography>
        ) : (
          <Grid item xs={12}>
            <div style={{ height: 300, width: "100%", border: "solid 1px " }}>
              <MaterialReactTable columns={columns} data={settlmentClaims} />
            </div>
          </Grid>
        )}
      </Container>
    // </React.Fragment>
  );
}

