import React, { useState } from "react";

import {
  Container,
  Paper,
  TextField,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import axios from "axios";

import { useEffect } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [clientEmail, setClientEmail] = useState("client@gmail.com");
  const adminEmail = sessionStorage.getItem("email");

  const handleSendMessage = () => {
    const data = {
      message: newMessage,
      senderMail: adminEmail,
      recieverMail: clientEmail,
    };

    const url = "http://localhost:9093/sendmessage";

    axios

      .post(url, data)

      .then((response) => {
        console.log(response.data);

        // Add the sent message to the messages state with sender 'You'

        if (newMessage.trim() !== "") {
          setMessages([...messages, { text: newMessage, sender: "You" }]);
        }

        setNewMessage("");
      })

      .catch((error) => {
        console.error("Error while Sending Data:", error);
      });
  };

  const fetchIncomingMessages = () => {
    const data = {
      senderMail: clientEmail,
      recieverMail: adminEmail,
    };

    axios

      .post("http://localhost:9093/receivemessage", data)

      .then((response) => {
        if (typeof response.data === "string" && response.data.trim() !== "") {
          // Handle a single non-empty message

          const incomingMessage = response.data;

          console.log("incoming message:", incomingMessage);

          setMessages((prevMessages) => [
            ...prevMessages,

            { text: incomingMessage, sender: "Client" },
          ]);
        }
      })

      .catch((error) => {
        console.error("Error while Fetching Incoming Messages:", error);
      });
  };

  useEffect(() => {
    // Fetch incoming messages every 5 seconds (adjust as needed)

    const intervalId = setInterval(fetchIncomingMessages, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingTop: 2,
        display: "flex",
        flexDirection: "column",
        height: "85vh",
      }}
    >
      <Paper elevation={3} sx={{ flexGrow: 1, overflowY: "auto", marginBottom: 2 }}>
        <Box textAlign="center">
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            <span style={{ color: "#614BC3" }}>Connected with </span>
            <span style={{ color: "#900C3F" }}>{clientEmail}</span>
          </Typography>
          <Divider />
        </Box>
        <List
         sx={{
          display: "flex",          // Add display flex to the List component
          flexDirection: "column",  // Align items vertically
          flexGrow: 1,              // Take available vertical space
        }}
        >
          {messages.map((message, index) => (
            <ListItem
              key={index}
              // alignSelf={message.sender === "You" ? "flex-end" : "flex-start"}
              p={1}
            >
              <ListItemText
                primary={message.text}
                secondary={message.sender}
                secondaryTypographyProps={{
                  color: "textSecondary",
                  fontSize: 12,
                }}
                style={{
                  background: message.sender === "You" ? "#A8DF8E" : "#E3E3E3",
                  textAlign: message.sender === "You" ? "right" : "left",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper
        elevation={3}
        sx={{ padding: 2, display: "flex", alignItems: "center" }}
      >
        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          variant="outlined"
          placeholder="Type your message..."
          fullWidth
          sx={{ border: "1px solid blue" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                 
                  style={{ cursor: "pointer",  }}
                  sx={{ 
                  color:"#512B81"}}
                  onClick={handleSendMessage}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>

    </Container>
  );
};

export default ChatPage;
