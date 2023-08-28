import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography } from '@mui/material';

const AskQuestion = () => {
  // State to hold the form input value
  const [question, setQuestion] = useState('');

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send the question to the server)
    console.log(question);
    // Reset the form field after submission
    setQuestion('');
  };

  return (
    <Container component="main" maxWidth="sm">
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
          Ask a Question
        </Typography>
        <Box component="form" sx={{ m: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Your Question"
            value={question}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Ask
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AskQuestion;
