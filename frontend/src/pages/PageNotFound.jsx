import React from "react";
import myVideo from "../assets/6P0vigk7010KkrSo0u.webm";

function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <video src={myVideo} width="640" autoPlay muted loop playsInline></video>
    </div>
  );
}

export default PageNotFound;
