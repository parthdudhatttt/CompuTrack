import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Loader = () => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Subtle transparent background
      }}
      open={true}
    >
      {/* Circular Progress with gradient */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          width: "80px",
          height: "80px",
        }}
      >
        <CircularProgress
          size={80}
          thickness={5}
          style={{
            color: "transparent", // Make the default spinner invisible
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "conic-gradient(#3b82f6, #ec4899, #3b82f6)", // Gradient spinner
            mask: "radial-gradient(closest-side, transparent 70%, black 71%)", // Mask to create ring
            WebkitMask: "radial-gradient(closest-side, transparent 70%, black 71%)",
            animation: "rotate 1.5s linear infinite",
          }}
        ></div>
      </div>

      {/* Animated Loading Text */}
      <div
        style={{
          fontSize: "1rem",
          fontWeight: "bold",
          letterSpacing: "2px",
          color: "#BCCCDC",
          textAlign: "center",
          animation: "fade-in-out 1.5s infinite",
        }}
      >
        Loading, please wait...
      </div>

      {/* Keyframes for animations */}
      <style>
        {`
          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes fade-in-out {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
    </Backdrop>
  );
};

export default Loader;
