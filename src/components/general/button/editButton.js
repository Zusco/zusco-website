import React from "react";
import PropTypes from "prop-types";
import  Edit from "assets/icons/search.svg";
import Button from "./button";

const EditButton = ({ onClick }) => (
  <Button
    {...{ onClick }}
    text="Edit"
    icon={<Edit className="stroke-current" />}
    whiteBg
  />
);

EditButton.propTypes = {
  onClick: PropTypes.func,
};

export default EditButton;
