import React from "react";

const Footer = () => {
  return (
    <div
      className="card"
      style={{ backgroundColor: "gray", borderRadius: "none" }}
    >
      <div style={{ alignSelf: "center", marginLeft: "1.5rem" }}>
        <p style={{ color: "white" }}>
          <span style={{ color: "black" }}>Designed by:</span> Bishal Mukherjee
          <br />
          <p style={{ marginLeft: "-2rem" }}>
            <span style={{ color: "black" }}>Contact/Feedback:</span>{" "}
            bishalmukherjee448@gmail.com
          </p>
        </p>
      </div>
    </div>
  );
};

export default Footer;
