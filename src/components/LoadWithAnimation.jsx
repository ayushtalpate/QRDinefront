// src/components/LoadWithAnimation.jsx
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const LoadWithAnimation = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Delay to simulate loading
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust duration
    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loader /> : children;
};

export default LoadWithAnimation;
