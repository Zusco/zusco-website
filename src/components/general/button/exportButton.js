import React from "react";
import PropTypes from "prop-types";
import  Export from "assets/icons/search.svg";
import Button from "./button";

const ExportButton = ({ onClick }) => (
  <Button
    {...{ onClick }}
    text="Export"
    icon={<Export className="stroke-current" />}
    whiteBg
  />
);

ExportButton.propTypes = {
  onClick: PropTypes.func,
};

export default ExportButton;
