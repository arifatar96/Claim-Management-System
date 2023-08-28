import React, { useState } from "react";
import {
  Table,
  TableBody,
  Container,
  Typography,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ClaimSettlementRecords = () => {
  const [claimSettlements, setClaimSettlements] = useState([
    { id: 1, claimId: 12345, amount: 1000, transactionDate: "2023-07-25" },
    { id: 2, claimId: 67890, amount: 500, transactionDate: "2023-07-26" },
  ]);

  return (
    <Container component="main" maxWidth="md">
      {/* <div> */}
      {/* <h2>Claim Settlement Records</h2> */}
      <Typography component="h2" variant="h5" mt={6} mb={3} align="center">
        Claim Settlement Records
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Claim ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Transaction Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claimSettlements.map((settlement) => (
              <TableRow key={settlement.id}>
                <TableCell>{settlement.id}</TableCell>
                <TableCell>{settlement.claimId}</TableCell>
                <TableCell>{settlement.amount}</TableCell>
                <TableCell>{settlement.transactionDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      {/* </div> */}
    </Container>
  );
};

export default ClaimSettlementRecords;
