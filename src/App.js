import React, { useState } from "react";
import { LioWebRTC } from 'react-liowebrtc';
import ChatBox from "./components/ChatBox";
import './App.css';

const App = () => {
  const [chatLog, setChatLog] = useState([]);
  const options = { debug: true, dataOnly: true };

  const addChat = (name, message, alert = false) => {
    setChatLog([...chatLog, chatLog.concat({
      name,
      message: `${message}`,
      timestamp: `${Date.now()}`,
      alert
    })]);
  };

  const join = (webrtc) => webrtc.joinRoom('my-p2p-app-demo');

  const handleCreatedPeer = (webrtc, peer) => {
    addChat(`Peer-${peer.id.substring(0, 5)} joined the room!`, ' ', true);
  };

  const handlePeerData = (webrtc, type, payload, peer) => {
    switch (type) {
      case 'chat':
        addChat(`Peer-${peer.id.substring(0, 5)}`, payload);
        break;
      default:
        return;
    };
  };

  return (
    <div className="App">
      <LioWebRTC
        options={options}
        onReady={join}
        onCreatedPeer={handleCreatedPeer}
        onReceivedPeerData={handlePeerData}
      >
        <ChatBox
          chatLog={chatLog}
          onSend={(msg) => msg && addChat('Me', msg)}
        />
      </LioWebRTC>
    </div>
  );
};

export default App;
