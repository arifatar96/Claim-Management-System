import React, { useEffect, useState } from 'react';
import { Button, Box, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Snackbar, Alert } from '@mui/material';
import ModifyScheme from './ModifyScheme';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const schemeDetails = () => {
  return axios.get("http://localhost:9091/allSchemes")
    .then((response) => response.data)
}

const InsuranceSchemeList = () => {
  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    schemeDetails()
      .then((resp) => {
        setSchemes(resp);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdateScheme = (updatedScheme) => {
    const updatedSchemes = schemes.map((scheme) =>
      scheme.schemeName === updatedScheme.schemeName ? updatedScheme : scheme
    );
    setSchemes(updatedSchemes);
    setSelectedScheme(null);
    setShowEditForm(false);
  };

  const handleEditScheme = (schemeName) => {
    const schemeToEdit = schemes.find((scheme) => scheme.schemeName === schemeName);
    console.log(schemeToEdit);
   
    setSelectedScheme(schemeToEdit);
    console.log(selectedScheme);
    setShowEditForm(true);
    // window.location.reload();
  };

  const handleDeleteScheme = (schemeName) => {
    const updatedSchemes = schemes.filter((scheme) => scheme.schemeName !== schemeName);
    setSchemes(updatedSchemes);
    setSelectedScheme(null);
    setShowEditForm(false);
  };

  const handleDelete = (schemeName) => {
    const schemeToDelete = schemes.find((scheme) => scheme.schemeName === schemeName);
    // setSelectedScheme(schemeToDelete);

    console.log("Deleting scheme:", selectedScheme);

    axios.delete("http://localhost:9091/deleteScheme", {
      data: schemeToDelete,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    })
    .then((resp) => {
      console.log("Deletion response:", resp);
      setAlertMessage(`${schemeToDelete.schemeName} details deleted successfully`);
      setOpenSnackbar(true);
      handleDeleteScheme(schemeToDelete.schemeName);
    })
    .catch((error) => {
      console.log("Deletion error:", error);
    });
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h2" variant="h5" mt={6} mb={3} align="center">
        Insurance Scheme List
      </Typography>
      {schemes.length === 0 ? (
        <Typography variant="body1" align="center">
          No Schemes Found.
        </Typography>
         ) : (
      <Paper elevation={3} sx={{ overflowX: 'auto', mb:4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Scheme Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Scheme Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Coverage Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Premium Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} colSpan={2} align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schemes.map((scheme) => (
              <TableRow key={scheme.schemeName}>
                <TableCell>{scheme.schemeName}</TableCell>
                <TableCell>{scheme.description}</TableCell>
                <TableCell>{scheme.coverageType}</TableCell>
                <TableCell>₹ {scheme.premiumAmount}</TableCell>
                <TableCell align='center'>
                  <Button variant="outlined" color="secondary" onClick={() => handleEditScheme(scheme.schemeName)} startIcon={<EditIcon />}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align='center'>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(scheme.schemeName)} startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
         )}
      {showEditForm && selectedScheme && (
        <ModifyScheme
          existingScheme={selectedScheme}
          handleUpdateScheme={handleUpdateScheme}
          handleDeleteScheme={handleDeleteScheme}
        />
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default InsuranceSchemeList;
