import React from "react";
import PropTypes from "prop-types";
import  Filter from "assets/icons/search.svg";
import Button from "./button";

const FilterButton = ({ onClick }) => (
  <Button
    {...{ onClick }}
    text="Filter"
    icon={<Filter className="stroke-current" />}
    whiteBg
  />
);

FilterButton.propTypes = {
  onClick: PropTypes.func,
};

export default FilterButton;
