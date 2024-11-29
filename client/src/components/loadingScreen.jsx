import React from "react";

const loadingScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <span
            style={{
              display: "inline-block",
              animation: "loading-animation 1s infinite",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid #fff",
              borderTop: "2px solid #007bff",
            }}
          ></span>
        </div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default loadingScreen;
