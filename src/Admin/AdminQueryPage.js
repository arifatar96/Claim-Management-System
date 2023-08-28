import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const AdminQueryPage = () => {
  const [message, setMessage] = useState('');
  const [sentMessage, setSentMessage] = useState('');

  const handleSendMessage = () => {
    const data = {
      actors: "client@gmail.comTOadmin@gmail.com",
      message: message,
    };

    axios.post('http://localhost:9092/message/sendMessage', data)
      .then((response) => {
        console.log(response.data); // The updated message content
        setSentMessage(response.data);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" mt={6} mb={3} align="center">
        Send Message
      </Typography>

      <Paper elevation={3} sx={{ padding: '16px' }}>
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={4}
          sx={{ marginBottom: '16px' }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          color="primary"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Paper>

      {sentMessage && (
        <Paper elevation={3} sx={{ marginTop: '16px', padding: '16px' }}>
          <Typography component="h2" variant="h6" sx={{ marginBottom: '8px' }}>
            Sent Message
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={sentMessage} />
            </ListItem>
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default AdminQueryPage;