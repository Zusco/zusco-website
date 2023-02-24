import React from "react";
import PropTypes from "prop-types";
import  ArrowRight from "assets/icons/arrow-right-white.svg";
import Button from "./button";

const ArrowButton = ({ onClick, text, ...rest }) => (
  <Button
    {...{ onClick, text }}
    icon={<ArrowRight />}
    borderColor="border-white"
    blackBg
    xsmall
    {...rest}
  />
);

ArrowButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  rest: PropTypes.any,
};

export default ArrowButton;
