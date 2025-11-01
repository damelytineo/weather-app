import React from "react";
import logoImage from "../assets/images/logo.svg";

function Logo() {
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Logo" />
    </div>
  );
}

export default Logo;