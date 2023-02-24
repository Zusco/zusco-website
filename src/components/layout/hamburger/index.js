import React from "react";
import PropTypes from "prop-types";
const Hamburger = ({ className, click }) => (
  <button
    className={`hamburger_btn z-[999] ${
      className?.includes("hidden") ? "" : "lg:hidden"
    } ${className}`}
    onClick={click}
  >
    <div className="hamburger" />
    <div className="hamburger" />
    <div className="hamburger" />
  </button>
);
Hamburger.propTypes = {
  click: PropTypes.func,
  className: PropTypes.any,
};

export default Hamburger;
