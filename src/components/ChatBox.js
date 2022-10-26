import React, { useState } from "react";
import { withWebRTC } from 'react-liowebrtc';
import '../App.css';

const ChatBox = ({ chatLog, onSend, ...props }) => {
  const [inputMsg, setInputMsg] = useState('');
  const [chatBox, setChatBox] = useState(null);

  const generateChats = () => {
    if (chatBox) {
      setTimeout(() => { chatBox.scrollTop = chatBox.scrollHeight; }, 2);
    }
    return chatLog.map((item) => (
      <div className="chat" key={`chat-${item.name}-${item.timestamp}`}>
        <b className="name" style={{ color: item.alert ? '#888' : '#333' }}>{item.name}</b> <span className="msg">{item.message}</span>
      </div>
    ));
  }

  const handleSend = (chatMsg) => {
    props.webrtc.shout('chat', chatMsg);
    onSend(chatMsg);
  }

  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      handleSend(inputMsg);
      setInputMsg('');
    }
  }

  const handleInputChange = (evt) => setInputMsg(evt.target.value);

  return (
    <div className="container">
      <div className="chatHeader">
        <h1 className="title">P2P Chat Example</h1>
        <hr />
      </div>
      <div className="chatBox" ref={(div) => setChatBox(div)}>
        {chatLog.length ? generateChats() : (
          <div className="info">
            <p>Open this page in a new tab or send it to a friend.</p>
          </div>
        )}
      </div>
      <hr />
      <div className="bottomBar">
        <input className="chatInput" type="text" placeholder="Type a message..." onKeyUp={handleKeyUp} onChange={handleInputChange} value={inputMsg} />
      </div>
    </div>
  );
};

export default withWebRTC(ChatBox);
