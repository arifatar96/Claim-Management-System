import React, { useState } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const QuestionHistory = () => {
  // Sample data for question history
  const initialQuestionHistory = [
    { id: 1, question: 'How do I file a claim?', adminReply: 'You can file a claim by visiting our website and filling out the claim form.' },
    { id: 2, question: 'What documents are required for claim processing?', adminReply: 'You will need to provide your policy details, proof of loss, and any relevant receipts or documents.' },
    { id: 3, question: 'How long does it take to process a claim?', adminReply: 'The processing time for claims varies depending on the type of claim and the information provided. It can take anywhere from a few days to a few weeks.' },
  ];

  const [questionHistory, setQuestionHistory] = useState(initialQuestionHistory);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        boxShadow={'5px 5px 10px grey'}
        sx={{
          margin: 8,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" mt={3}>
          Question History
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {questionHistory.map((item) => (
            <ListItem key={item.id} alignItems="flex-start">
              <ListItemText
                primary={item.question}
                secondary={item.adminReply}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default QuestionHistory;
