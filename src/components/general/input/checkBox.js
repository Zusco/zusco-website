/* eslint-disable react/prop-types */
import React from "react";
import  Check from "assets/icons/check.svg";
import PropTypes from "prop-types";

const CheckBox = ({ checked, onClick, isBlack }) => {
  const checkedClasss = isBlack
    ? "bg-black border-grey-text"
    : "bg-blue-alt border-blue";
  const unCheckedClasss = isBlack
    ? "bg-white border-grey-text"
    : "bg-white border-blue";
  return (
    <div
      className={`border ${checked ? checkedClasss : unCheckedClasss}  
      flex justify-center items-center rounded w-5 h-5 cursor-pointer transition-all duration-[0.3s] ease-in-out`}
      onClick={onClick}
    >
      {checked && <Check color="#ffffff" className="w-[9px]" />}
    </div>
  );
};
CheckBox.propTypes = {
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  isBlack: PropTypes.bool,
};
export default CheckBox;
