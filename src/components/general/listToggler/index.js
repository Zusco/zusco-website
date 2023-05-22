import React from "react";
import PropTypes from "prop-types";
import { AiOutlineRight } from "react-icons/ai";

const ListToggler = ({
  fullListDisplayed,
  onToggle,
  disabled,
  showToggler,
}) => {
  return showToggler ? (
    <button
      onClick={onToggle}
      className="flex justify-between text-black cursor-pointer"
      type="button"
      disabled={disabled}
    >
      {!fullListDisplayed && <AiOutlineRight size={12} className="mt-0.5" />}
      <p className="text-[12px] text-black underline w-full text-right">
        {fullListDisplayed ? " Show less" : "View all"}
      </p>
    </button>
  ) : null;
};
ListToggler.propTypes = {
  fullListDisplayed: PropTypes.bool,
  onToggle: PropTypes.func,
  disabled: PropTypes.bool,
  showToggler: PropTypes.bool,
};
export default ListToggler;
