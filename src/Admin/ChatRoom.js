import React, { useState } from "react";

const ChatApp = () => {
  const [userData, setUserData] = useState({
    username: "",
    connected: false,
    message: "",
  });
  const [tab, setTab] = useState("CHATROOM");
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());

  const handleUsername = (event) => {
    setUserData({ ...userData, username: event.target.value });
  };

  const handleMessage = (event) => {
    setUserData({ ...userData, message: event.target.value });
  };

  const registerUser = () => {
    setUserData({ ...userData, connected: true });
  };

  const sendValue = () => {
    // Assuming you have a sendValue logic to send messages to the chat room
    // You would add the message to the publicChats array
    const newPublicChat = {
      senderName: userData.username,
      message: userData.message,
    };
    setPublicChats([...publicChats, newPublicChat]);
    setUserData({ ...userData, message: "" });
  };

  const sendPrivateValue = () => {
    // Assuming you have a sendPrivateValue logic to send private messages
    // You would update the privateChats map
    const newPrivateChat = {
      senderName: userData.username,
      message: userData.message,
    };
    const updatedPrivateChats = new Map(privateChats);
    if (!updatedPrivateChats.has(tab)) {
      updatedPrivateChats.set(tab, []);
    }
    updatedPrivateChats.get(tab).push(newPrivateChat);
    setPrivateChats(updatedPrivateChats);
    setUserData({ ...userData, message: "" });
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`member ${tab === "CHATROOM" && "active"}`}
              >
                Chatroom
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className={`member ${tab === name && "active"}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {[...(privateChats.get(tab) || [])].map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>
              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button
                  type="button"
                  className="send-button"
                  onClick={sendPrivateValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
            margin="normal"
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
