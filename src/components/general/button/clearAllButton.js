import React from "react";
import PropTypes from "prop-types";
import Clear from "assets/icons/clear-icon.svg";
import Button from "./button";

const ClearButton = ({ ...rest }) => (
  <Button icon={<Clear className="" />} {...rest} />
);

ClearButton.propTypes = {
  rest: PropTypes.any,
};

export default ClearButton;
