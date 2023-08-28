import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  AppBar,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
  InputAdornment,
  Divider,
  Grid,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import axios from "axios";
import { useLocation, NavLink } from "react-router-dom";
import { useCallback } from "react";

function ClientChat() {
  const role = sessionStorage.getItem("roleName");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [data, setData] = useState({});
  const [mergedData, setMergedData] = useState({});
  const [fetchAgain, setFetchAgain] = useState();

  const location = useLocation();

  //   const { actor1, actor2, hospitalName } = location.state || {};

  const actor1 = sessionStorage.getItem("email");
  const actor2 = "admin@gmail.com";

  useEffect(() => {
    fetchMessage();
    // fetchOldMessage();
  }, []);

  const fetchOldMessage = async () => {
    console.log("Actor1 : " + actor1 + " Actor2 : " + actor2);
    try {
      const response = await axios.post(
        "http://localhost:9092/message/receiveOldMessage",
        {
          // actor1: '9876543212', actor2: '9876543213'
          actor1: actor1,
          actor2: actor2,
        }
      );

      if (
        response.data.msgSent !== data.msgSent ||
        response.data.msgReceive !== data.msgReceive
      ) {
        console.log(response.data);
        // console.log(response);

        console.log("Data : " + JSON.stringify(data));

        const mergedDateObjs = {};

        for (const date in response.data.msgSent) {
          if (!mergedDateObjs[date]) {
            mergedDateObjs[date] = {};
          }

          Object.assign(mergedDateObjs[date], response.data.msgSent[date]);
        }

        for (const date in response.data.msgReceive) {
          if (!mergedDateObjs[date]) {
            mergedDateObjs[date] = {};
          }

          Object.assign(mergedDateObjs[date], response.data.msgReceive[date]);
        }

        console.log(mergedDateObjs);
        setData(response.data);
        setMergedData(mergedDateObjs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessage = async () => {
    console.log("Actor1 : " + actor1 + " Actor2 : " + actor2);

    try {
      const response = await axios.post(
        "http://localhost:9092/message/receiveOldMessage",
        {
          // actor1: '9876543212', actor2: '9876543213'
          actor1: actor1,
          actor2: actor2,
        }
      );

      if (response.data != JSON.stringify(data)) {
        setData(response.data);

        const mergedDateObjs = {};

        for (const date in response.data.msgSent) {
          if (!mergedDateObjs[date]) {
            mergedDateObjs[date] = {};
          }

          Object.assign(mergedDateObjs[date], response.data.msgSent[date]);
        }

        for (const date in response.data.msgReceive) {
          if (!mergedDateObjs[date]) {
            mergedDateObjs[date] = {};
          }

          Object.assign(mergedDateObjs[date], response.data.msgReceive[date]);
        }

        console.log("Merged Date Objects : " + mergedDateObjs);
        setMergedData(mergedDateObjs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        const response = await axios.post(
          "http://localhost:9092/message/sendMessage",
          {
            // actors: '9876543212to9876543213', message: newMessage
            actors: actor1 + "TO" + actor2,
            message: newMessage,
          }
        );

        const message = response.data;

        console.log("Message : ");
        console.log(message);
        const parts = message.split(" ");

        if (parts.length > 2) {
          const dateKey = parts[0];
          const timeKey = parts[1];
          const messageContent = parts.slice(2).join(" ");
          console.log("Message Content : " + messageContent);

          let tempData = data || {}; // Initialize with an empty object if data is falsy

          const mergedDateObjs = mergedData;

          if (!tempData.msgSent) {
            tempData.msgSent = {}; // Initialize msgSent if it doesn't exist
          }

          if (tempData.msgSent[dateKey]) {
            console.log("Date present");
            tempData.msgSent[dateKey][timeKey] = messageContent;
          } else {
            console.log("Date not present");
            const innerMap = {};
            innerMap[timeKey] = messageContent;
            tempData.msgSent[dateKey] = innerMap;
          }
          setData(tempData);

          const mergedDate = mergedData;

          // Merge msgSent

          for (const date in tempData.msgSent) {
            if (!mergedDate[date]) {
              mergedDate[date] = {};
            }
            Object.assign(mergedDate[date], tempData.msgSent[date]);
          }

          // Merge msgReceive

          for (const date in tempData.msgReceive) {
            if (!mergedDate[date]) {
              mergedDate[date] = {};
            }
            Object.assign(mergedDate[date], tempData.msgReceive[date]);
          }
          console.log(mergedDate);

          fetchOldMessage();
        }
      } catch (error) {
        // Handle error response
        console.error(error);
      }

      const updatedMessages = [
        ...messages,
        { sender: "You", message: newMessage },
      ];

      setMessages(updatedMessages);

      setNewMessage("");
    }
  };

  const sortDates = () => {
    return Object.entries(mergedData).sort(
      (a, b) => new Date(a[0]) - new Date(b[0])
    );
  };

  const sortTimes = (index) => {
    if (typeof mergedData[index] === "object" && mergedData[index] !== null) {
      const sortedTimes = Object.entries(mergedData[index])

        .sort((a, b) => {
          const timeA = a[0].replace(/(\d{2})(\d{3})/, "$1.$2");

          const timeB = b[0].replace(/(\d{2})(\d{3})/, "$1.$2");

          return (
            new Date(`1970-01-01T${timeA}`).getTime() -
            new Date(`1970-01-01T${timeB}`).getTime()
          );
        })

        .map(([time]) => time);

      return sortedTimes;
    }

    return [];
  };

  return (
    <Fragment>
      {(() => {
        if (role === "CLIENT") {
          return (
            <Fragment>
              <Typography name={sessionStorage.getItem("name")} />

              <Container maxWidth="xl">
                <Box p={1} textAlign="center">
                  {" "}
                  {/* Position header on the left */}
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    <span style={{ color: "#614BC3" }}>Connected with </span>

                    <span style={{ color: "#900C3F" }}>{actor2}</span>
                  </Typography>
                  <Divider /> {/* Add a divider */}
                </Box>

                <Box
                  display="flex"
                  flexDirection="row"
                  height="70vh"
                  border="1px solid #e0e0e0"
                  backgroundColor="#f0f0f0"
                >
                  <Box
                    width="100%"
                    marginLeft="5%"
                    marginRight="5%"
                    display="flex"
                    flexDirection="column"
                  >
                    <Box
                      width="100%"
                      height="85%"
                      display="flex"
                      flexDirection="column"
                      overflow="auto"
                      style={{
                        flexDirection: "column-reverse", // Reverse the display order

                        /* Apply custom scrollbar styles */

                        scrollbarWidth: "thin",

                        scrollbarColor: "#bdbdbd #f0f0f0", // Track and thumb colors
                      }}
                    >
                      {/* {data.length > 0 && */}

                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                      >
                        {sortDates().map(([date]) =>
                          sortTimes(date).map((time) => (
                            <Box
                              key={`${date}-${time}`}
                              alignSelf={
                                data.msgSent != null &&
                                data.msgSent != undefined &&
                                Object.values(data.msgSent).some(
                                  (dateObj) => time in dateObj
                                )
                                  ? "flex-end"
                                  : "flex-start"
                              }
                              p={1}
                            >
                              <Typography
                                variant="body1"
                                style={{
                                  background:
                                    data.msgSent != null &&
                                    data.msgSent != undefined &&
                                    Object.values(data.msgSent).some(
                                      (dateObj) => time in dateObj
                                    )
                                      ? "#4caf50"
                                      : "#ffffff",

                                  padding: "5px 10px",

                                  borderRadius: "10px",
                                }}
                              >
                                {/* {console.log("Date : " + date + " time : " + time)} */}

                                {mergedData[date][time]}
                              </Typography>
                            </Box>
                          ))
                        )}
                      </Box>

                      {/* } */}
                    </Box>

                    <TextField
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      variant="outlined"
                      placeholder="Type a message..."
                      fullWidth
                      // border="1px solid blue"

                      sx={{ border: "1px solid blue" }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Send
                              color="primary"
                              style={{ cursor: "pointer" }}
                              onClick={handleSendMessage}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>
              </Container>
            </Fragment>
          );
        } else {
          return (
            <Typography variant="h5" component="h1">
              <NavLink to="/">
                Please Login Either Using Patient or Doctor Login Credentials
              </NavLink>
            </Typography>
          );
        }
      })()}
    </Fragment>
  );
}

export default ClientChat;
