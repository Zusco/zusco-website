/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

const CheckBoxRound = ({ checked, onClick }) => {
  const checkedClasss = "bg-blue-alt border-blue-alt";
  const unCheckedClasss = "bg-white border-[#CBD5CF]";
  return (
    <div
      className={`border ${checked ? checkedClasss : unCheckedClasss}  
      flex justify-center items-center rounded-full w-[22px] h-[22px] cursor-pointer transition-all duration-[0.3s] ease-in-out`}
      onClick={onClick}
    >
      <div className="w-[6px] h-[6px] rounded-full bg-white" />
    </div>
  );
};
CheckBoxRound.propTypes = {
  onClick: PropTypes.func,
  checked: PropTypes.bool,
};
export default CheckBoxRound;
