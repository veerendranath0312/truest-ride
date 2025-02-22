import React from "react";
import Navbar from "../../components/Navbar";
import "./library.css";

function Library() {
  return (
    <div className="library">
      <Navbar isAuthenticated={true} />
      <div className="library__hero">
        <div className="container">
          <h1>Library page</h1>
        </div>
      </div>
    </div>
  );
}

export default Library;
