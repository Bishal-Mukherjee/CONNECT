import React from "react";

const Footer = () => {
  return (
    <div
      className="card mt-5"
      style={{ backgroundColor: "gray", borderRadius: "none" }}
    >
      <div style={{ alignSelf: "center" }}>
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
