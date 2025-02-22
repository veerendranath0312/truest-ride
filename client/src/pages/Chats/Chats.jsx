import React from "react";
import Navbar from "../../components/Navbar";
import "./chats.css";

function Chats() {
  return (
    <div className="chats">
      <Navbar isAuthenticated={true} />
      <div className="chats__hero">
        <div className="container">
          <h1>Chats page</h1>
        </div>
      </div>
    </div>
  );
}

export default Chats;
