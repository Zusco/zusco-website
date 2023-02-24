import React from "react";
import PropTypes from "prop-types";

import Increment from "assets/icons/increment.svg";
import Decrement from "assets/icons/decrement.svg";

const Counter = ({
  decrementClick,
  incrementClick,
  incrementClickDisabled,
  decrementClickDisabled,
  itemCount,
  disabled,
}) => {
  return (
    <div className="flex justify-start items-center w-full space-x-3">
      {!disabled && (
        <button
          type="button"
          onClick={decrementClick}
          className={`hover:opacity-70 transition-opacity duration-500 ease-in-out ${
            decrementClickDisabled ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <Decrement />
        </button>
      )}
      <span className="text-lg text-black">{itemCount}</span>
      {!disabled && (
        <button
          type="button"
          onClick={() => !incrementClickDisabled && incrementClick()}
          className={`hover:opacity-70 transition-opacity duration-500 ease-in-out ${
            incrementClickDisabled ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <Increment />
        </button>
      )}
    </div>
  );
};
Counter.propTypes = {
  decrementClick: PropTypes.func,
  incrementClick: PropTypes.func,
  itemCount: PropTypes.number,
  incrementClickDisabled: PropTypes.bool,
  decrementClickDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
};
export default Counter;
