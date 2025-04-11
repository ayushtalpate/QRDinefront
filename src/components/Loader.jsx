// src/components/Loader.jsx
import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../animations/loderboxes.json"; // your lottie file path

const Loader = () => (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  }}>
    <div style={{ width: 200 }}>
      <Lottie animationData={loadingAnimation} loop autoplay />
    </div>
  </div>
);

export default Loader;
