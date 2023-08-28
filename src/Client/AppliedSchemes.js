import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Paper } from '@mui/material';

const AppliedSchemes = () => {
  // Sample data for applied schemes
  const appliedSchemes = [
    {
      id: 1,
      schemeName: 'Life Insurance Plan',
      coverageType: 'Life Coverage',
      premiumAmount: 500,
      status: 'Pending',
    },
    {
      id: 2,
      schemeName: 'Health Insurance Plan',
      coverageType: 'Health Coverage',
      premiumAmount: 300,
      status: 'Approved',
    },
    {
      id: 3,
      schemeName: 'Auto Insurance Plan',
      coverageType: 'Auto Coverage',
      premiumAmount: 200,
      status: 'Rejected',
    },
  ];

  return (
    <Container component="main" maxWidth="md">
      <Box
        boxShadow={'5px 5px 10px grey'}
        sx={{
          margin: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" mt={3}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Hi, John Doe! Here you can find all the details of your applied schemes.
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
        <Typography variant="h6" gutterBottom>
          Applied Schemes
        </Typography>
        {appliedSchemes.length > 0 ? (
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {appliedSchemes.map((scheme) => (
              <ListItem key={scheme.id} alignItems="flex-start">
                <ListItemText
                  primary={scheme.schemeName}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        Coverage Type: {scheme.coverageType}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="text.primary">
                        Premium Amount: {scheme.premiumAmount}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="text.primary">
                        Status: {scheme.status}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">You have not applied for any schemes yet.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default AppliedSchemes;
