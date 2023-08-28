import React, { useState, useRef } from "react";

import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const RequestsContent = () => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const chatBoxRef = useRef(null);

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        sender: "Me",
        recipient: recipient,
        text: message.trim(),
      };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");

      // Scroll to the bottom of the chatbox after sending a message
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      {/* <Box mt={4} boxShadow={2} p={4} borderRadius="borderRadius" maxHeight="400px" overflowY="auto">
                <Typography variant="h6" align="center">
                    Chat with {recipient}:
                </Typography>

                <Box
                    ref={chatBoxRef}
                    maxHeight="300px"
                    overflowY="auto"
                    border="1px solid #ccc"
                    borderRadius="borderRadius"
                    p={1}
                    mt={2}
                >
                </Box>
            </Box> */}

      <Box
        mt={4}
        boxShadow={"5px 5px 10px grey"}
        p={4}
        borderRadius="borderRadius"
      >
        {/* <Box
        boxShadow={'5px 5px 10px grey'}
        sx={{
          margin: 8,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      > */}
        <Typography variant="h5" align="center">
          Message
        </Typography>

        <Box mt={2}>
          {chatMessages.map((msg, index) => (
            <Box
              key={index}
              my={1}
              textAlign={msg.sender === "Me" ? "right" : "left"}
              p={1}
              borderRadius="borderRadius"
              bgcolor={
                msg.sender === "Me" ? "primary.main" : "background.default"
              }
              color={
                msg.sender === "Me" ? "primary.contrastText" : "text.primary"
              }
            >
              <Typography>
                <strong>{msg.sender === "Me" ? "Me" : msg.recipient}:</strong>{" "}
                {msg.text}
              </Typography>
            </Box>
          ))}
        </Box>

        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {/* <Box spacing={2} mt={4} display={'flex'} justifyContent="center"> */}
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={message.split("\n").length > 3 ? 3 : undefined}
            value={message}
            onChange={handleMessageChange}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
          >
            Send
          </Button>
          {/* <SendIcon color="primary" variant="button" onClick={handleSendMessage}/> */}
          {/* </Box> */}
        </Stack>
      </Box>
    </Container>
  );
};

export default RequestsContent;
