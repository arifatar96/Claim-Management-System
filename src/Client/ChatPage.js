import React, { Fragment, useState } from "react";

import {
  Container,
  Paper,
  TextField,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import axios from "axios";

import { useEffect } from "react";
import { useParams } from "react-router-dom";


const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  var [messageCount, setMessageCount] = useState(0);

  const [newMessage, setNewMessage] = useState("");
  // const [adminEmail, setAdminEmail] = useState("admin@gmail.com");
  const clientEmail = sessionStorage.getItem("email");
  const { claim } = useParams();
    const claimDetail = JSON.parse(decodeURIComponent(claim));
    console.log(claimDetail);
    const adminEmail = claimDetail.adminEmail === null ? "admin@gmail.com" : claimDetail.adminEmail

  const handleSendMessage = () => {
    const data = {
      message: newMessage,
      senderMail: clientEmail,
      recieverMail: adminEmail,
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
      senderMail: claimDetail.adminEmail,
      recieverMail: clientEmail,
    };

    axios

      .post("http://localhost:9093/receivemessage", data)

      .then((response) => {
        if (typeof response.data === "string" && response.data.trim() !== "") {
          // Handle a single non-empty message

          const incomingMessage = response.data;

          console.log("incoming message:", incomingMessage);

          if(incomingMessage) {
            setMessageCount(1)
          }

          setMessages((prevMessages) => [
            ...prevMessages,

            { text: incomingMessage, sender: "Insurance Admin" },
          ]);
        }
      })

      .catch((error) => {
        console.error("Error while Fetching Incoming Messages:", error);
      });
  };

  useEffect(() => {
    // Fetch incoming messages every 5 seconds (adjust as needed)

    
    const intervalId = setInterval(fetchIncomingMessages, 5000);
    sessionStorage.setItem("count", messageCount);
    
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
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ flexGrow: 1, overflowY: "auto", marginBottom: 2 }}>
      {/* <Paper
        elevation={3}
        sx={{ flexGrow: 1, overflowY: "auto", marginBottom: 2 }}
      > */}
        <Box textAlign="center">
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            <span style={{ color: "#614BC3" }}>Connected with </span>
            <span style={{ color: "#900C3F" }}>{adminEmail}</span>
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
              alignSelf={message.sender === "You" ? "flex-end" : "flex-start"}
              p={1}
              // alignItems="flex-start"
              // sx={{
              //   alignSelf: message.sender === "You" ? "flex-end" : "flex-start",

              //   marginBottom: 1,

              //   justifyContent:
              //     message.sender === "You" ? "flex-end" : "flex-start",
              // }}
            >
              <ListItemText
                primary={message.text}
                secondary={message.sender}
                secondaryTypographyProps={{
                  color: "textSecondary",
                  fontSize: 12,
                }}
                style={{
                  background: message.sender === "You" ? "#A8DF8E" : "#ffffff",
                  textAlign: message.sender === "You" ? "right" : "left",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                // sx={{
                //   borderRadius: "10px",

                //   backgroundColor:
                //     message.sender === "You" ? "#DCF8C6" : "#E3E3E3",
                // }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* <Divider /> */}

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
                  backgroundColor="#FD8D14"
                  color="white"
                  style={{ cursor: "pointer" }}
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
