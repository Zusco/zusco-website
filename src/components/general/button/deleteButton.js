import React from "react";
import PropTypes from "prop-types";
import  TrashBin from "assets/icons/search.svg";
import Button from "./button";

const DeleteButton = ({ onClick }) => (
  <Button
    {...{ onClick }}
    text="Delete"
    icon={<TrashBin className="stroke-current" />}
    whiteBg
  />
);

DeleteButton.propTypes = {
  onClick: PropTypes.func,
};

export default DeleteButton;
